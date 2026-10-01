import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp();
}
const db = admin.firestore();

export interface AwardPointsRequest {
  uid: string;
  type: 'ACCEPTED_INCIDENT' | 'ARRIVED_ON_SCENE' | 'VERIFIED_FIRST_RESPONSE' | 'HANDOFF_COMPLETED';
  incidentId: string;
  verifiedBy: string;
}

const POINT_VALUES: Record<string, number> = {
  ACCEPTED_INCIDENT: 10,
  ARRIVED_ON_SCENE: 20,
  VERIFIED_FIRST_RESPONSE: 40,
  HANDOFF_COMPLETED: 30
};

export const processRewardTransaction = async (req: AwardPointsRequest): Promise<{ success: boolean; pointsAwarded: number }> => {
  const points = POINT_VALUES[req.type] || 10;
  const userRewardRef = db.collection('rewards').doc(req.uid);
  const txRef = userRewardRef.collection('transactions').doc();

  await db.runTransaction(async (transaction) => {
    const userDoc = await transaction.get(userRewardRef);
    const currentPoints = userDoc.exists ? (userDoc.data()?.points || 0) : 0;
    const currentResponses = userDoc.exists ? (userDoc.data()?.verifiedResponses || 0) : 0;

    transaction.set(userRewardRef, {
      uid: req.uid,
      points: currentPoints + points,
      verifiedResponses: currentResponses + (req.type === 'HANDOFF_COMPLETED' ? 1 : 0),
      updatedAt: Date.now()
    }, { merge: true });

    transaction.set(txRef, {
      transactionId: txRef.id,
      uid: req.uid,
      type: req.type,
      points,
      reason: `Reward issued for ${req.type.replace(/_/g, ' ')}`,
      incidentId: req.incidentId,
      verifiedBy: req.verifiedBy,
      createdAt: Date.now()
    });
  });

  return { success: true, pointsAwarded: points };
};
