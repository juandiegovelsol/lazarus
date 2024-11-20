// Import required modules
import express, { Request, Response, NextFunction } from 'express';
import { validate } from 'joi';

// Initialize Express
const app = express();
app.use(express.json());

// Define the product type
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  availability: number;
}

// Define the purchase item type
interface PurchaseItem {
  id: number;
  quantity: number;
}

// Define the purchase request body type
interface PurchaseRequestBody {
  products: PurchaseItem[];
}

// Define the purchase response type
interface PurchaseResponse {
  total: number;
}

// Simulated products
const products: Product[] = [
  { id: 1, title: 'Product 1', price: 10.99, description: 'This is product 1', availability: 10 },
  { id: 2, title: 'Product 2', price: 5.99, description: 'This is product 2', availability: 20 },
  { id: 3, title: 'Product 3', price: 7.99, description: 'This is product 3', availability: 15 },
];

// Joi validation schema for purchase request body
const purchaseSchema = Joi.object({
  products: Joi.array().required().items(
    Joi.object({
      id: Joi.number().required(),
      quantity: Joi.number().required(),
    }),
  ),
});

// Endpoint to get all products
app.get('/products', (req: Request, res: Response) => {
  res.json(products);
});

// Endpoint to purchase products
app.post('/purchase', (req: Request, res: Response) => {
  // Validate the request body
  const { error } = validate(req.body, purchaseSchema);
  if (error) {
    res.status(400).json({ message: 'Invalid request body' });
    return;
  }

  const purchaseRequestBody: PurchaseRequestBody = req.body;

  // Check if the products exist and have sufficient availability
  let total = 0;
  for (const item of purchaseRequestBody.products) {
    const product = products.find((p) => p.id === item.id);
    if (!product) {
      res.status(404).json({ message: `Product with id ${item.id} not found` });
      return;
    }
    if (product.availability < item.quantity) {
      res.status(400).json({ message: `Insufficient availability for product with id ${item.id}` });
      return;
    }
    total += product.price * item.quantity;
  }

  // Update the availability of the products
  for (const item of purchaseRequestBody.products) {
    const product = products.find((p) => p.id === item.id);
    if (product) {
      product.availability -= item.quantity;
    }
  }

  // Return the purchase total
  const purchaseResponse: PurchaseResponse = { total };
  res.json(purchaseResponse);
});

// Error handling middleware
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});