import { ref, remove } from "firebase/database";
import { todoContainer } from "./showTodos";
import { db } from "./config";

todoContainer.addEventListener("click", (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const deleteBtn = target.closest(".todo-delete-btn");

  if (deleteBtn) {
    const todoID = deleteBtn.getAttribute("data-id");

    if (todoID) {
      const todoRef = ref(db, "todos/" + todoID);
      remove(todoRef).catch((err) => console.log(err));
    }
  }
});
