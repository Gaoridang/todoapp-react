import { TodoType, fetchAllTodos } from "./config";

const todoContainer = document.getElementById("todo-list") as HTMLUListElement;

fetchAllTodos()
  .then((todos) => Object.entries(todos))
  .then((todosArray) => {
    const todosHTML = todosArray
      .map(([todoID, todoData]) => {
        const todo = todoData as TodoType;
        return `
          <li id="todo-item">
            <p>${todo.title}</p>
            <p>${todo.description}</p>
            <p>${todo.date}</p>
          </li>
        `;
      })
      .join("");

    todoContainer.innerHTML = todosHTML;
  });
