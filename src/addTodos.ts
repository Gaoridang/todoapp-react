import { db } from "./config";
import { nanoid } from "nanoid";
import { ref, set } from "firebase/database";

interface addTodoParams {
  title: string;
  content?: string;
  priority?: 1 | 2 | 3 | 4;
}

const hiddenInputTitle = document.getElementById(
  "hidden-title"
) as HTMLInputElement;
const inputTitle = document.getElementById("todo-title") as HTMLDivElement;
const hiddenInputContent = document.getElementById(
  "hidden-content"
) as HTMLInputElement;
const inputContent = document.getElementById("todo-content") as HTMLDivElement;
const todoForm = document.getElementById("todo-form") as HTMLFormElement;

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

todoForm?.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();

  hiddenInputTitle.value = inputTitle?.innerText || "";
  hiddenInputContent.value = inputContent?.innerText || "";

  const title = hiddenInputTitle.value;
  const content = hiddenInputContent.value;

  addTodo({ title, content });
  inputTitle.innerText = "";
  inputContent.innerText = "";
});
