import { ref, set, onValue, off, Unsubscribe } from 'firebase/database';
import { rtdb } from './config.js';

export interface ResponderLocationUpdate {
  lat: number;
  lng: number;
  heading?: number;
  speed?: number;
  updatedAt: number;
}

export const updateResponderLocationRTDB = async (
  uid: string,
  location: ResponderLocationUpdate
): Promise<void> => {
  const locRef = ref(rtdb, `responders/${uid}/location`);
  await set(locRef, location);
};

export const subscribeToResponderLocationRTDB = (
  uid: string,
  callback: (loc: ResponderLocationUpdate | null) => void
): (() => void) => {
  const locRef = ref(rtdb, `responders/${uid}/location`);
  onValue(locRef, (snap) => {
    callback(snap.val());
  });
  return () => off(locRef);
};

export const updateResponderPresence = async (uid: string, online: boolean): Promise<void> => {
  const presenceRef = ref(rtdb, `responders/${uid}/presence`);
  await set(presenceRef, { online, lastSeen: Date.now() });
};
