const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Stack implementation using two queues
class Stack {
  constructor() {
    this.queue1 = [];
    this.queue2 = [];
  }

  // Push an element onto the stack
  push(element) {
    if (this.queue2.length > 0) {
      // Clear queue2 if it's not empty
      this.queue2 = [];
    }
    this.queue1.push(element);
  }

  // Pop an element from the stack
  pop() {
    if (this.queue1.length === 0) {
      return null; // No elements to pop
    }

    while (this.queue1.length > 1) {
      this.queue2.push(this.queue1.shift());
    }

    const poppedElement = this.queue1.shift(); // This should be returned

    // Swap the queues
    [this.queue1, this.queue2] = [this.queue2, this.queue1];

    return poppedElement;
  }

  // Get the current size of the stack
  size() {
    return this.queue1.length + this.queue2.length;
  }

  // Check if the stack is empty
  isEmpty() {
    return this.size() === 0;
  }
}

const stack = new Stack();

// API endpoint to push an element to the stack
app.post("/stack/push", (req, res) => {
  const { element } = req.body;

  if (element === undefined || element === null) {
    return res
      .status(400)
      .json({ error: "Element is required and cannot be null." });
  }

  if (
    typeof element !== "string" &&
    typeof element !== "number" &&
    typeof element !== "boolean"
  ) {
    return res
      .status(400)
      .json({ error: "Element must be a string, number, or boolean." });
  }

  stack.push(element);
  res.json({ message: "Element pushed to stack.", stackSize: stack.size() });
});

// API endpoint to pop an element from the stack
app.get("/stack/pop", (req, res) => {
  if (stack.isEmpty()) {
    return res.status(404).json({ error: "Stack is empty. Cannot pop." });
  }

  const poppedElement = stack.pop();

  res.json({ poppedElement, stackSize: stack.size() });
});

// API endpoint to get the current stack size
app.get("/stack/size", (req, res) => {
  res.json({ size: stack.size() });
});

// API endpoint to check if the stack is empty
app.get("/stack/isEmpty", (req, res) => {
  res.json({ isEmpty: stack.isEmpty() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
