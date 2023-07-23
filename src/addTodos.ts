import { TodoType, db } from "./config";
import { nanoid } from "nanoid";
import { format } from "date-fns";
import { ref, set } from "firebase/database";

const titleInput = document.getElementById("todo-title") as HTMLInputElement;
const todoForm = document.getElementById("todo-form") as HTMLFormElement;

const addTodo = ({
  todoID = nanoid(),
  done = false,
  title,
  date = new Date(),
  description = "",
  priority = 4,
}: TodoType) => {
  set(ref(db, "todos/" + todoID), {
    title,
    description,
    done,
    date: format(date, "yyyy.MM.dd HH:mm:ss"),
    priority,
  });
};

todoForm?.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();

  const title = titleInput?.value;

  addTodo({ title });
  titleInput.value = "";
});
