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
            <p>${todo.title}</p>
            <p>${todo.description}</p>
            <p>${date}</p>
            <button class="todo-delete" data-id=${todoID}>X</button>
          </li>
        `;
    })
    .join("");

  todoContainer.innerHTML = todosHTML;
});
