// Import required modules
import express, { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

// Initialize Express app
const app = express();
app.use(express.json());

// Define product type
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  availability: number;
}

// Define purchase item type
interface PurchaseItem {
  id: number;
  quantity: number;
}

// Define purchase request body type
interface PurchaseRequestBody {
  products: PurchaseItem[];
}

// Define Joi validation schema for purchase request body
const purchaseSchema = Joi.object({
  products: Joi.array().required().items(
    Joi.object({
      id: Joi.number().integer().positive().required(),
      quantity: Joi.number().integer().positive().required(),
    }),
  ),
});

// Simulated products
const products: Product[] = [
  {
    id: 1,
    title: 'Product 1',
    price: 10.99,
    description: 'This is product 1',
    availability: 10,
  },
  {
    id: 2,
    title: 'Product 2',
    price: 9.99,
    description: 'This is product 2',
    availability: 5,
  },
  {
    id: 3,
    title: 'Product 3',
    price: 12.99,
    description: 'This is product 3',
    availability: 8,
  },
];

// Endpoint to get all products
app.get('/products', (req: Request, res: Response) => {
  res.json(products);
});

// Endpoint to purchase products
app.post('/purchase', (req: Request, res: Response) => {
  try {
    // Validate request body
    const { error } = purchaseSchema.validate(req.body);
    if (error) {
      throw new Error('Invalid request body');
    }

    const purchaseRequestBody: PurchaseRequestBody = req.body;
    const productsRequest = purchaseRequestBody.products;

    // Check the product array in request object is not empty
    if (!productsRequest.length) {
        throw new Error('Invalid input, the products array must include at least one product');
    }

    // Check if products exist and have sufficient availability
    let total = 0;
    for (const item of productsRequest) {
      const product = products.find((p) => p.id === item.id);
      if (!product) {
        throw new Error(`Product with id ${item.id} does not exist`);
      }
      if (product.availability < item.quantity) {
        throw new Error(`Product with id ${item.id} does not have sufficient availability`);
      }
      total += product.price * item.quantity;
    }

    // Update product availability
    for (const item of purchaseRequestBody.products) {
      const product = products.find((p) => p.id === item.id);
      if (product) {
        product.availability -= item.quantity;
      }
    }

    res.json({ total });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Error handling middleware
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});