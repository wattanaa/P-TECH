/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "focused-progress-flsxp",
  appId: "1:75390990969:web:a89781bbea13fcfd6772a8",
  apiKey: "AIzaSyA5T3JFGx2kR6cYWXDsaAvKmZ6hgVtBP64",
  authDomain: "focused-progress-flsxp.firebaseapp.com",
  storageBucket: "focused-progress-flsxp.firebasestorage.app",
  messagingSenderId: "75390990969"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
