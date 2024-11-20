import express, { Request, Response } from "express";
import { Send } from "express-serve-static-core";

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Define the Dish interface
interface Dish {
  id: number;
  name: string;
  price: number;
  description: string;
  available: number;
}

// Define the local storage of dishes
const dishes: Dish[] = [
  {
    id: 1,
    name: "Spaghetti Carbonara",
    price: 12,
    description: "Classic Italian pasta",
    available: 10,
  },
  {
    id: 2,
    name: "Caesar Salad",
    price: 8,
    description: "Crisp romaine with Caesar dressing",
    available: 20,
  },
  {
    id: 3,
    name: "Margherita Pizza",
    price: 15,
    description: "Pizza with fresh basil and mozzarella",
    available: 5,
  },
  {
    id: 4,
    name: "Grilled Salmon",
    price: 18,
    description: "Salmon fillet with lemon butter sauce",
    available: 7,
  },
  {
    id: 5,
    name: "Chocolate Lava Cake",
    price: 6,
    description: "Warm chocolate cake with gooey center",
    available: 8,
  },
];

// Define the types for request and response
interface TypedRequestBody extends Request {
  body: { items: { id: number; quantity: number }[] };
}

// Define the TypedDishResponse type
interface TypedDishResponse extends Response {
  json: Send<
    {
      id: number;
      name: string;
      price: number;
      description: string;
      available: number;
    }[],
    this
  >;
}

// Define the TypedOrderResponse type
interface TypedOrderResponse extends Response {
  json: Send<{ message: string; total: number } | { error: string }, this>;
}

// Endpoint to get all dishes
app.get("/dishes", (req: Request, res: TypedDishResponse) => {
  res.json(dishes);
});

// Endpoint to create an order
app.post(
  "/order",
  (req: TypedRequestBody, res: TypedOrderResponse) => {
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      res.status(400).json({ error: "Invalid order format or empty order." });
      return;
    }

    let subtotal = 0;

    for (const item of items) {
      const dish = dishes.find((d) => d.id === item.id);

      if (!dish) {
        res.status(404).json({ error: `Dish with id ${item.id} not found.` });
        return;
      } else {
        if (dish.available < item.quantity) {
          res
            .status(400)
            .json({ error: `Not enough quantity available for ${dish.name}.` });
          return;
        }

        const discount = item.quantity > 3 ? 0.05 : 0; // 5% discount for more than 3 items of the same dish
        const totalForDish = item.quantity * dish.price * (1 - discount);
        subtotal += totalForDish;

        // Update availability
        dish.available -= item.quantity;
      }
    }
    res.json({
      message: "Order created successfully",
      total: subtotal,
    });
  }
);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
