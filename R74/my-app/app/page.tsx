"use client";

import {
  useState,
  useEffect,
  useOptimistic,
  useTransition,
  useRef,
} from "react";

import {
  addTodoAction,
  deleteTodoAction,
  getTodos,
  Todo,
} from "./actions/todoActions";

/**
 * Extended Todo type that includes a processing status.
 */
export type TodoWithStatus = Todo & { isProcessing: boolean };

/**
 * TodoList component to manage a list of todos.
 * It allows users to add and delete todos with optimistic UI updates
 * and provides feedback for processing actions.
 */
export default function TodoList() {
  // State to manage the list of todos and the input text
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");

  // Transition hooks for adding and deleting todos
  const [isAdding, startAddTransition] = useTransition();
  const [isDeleting, startDeleteTransition] = useTransition();
  const isPending = isAdding || isDeleting; // Check if any transition is pending
  const formRef = useRef<HTMLFormElement>(null); // Ref to access the form element

  // Optimistic state management for todos, including processing status
  const [optimisticTodos, addOptimisticTodo] = useOptimistic<
    TodoWithStatus[],
    TodoWithStatus
  >(
    todos.map((todo) => ({ ...todo, isProcessing: false })), // Initialize todos with isProcessing set to false
    (state, newTodo) => [...state, newTodo] // Function to update state with new todo
  );

  // Effect to fetch existing todos from the server
  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  /**
   * Handle adding a new todo.
   * @param {FormData} formData - The form data containing the new todo text.
   */
  const handleAddTodo = async (formData: FormData) => {
    const text = formData.get("text") as string; // Get text from form data
    if (!text.trim()) return; // Exit if text is empty

    startAddTransition(() => {
      // Optimistic update
      const optimisticTodo = {
        id: Date.now(),
        text,
        completed: false,
        isProcessing: true, // Mark todo as processing
      };
      addOptimisticTodo(optimisticTodo); // Update state with optimistic todo
    });

    // Add todo through server action
    await addTodoAction(text);
    setText(""); // Clear input field
    getTodos().then(setTodos); // Fetch updated todos from server
    formRef.current?.reset(); // Reset form
  };

  /**
   * Handle deleting a todo.
   * @param {number} id - The id of the todo to delete.
   */
  const handleDeleteTodo = async (id: number) => {
    startDeleteTransition(() => {
      // Optimistically remove the todo
      setTodos(todos.filter((todo) => todo.id !== id)); // Filter out the deleted todo
    });

    await deleteTodoAction(id); // Call action to delete todo from server
    getTodos().then(setTodos); // Fetch updated todos from server
  };

  // JSX for rendering the Todo List component
  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          padding: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Todo List
        </h1>
        <form
          ref={formRef}
          action={handleAddTodo} // Handle form submission
          style={{ marginBottom: "20px" }}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              name="text"
              value={text}
              onChange={(e) => setText(e.target.value)} // Update text state on input change
              placeholder="Enter a new todo"
              style={{
                flexGrow: 1,
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            <button
              type="submit"
              disabled={isPending} // Disable button during pending transitions
              style={{
                padding: "8px 16px",
                backgroundColor: isPending ? "#ccc" : "#0070f3", // Change background color based on pending state
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: isPending ? "not-allowed" : "pointer",
              }}
            >
              {isPending ? (isAdding ? "Adding..." : "Deleting") : "Add"}
            </button>
          </div>
        </form>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {optimisticTodos.map((todo) => (
            <li
              key={todo.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px",
                backgroundColor: "#f0f0f0",
                borderRadius: "4px",
                marginBottom: "8px",
              }}
            >
              <span>
                {todo.text}
                {todo.isProcessing && ( // Display processing status if todo is being processed
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#666",
                      marginLeft: "8px",
                    }}
                  >
                    (Processing...)
                  </span>
                )}
              </span>
              <button
                onClick={() => handleDeleteTodo(todo.id)} // Handle delete action
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#ff4040",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
              >
                ×
              </button>
            </li>
          ))}
        </ul>

        {optimisticTodos.length === 0 && ( // Message if no todos are present
          <p style={{ textAlign: "center", color: "#666" }}>
            No todos yet. Add one above!
          </p>
        )}
      </div>
    </div>
  );
}