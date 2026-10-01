"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUserRoleClaim = void 0;
const admin = require("firebase-admin");
const setUserRoleClaim = async (uid, role) => {
    await admin.auth().setCustomUserClaims(uid, { role });
};
exports.setUserRoleClaim = setUserRoleClaim;
//# sourceMappingURL=role-claims.js.map