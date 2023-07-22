import { addTodo } from "./config";

const titleInput = document.getElementById("todo-title") as HTMLInputElement;
const todoForm = document.getElementById("todo-form") as HTMLFormElement;

todoForm?.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();

  const title = titleInput?.value;

  addTodo({ title });
});
