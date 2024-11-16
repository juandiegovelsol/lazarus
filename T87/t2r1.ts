import express, { Request, Response } from "express";
import { Send } from "express-serve-static-core";

const app = express();
const PORT = 3000;

app.use(express.json());

// Define the Dish interface
interface Dish {
  // Type representing a dish with its properties
  id: number;
  name: string;
  price: number;
  description: string;
  available: number;
}

const dishes: Dish[] = [
  // Using the Dish type to define an array of dishes
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

// Define the interface for an OrderItem
interface OrderItem {
  // Type representing an item in an order
  id: number;
  quantity: number;
}

// Define the types for request and response
export interface TypedRequestBody<T> extends Request {
  // Generic type to represent a request body
  body: T;
}

export interface TypedResponse<ResBody> extends Response {
  // Generic type to represent a response
  json: Send<ResBody, this>;
}

app.get("/dishes", (req: Request, res: Response<Dish[]>) => {
  // Using the Response type with a Dish array
  res.json(dishes);
});

// Type order response
type OrderResponse = { message: string; total: number } | { error: string }; // Union type representing a successful or failed order response

app.post(
  "/order",
  (
    req: TypedRequestBody<{ items: OrderItem[] }>, // Using the TypedRequestBody type with an array of OrderItem
    res: TypedResponse<OrderResponse> // Using the TypedResponse type with an OrderResponse
  ) => {
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      res.status(400).json({ error: "Invalid order format or empty order." });
      return;
    }

    let subtotal = 0;

    for (const item of items) {
      const dish = dishes.find((d) => d.id === item.id);

      if (!dish || dish === undefined) {
        res.status(404).json({ error: `Dish with id ${item.id} not found.` });
        return;
      } else {
        if (dish.available < item.quantity) {
          res
            .status(400)
            .json({ error: `Not enough quantity available for ${dish.name}.` });
          return;
        }

        const discount = item.quantity > 3 ? 0.05 : 0;
        const totalForDish = item.quantity * dish.price * (1 - discount);
        subtotal += totalForDish;

        dish.available -= item.quantity;
      }
    }
    res.json({
      message: "Order created successfully",
      total: subtotal,
    });
  }
);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
