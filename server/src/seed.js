import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "./models/Product.js";

dotenv.config();

const products = [
  {
    name: "Nova Time Pro",
    slug: "nova-time-pro",
    description: "Smartwatch with 10-day battery and precision metal case.",
    price: 219,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80",
    category: "featured",
    rating: 4.9
  },
  {
    name: "Halo Headphones",
    slug: "halo-headphones",
    description: "Noise cancelling headphones with matte finish.",
    price: 199,
    image: "https://images.unsplash.com/photo-1512499617640-c2f999018b72?auto=format&fit=crop&w=700&q=80",
    category: "featured",
    rating: 4.8
  },
  {
    name: "Lenscraft Mini",
    slug: "lenscraft-mini",
    description: "Compact mirrorless camera for every moment.",
    price: 489,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=700&q=80",
    category: "featured",
    rating: 4.7
  },
  {
    name: "Arc Desk Lamp",
    slug: "arc-desk-lamp",
    description: "Warm glow, dimmable arc desk lamp.",
    price: 79,
    image: "https://images.unsplash.com/photo-1518441983254-51d2b9f5f0b4?auto=format&fit=crop&w=700&q=80",
    category: "home",
    rating: 4.8
  },
  {
    name: "Pulse Pack",
    slug: "pulse-pack",
    description: "Weatherproof backpack with 28L capacity.",
    price: 129,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=80",
    category: "travel",
    rating: 4.6
  },
  {
    name: "Atmos Pods",
    slug: "atmos-pods",
    description: "Adaptive audio earbuds for work, travel, and workout.",
    price: 149,
    image: "https://images.unsplash.com/photo-1518441902110-9e67b0f9cfe1?auto=format&fit=crop&w=700&q=80",
    category: "new",
    rating: 4.7
  }
];

const run = async () => {
  try {
    const uri = process.env.MONGO_URI || "mongodb://localhost:27017/orbitcart";
    await mongoose.connect(uri);
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Seeded products");
    await mongoose.connection.close();
  } catch (err) {
    console.error("Seed failed", err);
    process.exit(1);
  }
};

run();
