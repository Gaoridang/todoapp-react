import { db } from "./config";
import { nanoid } from "nanoid";
import { ref, set } from "firebase/database";

interface addTodoParams {
  title: string;
  description?: string;
  priority?: 1 | 2 | 3 | 4;
}

const titleInput = document.getElementById("todo-title") as HTMLInputElement;
const todoForm = document.getElementById("todo-form") as HTMLFormElement;

const addTodo = ({ title, description = "", priority = 4 }: addTodoParams) => {
  const todoID = nanoid();
  const done = false;
  const date = Date.now();

  set(ref(db, "todos/" + todoID), {
    title,
    description,
    done,
    date,
    priority,
  });
};

todoForm?.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();

  const title = titleInput?.value;

  addTodo({ title });
  titleInput.value = "";
});
