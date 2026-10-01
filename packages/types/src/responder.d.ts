export type VerificationStatus = 'pending' | 'verified' | 'rejected' | 'suspended';
export type ResponderSkill = 'cpr' | 'first_aid' | 'trauma' | 'aed' | 'choking' | 'burn_response' | 'search_rescue' | 'disaster_response';
export interface ResponderProfile {
    uid: string;
    verificationStatus: VerificationStatus;
    skills: ResponderSkill[];
    certificationId: string;
    certificationDocURL?: string;
    experienceYears: number;
    rating: number;
    totalResponses: number;
    verifiedBy?: string;
    verifiedAt?: number;
    currentLocation?: {
        lat: number;
        lng: number;
        updatedAt: number;
    };
    isAvailable: boolean;
    createdAt: number;
    updatedAt: number;
}
