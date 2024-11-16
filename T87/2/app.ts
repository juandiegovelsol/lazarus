import express, { Request, Response } from "express";

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Local storage of dishes
const dishes = [
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

// Endpoint to get all dishes
app.get("/dishes", (req: Request, res: Response) => {
  try {
    res.json(dishes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to create an order
app.post("/order", (req: Request, res: Response) => {
  try {
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ error: "Invalid order format or empty order." });
    }

    let subtotal = 0;

    for (const item of items) {
      const dish = dishes.find((d) => d.id === item.id);

      if (!dish) {
        return res
          .status(404)
          .json({ error: `Dish with id ${item.id} not found.` });
      }

      if (dish.available < item.quantity) {
        return res
          .status(400)
          .json({ error: `Not enough quantity available for ${dish.name}.` });
      }

      const discount = item.quantity > 3 ? 0.05 : 0; // 5% discount for more than 3 items of the same dish
      const totalForDish = item.quantity * dish.price * (1 - discount);

      subtotal += totalForDish;

      // Update availability
      dish.available -= item.quantity;
    }

    res.json({
      message: "Order created successfully",
      total: subtotal,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
