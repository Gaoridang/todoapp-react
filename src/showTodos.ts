import { onValue } from "firebase/database";
import { TodoType, todoRef } from "./config";

export const todoContainer = document.getElementById(
  "todo-list"
) as HTMLUListElement;

onValue(todoRef, (snapshot) => {
  const todosObject = snapshot.val();
  const todosArray = Object.entries(todosObject);
  const todosHTML = todosArray
    .map(([todoID, todoData]) => {
      const todo = todoData as TodoType;
      return `
          <li id="todo-item">
            <p>${todo.title}</p>
            <p>${todo.description}</p>
            <p>${todo.date}</p>
            <button class="todo-delete" data-id=${todoID}>X</button>
          </li>
        `;
    })
    .join("");

  todoContainer.innerHTML = todosHTML;
});
