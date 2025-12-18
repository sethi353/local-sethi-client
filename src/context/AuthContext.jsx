// import { createContext, useEffect, useState } from "react";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
//   updateProfile,
// } from "firebase/auth";
// import { auth } from "../firebase/firebase.config";
// import axios from "axios";

// export const AuthContext = createContext(null);

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Listen to Firebase auth state
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       if (currentUser) {
//         try {
//           // Fetch user from MongoDB
//           const res = await axios.get(
//             `http://localhost:5000/users/${currentUser.email}`
//           );

//           setUser({ ...currentUser, ...res.data });
//         } catch (err) {
//           console.error("Failed to fetch user from MongoDB:", err);
//           setUser(currentUser); // fallback to Firebase user
//         }
//       } else {
//         setUser(null);
//       }

//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   // Register user
//   const createUser = async (name, email, password, image) => {
//     if (!password) throw new Error("Password is required");

//     try {
//       // 1️⃣ Firebase registration
//       const result = await createUserWithEmailAndPassword(auth, email, password);

//       // 2️⃣ Update Firebase profile
//       await updateProfile(result.user, {
//         displayName: name,
//         photoURL: image || "",
//       });

//       // 3️⃣ Save to MongoDB
//       const mongoUser = { name, email, image: image || "" };
//       await axios.post("http://localhost:5000/users", mongoUser);

//       // Return user object
//       return { ...result.user, ...mongoUser };
//     } catch (err) {
//       console.error("Error creating user:", err);
//       throw err;
//     }
//   };

//   // Login
//   const loginUser = (email, password) =>
//     signInWithEmailAndPassword(auth, email, password);

//   // Logout
//   const logoutUser = () => signOut(auth);

//   return (
//     <AuthContext.Provider
//       value={{ user, loading, createUser, loginUser, logoutUser }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;



import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Firebase listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser || null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Register
  const createUser = async (name, email, password, image) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: name, photoURL: image || "" });

    // Save to backend
    await axios.post("http://localhost:5000/users", {
      name,
      email,
      image: image || "",
      role: "user",
      status: "active",
      chefId: null,
      createdAt: new Date() 
    });

    setUser(result.user);
    return result.user;
  };

  // Login
  const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password);

  // Logout
  const logoutUser = () => signOut(auth).then(() => setUser(null));

  return (
    <AuthContext.Provider value={{ user, loading, createUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;




























