import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore";
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
export const addProduct = async ({ title, description, price, image }) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not authenticated");
    }

    // Upload image to Firebase Storage
    const imageRef = ref(storage, `productImages/${image.name}`);
    const snapshot = await uploadBytes(imageRef, image);
    const imageUrl = await getDownloadURL(snapshot.ref);

    // Add product details to Firestore
    const docRef = await addDoc(collection(db, "products"), { title, description, price, imageUrl, userId: user.uid });
    return docRef.id;

  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// Function to get all products
export const getProducts = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));
  const products = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });
  return products;
};

// Function to get a single product by ID
export const getProductById = async (id) => {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    throw new Error("No such document!");
  }
};

export { auth, onAuthStateChanged };
