import { get, ref, update } from "firebase/database";
import { todoContainer } from "./showTodos";
import { TodoType, db } from "./config";

const addForm = document.getElementById("add-form") as HTMLFormElement;
const editForm = document.getElementById("edit-form") as HTMLFormElement;
const titleInput = document.getElementById(
  "edit-todo-title"
) as HTMLInputElement;
const contentInput = document.getElementById(
  "edit-todo-content"
) as HTMLInputElement;
const todoItems = document.querySelectorAll(".todo-item");

let currentEditingId = "";

todoContainer.addEventListener("click", async (e) => {
  e.preventDefault();
  const target = e.target as HTMLElement;
  const updateBtn = target.closest(".todo-edit-btn");

  if (updateBtn) {
    const todoID = updateBtn.getAttribute("data-id");

    if (todoID) {
      const todoRef = ref(db, "todos/" + todoID);

      const snapshot = await get(todoRef);

      if (snapshot.exists()) {
        const todoData = snapshot.val() as TodoType;

        titleInput.value = todoData.title;
        contentInput.value = todoData.content || "";

        currentEditingId = todoID;

        addForm.style.display = "none";
        editForm.style.display = "flex";
      }
    }
  }
});

editForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const todoRef = ref(db, "todos/" + currentEditingId);
  await update(todoRef, {
    title: titleInput.value,
    content: contentInput.value,
    date: Date.now(),
  });

  titleInput.value = "";
  contentInput.value = "";
  editForm.style.display = "none";
  addForm.style.display = "flex";

  currentEditingId = "";
});

// 제목이나 특정 영역 클릭 시 완료 및 color 채워지는 애니메이션
todoItems.forEach((item) => {
  item.addEventListener("click", () => {});
});
