import { createContext, useContext, useEffect, useState } from "react";
import { apiRequest } from "../api.js";
import { useAuth } from "./AuthContext.jsx";

const CartContext = createContext(null);

const LOCAL_CART_KEY = "orbit-cart";

const readLocalCart = () => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_CART_KEY)) || [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (token) {
        try {
          const data = await apiRequest("/cart", {
            headers: { Authorization: `Bearer ${token}` }
          });
          setItems(
            data.cart.map((item) => ({
              id: item.product._id,
              slug: item.product.slug,
              name: item.product.name,
              price: item.product.price,
              image: item.product.image,
              qty: item.qty
            }))
          );
        } catch {
          setItems(readLocalCart());
        }
      } else {
        setItems(readLocalCart());
      }
      setLoading(false);
    };

    load();
  }, [token]);

  const syncLocal = (next) => {
    localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(next));
    setItems(next);
  };

  const resolveProductId = async (product) => {
    if (product?._id) return product._id;
    const slug = product?.slug || product?.id;
    if (!slug) return null;
    try {
      const data = await apiRequest(`/products/${slug}`);
      return data.product?._id || null;
    } catch {
      return null;
    }
  };

  const add = async (product) => {
    if (!product) return;

    if (token) {
      const productId = await resolveProductId(product);
      if (productId) {
        const data = await apiRequest("/cart/add", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify({ productId, qty: 1 })
        });
        setItems(
          data.cart.map((item) => ({
            id: item.product._id,
            slug: item.product.slug,
            name: item.product.name,
            price: item.product.price,
            image: item.product.image,
            qty: item.qty
          }))
        );
        return;
      }
    }

    const current = readLocalCart();
    const existing = current.find((item) => item.id === product.id);
    if (existing) {
      existing.qty += 1;
      syncLocal([...current]);
    } else {
      syncLocal([...current, { ...product, qty: 1 }]);
    }
  };

  const updateQty = async (id, qty) => {
    if (token) {
      const data = await apiRequest("/cart/update", {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ productId: id, qty })
      });
      setItems(
        data.cart.map((item) => ({
          id: item.product._id,
          slug: item.product.slug,
          name: item.product.name,
          price: item.product.price,
          image: item.product.image,
          qty: item.qty
        }))
      );
      return;
    }

    const current = readLocalCart();
    const next = current
      .map((item) => (item.id === id ? { ...item, qty } : item))
      .filter((item) => item.qty > 0);
    syncLocal(next);
  };

  const remove = async (id) => updateQty(id, 0);

  const clear = async () => {
    if (token) {
      await apiRequest("/cart/clear", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      setItems([]);
      return;
    }
    syncLocal([]);
  };

  const count = items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, loading, count, subtotal, add, updateQty, remove, clear }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
