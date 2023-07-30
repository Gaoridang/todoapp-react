import { onValue } from "firebase/database";
import { TodoType, latestTodoQuery } from "./config";
import { format } from "date-fns";

export const todoContainer = document.getElementById(
  "todo-list"
) as HTMLUListElement;
const noTodosMessage = document.getElementById(
  "no-todos-message"
) as HTMLParagraphElement;

// 새롭게 추가되는 리스트만 애니메이션 활성화
const addedTodoIds = new Set();

onValue(latestTodoQuery, (snapshot) => {
  const todoObjects = snapshot.val();
  if (todoObjects) {
    const todosArray = Object.entries(todoObjects).sort(
      ([idA, todoA]: [string, any], [idB, todoB]: [string, any]) => {
        return todoB.date - todoA.date;
      }
    );
    const todosHTML = todosArray
      .map(([todoID, todoData]) => {
        const todo = todoData as TodoType;
        const date = format(new Date(todo.date), `yyyy년 MM월 dd일 HH:mm`);
        return `
          <li class="todo-item ${addedTodoIds.has(todoID) ? "" : "animate"} ${
          todo.done ? "completed" : ""
        }" id=${todoID}>
            <div class="todo-main">
              <h2 class="todo-title">${todo.title}</h2>
              <p class="todo-content">${todo.content || ""}</p>
            </div>
            <div class="todo-sub">
              <span class="todo-date">${date}</span>
              <div>
                <div class="priority priority-${todo.priority}"></div>
                <button class="todo-check-btn" data-id=${todoID}><i class="fa-solid fa-check"></i></button>
                <button class="todo-edit-btn" data-id=${todoID}><i class="fa-regular fa-pen-to-square"></i></button>
                <button class="todo-delete-btn" data-id=${todoID}><i class="fa-solid fa-x"></i></button>
              </div>
            </div>
          </li>
        `;
      })
      .join("");

    todoContainer.innerHTML = todosHTML;
    noTodosMessage.innerText = "";

    // Set에 ID 추가해서 조건부 클래스 추가
    todosArray.forEach(([todoID]) => {
      addedTodoIds.add(todoID);
      const todoItem = document.getElementById(todoID);
      todoItem?.addEventListener("animationend", () => {
        todoItem.classList.remove("animate");
      });
    });
  } else {
    todoContainer.innerHTML = "";
    noTodosMessage.innerHTML = "투두를 추가하세요!";
  }
});
