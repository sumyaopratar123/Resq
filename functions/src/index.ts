import * as functions from 'firebase-functions';
import { processRewardTransaction, AwardPointsRequest } from './rewards/award.js';

export const awardServerPoints = functions.https.onCall(async (request) => {
  if (!request.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated to receive rewards.');
  }

  const req: AwardPointsRequest = request.data;
  return await processRewardTransaction(req);
});
