import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './config.js';

export const uploadResponderCertification = async (
  uid: string,
  file: File
): Promise<string> => {
  const fileRef = ref(storage, `certifications/${uid}/${Date.now()}_${file.name}`);
  await uploadBytes(fileRef, file);
  return await getDownloadURL(fileRef);
};
