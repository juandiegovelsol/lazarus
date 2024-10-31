"use server";

import { revalidatePath } from "next/cache";

// Define the Todo type
export type Todo = { id: number; text: string; completed: boolean };

// Initial list of todos
let todos: Todo[] = [
  { id: 1, text: "Learn Next.js", completed: false },
  { id: 2, text: "Build cool apps", completed: false },
];

// Add a new todo to the list
export async function addTodoAction(text: string): Promise<Todo> {
  const newTodo = { id: Date.now(), text, completed: false };
  todos.push(newTodo);

  // Simulate server latency
  await new Promise((resolve) => setTimeout(resolve, 1000));

  revalidatePath("/"); // Revalidate page to fetch the new data
  return newTodo;
}

// Delete a todo from the list
export async function deleteTodoAction(id: number): Promise<number> {
  todos = todos.filter((todo) => todo.id !== id);

  // Simulate server latency
  await new Promise((resolve) => setTimeout(resolve, 1000));

  revalidatePath("/"); // Revalidate page to fetch the new data
  return id;
}

// Get the list of todos
export async function getTodos(): Promise<Todo[]> {
  return todos;
}