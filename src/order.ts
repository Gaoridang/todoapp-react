import { onValue, orderByChild, query, ref } from "firebase/database";
import { db } from "./config";

export function latestOrder() {
  const latestTodoQuery = query(ref(db, "todos/"), orderByChild("date"));

  onValue(latestTodoQuery, (snapshot) => {
    const todoObjects = snapshot.val();
    const todosArray = Object.entries(todoObjects).sort(
      ([idA, todoA]: [string, any], [idB, todoB]: [string, any]) => {
        return todoB.date - todoA.date;
      }
    );
    return todosArray;
  });
}
