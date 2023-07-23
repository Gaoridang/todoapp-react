import { getDatabase, ref, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import { nanoid } from "nanoid";
import { format } from "date-fns";

interface TodoType {
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
const app = initializeApp(firebaseConfig);

function addTodo({
  todoID = nanoid(),
  done = false,
  title,
  date = new Date(),
  description = "",
  priority = 4,
}: TodoType) {
  const db = getDatabase(app);
  set(ref(db, "todos/" + todoID), {
    title,
    description,
    done,
    date: format(date, "yyyy.MM.dd"),
    priority,
  });
}

export { addTodo };
