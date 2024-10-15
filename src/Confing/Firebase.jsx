import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBse6IE_GT7IvcWZ3o0gutot8QyVOwIKSQ",
  authDomain: "expense-tracker-bcef1.firebaseapp.com",
  projectId: "expense-tracker-bcef1",
  storageBucket: "expense-tracker-bcef1.appspot.com",
  messagingSenderId: "238224847833",
  appId: "1:238224847833:web:8abc317e8d5257903edfc8",
  measurementId: "G-9BWJL8XL13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Function to register a new user
export const SignUpUser = async ({ email, password, fullName, age }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      email,
      fullName,
      age,
    });
    return user;
  } catch (error) {
    console.error("Error signing up user:", error);
    throw error;
  }
};

// Function to log in a user
export const LoginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
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
    const docRef = await addDoc(collection(db, "products"), {
      title,
      description,
      price,
      imageUrl,
      userId: user.uid,
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// Function to get all products
export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return products;
  } catch (error) {
    console.error("Error getting products:", error);
    throw error;
  }
};

// Function to get a single product by ID
export const getSingleProduct = async (productId) => {
  try {
    const docRef = doc(db, "products", productId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error("No such product found!");
    }
  } catch (error) {
    console.error("Error getting product:", error);
    throw error;
  }
};

// Exporting Firebase services for external use
export { db, auth, onAuthStateChanged, storage };
