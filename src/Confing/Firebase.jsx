import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDkwWFCHHLNTKXY-10EiLh8WTpwtDCA3lo",
  authDomain: "expertizo-authentication.firebaseapp.com",
  projectId: "expertizo-authentication",
  storageBucket: "expertizo-authentication.appspot.com",
  messagingSenderId: "71504779524",
  appId: "1:71504779524:web:ebec9367dd3d28849a5851",
  measurementId: "G-GPDTKE59BR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Firebase Storage and get a reference to the service
const storage = getStorage(app);

// Function to register a new user
export const SignUpUser = async ({ email, password, fullName, age }) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  await addDoc(collection(db, "users"), { uid: user.uid, email, fullName, age });
  return user;
};

// Function to log in a user
export const LoginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

// Function to add a product
export const addProduct = async (product) => {
  const { title, description, price, image } = product;

  const storageRef = ref(storage, 'products/' + image.name);
  await uploadBytes(storageRef, image);
  const url = await getDownloadURL(storageRef);

  return addDoc(collection(db, "products"), { uid: products.uid, title, description, price, image: url });
};

export { auth, onAuthStateChanged };
