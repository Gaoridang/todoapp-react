import { initializeApp } from "firebase/app";
import { get, getDatabase, ref } from "firebase/database";

export interface TodoType {
  title: string;
  description?: string;
  done?: boolean;
  date?: Date;
  priority?: 1 | 2 | 3 | 4;
  todoID?: string;
}

const firebaseConfig = {
  apiKey: "AIzaSyDqqZ-0PBmpLKwd8xe724O_OsRRMBt4tC4",
  authDomain: "todoapp-5edc0.firebaseapp.com",
  databaseURL: "https://todoapp-5edc0-default-rtdb.firebaseio.com",
  projectId: "todoapp-5edc0",
  storageBucket: "todoapp-5edc0.appspot.com",
  messagingSenderId: "866788428543",
  appId: "1:866788428543:web:52ff6914ed09fba6d81aca",
  measurementId: "G-TGDE31BPCE",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const todoRef = ref(db, "todos");

export const fetchAllTodos = async () => {
  const snapshot = await get(todoRef);
  return snapshot.val();
};

// 리스트가 없을 때 HTML에 불러오면서 undefined이기 때문에 오류가 생김
