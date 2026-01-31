import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiRequest } from "../api.js";
import { useCart } from "../context/CartContext.jsx";
import { PRODUCTS } from "../data/products.js";

const Product = () => {
  const { id } = useParams();
  const { add } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await apiRequest(`/products/${id}`);
        setProduct(data.product);
      } catch {
        setProduct(PRODUCTS.find((item) => item.id === id));
      }
    };

    loadProduct();
  }, [id]);

  if (!product) {
    return <p className="muted">Loading product...</p>;
  }

  return (
    <section className="product-hero">
      <div className="product-gallery">
        <img src={product.image} alt={product.name} />
        <div className="product-thumbs">
          <img src={product.image} alt={`${product.name} side`} />
          <img src={product.image} alt={`${product.name} angle`} />
          <img src={product.image} alt={`${product.name} detail`} />
        </div>
      </div>
      <div className="product-info">
        <p className="eyebrow">Limited run</p>
        <h1>{product.name}</h1>
        <p className="lead">{product.description}</p>
        <div className="price">${product.price}</div>
        <div className="product-actions">
          <button className="primary" type="button" onClick={() => add(product)}>
            Add to cart
          </button>
          <button className="ghost" type="button">
            Add to wishlist
          </button>
        </div>
        <div className="product-details">
          <div>
            <h4>Materials</h4>
            <p>Recycled aluminum, sapphire glass, vegan band.</p>
          </div>
          <div>
            <h4>What is included</h4>
            <p>Charging dock, travel case, and extra band.</p>
          </div>
          <div>
            <h4>Delivery</h4>
            <p>Ships in 24 hours with carbon-neutral delivery.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
