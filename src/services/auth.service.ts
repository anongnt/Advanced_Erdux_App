import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firebaseApp } from "../configs/firebase";
import { Account } from "./../app-type/account.type";

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export async function registerUser(
  firstName: string,
  lastName: string,
  email: string,
  password: string
) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await setDoc(doc(db, "users", userCredential.user.uid), {
      firstName: firstName,
      lastName: lastName,
      photoUrl: "https://codingthailand.com/site/img/nopic.png",
      role: "member",
    });

    return userCredential;
  } catch (error) {
    throw error;
  }
}

export async function login(
  email: string,
  password: string
): Promise<UserCredential> {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
}

export async function logout(): Promise<void> {
  await signOut(auth);
}

export async function getCurrentAccount(userId: string) {
  const accountRef = doc(db, "users", userId);
  const docSnap = await getDoc(accountRef);

  if (!docSnap.exists()) {
    return null;
  }

  let accTmp = docSnap.data() as Account;

  let account: Account = {
    userId: userId,
    ...accTmp,
  };

  return account;
}

//update Account
export async function updateAccount(
  userId: string,
  acc: Account
): Promise<void> {
  await updateDoc(doc(db, "users", userId), {
    firstName: acc.firstName,
    lastName: acc.lastName,
  });
}
