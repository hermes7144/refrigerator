import { initializeApp } from 'firebase/app';
import { v4 as uuid } from 'uuid';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import { get, getDatabase, ref, remove, serverTimestamp, set } from 'firebase/database';
import { Ingredient } from '../pages/Ingredients';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DB_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase();

export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  return signOut(auth);
}

export function onUserStateChange(callback: (user: User | null) => void) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

export async function getIngredients(uid: string): Promise<Ingredient[]> {
  const snapshot = await get(ref(database, `ingredients/${uid}`));

  if (snapshot.exists()) {
    return Object.values(snapshot.val());
  } else {
    return [];
  }
}

export async function addNewIngredient(uid: string, ingredient: Ingredient): Promise<void> {
  const id = uuid();

  await set(ref(database, `ingredients/${uid}/${id}`), {
    ...ingredient,
    id,
    createdDate: serverTimestamp(),
  });
}

export async function editIngredient(uid: string, ingredient: Ingredient): Promise<void> {
  return set(ref(database, `ingredients/${uid}/${ingredient.id}`), ingredient);
}

export async function removeIngredient(uid: string, ingredient: Ingredient): Promise<void> {
  return remove(ref(database, `ingredients/${uid}/${ingredient.id}`));
}
