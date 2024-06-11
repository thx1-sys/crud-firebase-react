import { initializeApp } from "firebase/app";

import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyANvd0_EtfHsJJk2bYvJaiEodM9mX33i4Y",
  authDomain: "crud-fire-react-508e6.firebaseapp.com",
  projectId: "crud-fire-react-508e6",
  storageBucket: "crud-fire-react-508e6.appspot.com",
  messagingSenderId: "286674987251",
  appId: "1:286674987251:web:391507db0e3e73ef052f86",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
