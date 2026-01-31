import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, default: "featured" },
    rating: { type: Number, default: 4.8 }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
