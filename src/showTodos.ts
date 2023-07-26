import { onValue } from "firebase/database";
import { TodoType, latestTodoQuery } from "./config";
import { format } from "date-fns";

export const todoContainer = document.getElementById(
  "todo-list"
) as HTMLUListElement;

onValue(latestTodoQuery, (snapshot) => {
  const todoObjects = snapshot.val();
  const todosArray = Object.entries(todoObjects).sort(
    ([idA, todoA]: [string, any], [idB, todoB]: [string, any]) => {
      return todoB.date - todoA.date;
    }
  );
  const todosHTML = todosArray
    .map(([todoID, todoData]) => {
      const todo = todoData as TodoType;
      const date = format(new Date(todo.date), "yyyy.MM.dd HH:mm:ss");
      return `
          <li id="todo-item">
            <div class="todo-main">
              <p class="todo-title">${todo.title}</p>
              <p class="todo-desc">${todo.description}</p>
            </div>
            <p class="todo-date">${date}</p>
            <button class="todo-delete-btn" data-id=${todoID}>X</button>
          </li>
        `;
    })
    .join("");

  todoContainer.innerHTML = todosHTML;
});
