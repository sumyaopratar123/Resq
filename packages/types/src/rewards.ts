export type RewardTransactionType =
  | 'ACCEPTED_INCIDENT'
  | 'ARRIVED_ON_SCENE'
  | 'VERIFIED_FIRST_RESPONSE'
  | 'HANDOFF_COMPLETED'
  | 'TRAINING_COMPLETED'
  | 'SAVER_COMMENDATION';

export interface RewardBadge {
  id: string;
  name: string;
  description: string;
  iconName: string;
  unlockedAt: number;
}

export interface UserRewardsSummary {
  uid: string;
  points: number;
  level: number;
  verifiedResponses: number;
  assists: number;
  badges: RewardBadge[];
  updatedAt: number;
}

export interface RewardTransaction {
  transactionId: string;
  uid: string;
  type: RewardTransactionType;
  points: number;
  reason: string;
  incidentId?: string;
  verifiedBy: string;
  createdAt: number;
}
