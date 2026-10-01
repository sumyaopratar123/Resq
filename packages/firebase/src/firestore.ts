import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
  Unsubscribe
} from 'firebase/firestore';
import { db } from './config.js';
import { IncidentRecord, IncidentStatus, ResponderProfile } from '@resq/types';

export const subscribeToActiveIncidents = (
  callback: (incidents: IncidentRecord[]) => void
): Unsubscribe => {
  const q = query(
    collection(db, 'incidents'),
    where('status', '!=', 'COMPLETED'),
    orderBy('status'),
    orderBy('createdAt', 'desc')
  );
  return onSnapshot(q, (snapshot) => {
    const incidents = snapshot.docs.map((doc) => doc.data() as IncidentRecord);
    callback(incidents);
  });
};

export const subscribeToIncident = (
  incidentId: string,
  callback: (incident: IncidentRecord | null) => void
): Unsubscribe => {
  const ref = doc(db, 'incidents', incidentId);
  return onSnapshot(ref, (snap) => {
    if (snap.exists()) {
      callback(snap.data() as IncidentRecord);
    } else {
      callback(null);
    }
  });
};

export const createIncident = async (incident: IncidentRecord): Promise<void> => {
  await setDoc(doc(db, 'incidents', incident.incidentId), incident);
};

export const updateIncidentStatus = async (
  incidentId: string,
  status: IncidentStatus,
  assignedResponderUid?: string
): Promise<void> => {
  const ref = doc(db, 'incidents', incidentId);
  const updateData: Partial<IncidentRecord> = {
    status,
    updatedAt: Date.now()
  };
  if (assignedResponderUid) {
    // Read current assigned responders, append new one
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const existing = (snap.data() as IncidentRecord).assignedResponders || [];
      if (!existing.includes(assignedResponderUid)) {
        updateData.assignedResponders = [...existing, assignedResponderUid];
      }
    }
  }
  await updateDoc(ref, updateData);
};

export const getResponderProfile = async (uid: string): Promise<ResponderProfile | null> => {
  const snap = await getDoc(doc(db, 'responders', uid));
  return snap.exists() ? (snap.data() as ResponderProfile) : null;
};
