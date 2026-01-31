import express from "express";
import authMiddleware from "../middleware/auth.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate("cart.product");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ cart: user.cart });
  } catch (err) {
    return next(err);
  }
});

router.post("/add", authMiddleware, async (req, res, next) => {
  try {
    const { productId, qty = 1 } = req.body;
    if (!productId) {
      return res.status(400).json({ message: "Product ID required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existing = user.cart.find((item) => item.product.toString() === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      user.cart.push({ product: productId, qty });
    }

    await user.save();
    await user.populate("cart.product");
    return res.json({ cart: user.cart });
  } catch (err) {
    return next(err);
  }
});

router.patch("/update", authMiddleware, async (req, res, next) => {
  try {
    const { productId, qty } = req.body;
    if (!productId || typeof qty !== "number") {
      return res.status(400).json({ message: "Product ID and qty required" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.cart = user.cart
      .map((item) => {
        if (item.product.toString() === productId) {
          return { product: item.product, qty };
        }
        return item;
      })
      .filter((item) => item.qty > 0);

    await user.save();
    await user.populate("cart.product");
    return res.json({ cart: user.cart });
  } catch (err) {
    return next(err);
  }
});

router.delete("/remove/:productId", authMiddleware, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.cart = user.cart.filter(
      (item) => item.product.toString() !== req.params.productId
    );

    await user.save();
    await user.populate("cart.product");
    return res.json({ cart: user.cart });
  } catch (err) {
    return next(err);
  }
});

router.post("/clear", authMiddleware, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.cart = [];
    await user.save();
    return res.json({ cart: [] });
  } catch (err) {
    return next(err);
  }
});

export default router;
