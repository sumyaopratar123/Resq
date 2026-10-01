"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processRewardTransaction = void 0;
const admin = require("firebase-admin");
if (!admin.apps.length) {
    admin.initializeApp();
}
const db = admin.firestore();
const POINT_VALUES = {
    ACCEPTED_INCIDENT: 10,
    ARRIVED_ON_SCENE: 20,
    VERIFIED_FIRST_RESPONSE: 40,
    HANDOFF_COMPLETED: 30
};
const processRewardTransaction = async (req) => {
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
exports.processRewardTransaction = processRewardTransaction;
//# sourceMappingURL=award.js.map