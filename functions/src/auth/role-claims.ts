import * as admin from 'firebase-admin';

export const setUserRoleClaim = async (uid: string, role: string): Promise<void> => {
  await admin.auth().setCustomUserClaims(uid, { role });
};
