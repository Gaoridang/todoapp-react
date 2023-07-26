import { ref, remove } from "firebase/database";
import { todoContainer } from "./showTodos";
import { db } from "./config";

todoContainer.addEventListener("click", (e: MouseEvent) => {
  const target = e.target as HTMLElement;

  if (target.classList.contains("todo-delete-btn")) {
    const todoID = target.getAttribute("data-id");

    if (todoID) {
      const todoRef = ref(db, "todos/" + todoID);
      remove(todoRef);
    }
  }
});
