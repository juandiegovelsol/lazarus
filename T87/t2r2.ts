import express, { Request, Response } from "express";
import { Send } from "express-serve-static-core";

const app = express();
const PORT = 3000;

app.use(express.json());

// Define the Dish interface, representing the structure of a single dish
interface Dish {
  id: number;
  name: string;
  price: number;
  description: string;
  available: number;
}

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

// Define the interface for an OrderItem, representing a single item in an order
interface OrderItem {
  id: number; // The ID of the dish being ordered
  quantity: number; // The quantity of the dish being ordered
}

// Define the TypedRequestBody interface, representing a request body with a specific type
interface TypedRequestBody<T> extends Request {
  body: T; // The body of the request with type T
}

// Define the TypedResponse interface, representing a response with a specific type
interface TypedResponse<ResBody> extends Response {
  json: Send<ResBody, this>; // The json method of the response with type ResBody
}

// Use the Dish[] type to define the response type of the /dishes endpoint
app.get("/dishes", (req: Request, res: Response<Dish[]>) => {
  res.json(dishes);
});

// Define the type for the order response, which is either a success message with total or an error message
type OrderResponse = { message: string; total: number } | { error: string };

// Use the TypedRequestBody and TypedResponse interfaces to define the types of the /order endpoint
app.post(
  "/order",
  (
    req: TypedRequestBody<{ items: OrderItem[] }>, // The request body is expected to be an array of OrderItem objects
    res: TypedResponse<OrderResponse> // The response is expected to be an OrderResponse object
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

        const discount = item.quantity > 3 ? 0.05 : 0; // 5% discount for more than 3 items of the same dish
        const totalForDish = item.quantity * dish.price * (1 - discount);
        console.log(totalForDish);
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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
