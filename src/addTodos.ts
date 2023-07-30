import { db } from "./config";
import { nanoid } from "nanoid";
import { ref, set } from "firebase/database";

interface addTodoParams {
  title: string;
  content?: string;
  priority?: 1 | 2 | 3 | 4;
}

const titleInput = document.getElementById("todo-title") as HTMLInputElement;
const contentInput = document.getElementById(
  "todo-content"
) as HTMLInputElement;
const addForm = document.getElementById("add-form") as HTMLFormElement;

const addTodo = ({ title, content = "", priority = 4 }: addTodoParams) => {
  const todoID = nanoid();
  const done = false;
  const date = Date.now();

  set(ref(db, "todos/" + todoID), {
    title,
    content,
    done,
    date,
    priority,
  });
};

addForm?.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();

  const title = titleInput.value;
  const content = contentInput.value;

  if (title) {
    addTodo({ title, content });
  }

  titleInput.value = "";
  contentInput.value = "";
});
