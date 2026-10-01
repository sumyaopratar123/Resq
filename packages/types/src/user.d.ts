export type UserRole = 'citizen' | 'responder' | 'saver' | 'dispatcher' | 'admin';
export interface UserProfile {
    uid: string;
    role: UserRole;
    name: string;
    email: string;
    phone: string;
    emergencyContact?: string;
    bloodGroup?: string;
    photoURL?: string;
    createdAt: number;
    updatedAt: number;
}
