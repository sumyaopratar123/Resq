"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.awardServerPoints = void 0;
const functions = require("firebase-functions");
const award_js_1 = require("./rewards/award.js");
exports.awardServerPoints = functions.https.onCall(async (request) => {
    if (!request.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated to receive rewards.');
    }
    const req = request.data;
    return await (0, award_js_1.processRewardTransaction)(req);
});
//# sourceMappingURL=index.js.map