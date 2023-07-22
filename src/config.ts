import { getDatabase, ref, set } from "firebase/database";

interface TodoType {
  title: string;
  description?: string;
  done?: boolean;
  date?: Date;
  priority?: 1 | 2 | 3 | 4;
  todoID?: Date;
}

function addTodo({
  todoID = new Date(),
  done = false,
  title,
  date = new Date(),
  description = "",
  priority = 4,
}: TodoType) {
  const db = getDatabase();
  set(ref(db, "users/" + todoID), {
    title,
    description,
    done,
    date: date.getDate(),
    priority,
  });
}

export { addTodo };
