import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function loadUserProfile(uid) {
  const snap = await getDoc(doc(db, "profiles", uid));
  return snap.exists() ? snap.data() : null;
}

export async function saveUserAvatar(uid, base64Image) {
  const version = Date.now();

  await setDoc(
    doc(db, "profiles", uid),
    { avatarUrl: base64Image, version },
    { merge: true }
  );

  return { avatarUrl: base64Image, version };
}
