import { onValue } from "firebase/database";
import { TodoType, latestTodoQuery } from "./config";
import { format } from "date-fns";

export const todoContainer = document.getElementById(
  "todo-list"
) as HTMLUListElement;

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
          <li class="todo-item">
            <div class="todo-main">
              <h2 class="todo-title">${todo.title}</h2>
              <p class="todo-content">${todo.content || ""}</p>
            </div>
            <div class="todo-sub">
              <span class="todo-date">${date}</span>
              <div>
                <button class="todo-done-btn" data-id=${todoID}><i class="fa-solid fa-check"></i></button>
                <button class="todo-edit-btn" data-id=${todoID}><i class="fa-regular fa-pen-to-square"></i></button>
                <button class="todo-delete-btn" data-id=${todoID}><i class="fa-solid fa-x"></i></button>
              </div>
            </div>
          </li>
        `;
      })
      .join("");

    todoContainer.innerHTML = todosHTML || "투두를 추가하세요";
  }
});
