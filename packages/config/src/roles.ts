import { UserRole } from '@resq/types';

export interface RoleMeta {
  role: UserRole;
  label: string;
  defaultRoute: string;
  description: string;
  publiclySelectable: boolean;
}

export const ROLES: Record<UserRole, RoleMeta> = {
  citizen: {
    role: 'citizen',
    label: 'Citizen / Bystander',
    defaultRoute: '/citizen',
    description: 'Public user capable of triggering SOS and tracking emergencies',
    publiclySelectable: true
  },
  responder: {
    role: 'responder',
    label: 'Certified Responder',
    defaultRoute: '/responder',
    description: 'Verified first responder eligible for emergency notifications',
    publiclySelectable: true
  },
  saver: {
    role: 'saver',
    label: 'Community Saver',
    defaultRoute: '/responder',
    description: 'Recognized active contributor with earned saver status',
    publiclySelectable: false
  },
  dispatcher: {
    role: 'dispatcher',
    label: 'Emergency Dispatcher',
    defaultRoute: '/dispatcher',
    description: 'Operations console operator managing live calls and dispatch',
    publiclySelectable: false
  },
  admin: {
    role: 'admin',
    label: 'System Administrator',
    defaultRoute: '/admin',
    description: 'System admin managing verification, protocols, and audit logs',
    publiclySelectable: false
  }
};
