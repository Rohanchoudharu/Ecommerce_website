import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../api.js";
import { useCart } from "../context/CartContext.jsx";
import { PRODUCTS } from "../data/products.js";

const Home = () => {
  const [products, setProducts] = useState(PRODUCTS);
  const [loading, setLoading] = useState(false);
  const { add } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await apiRequest("/products");
        setProducts(data.products);
      } catch {
        setProducts(PRODUCTS);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const featured = products.slice(0, 4);

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Future-ready essentials</p>
          <h1>Gear that makes everyday feel premium.</h1>
          <p className="lead">
            Curated tech, home, and travel pieces that look sharp and work harder.
            Built for people who move fast and choose intentionally.
          </p>
          <div className="hero-cta">
            <button
              className="primary"
              type="button"
              onClick={() => products[0] && add(products[0])}
            >
              Shop the Drop
            </button>
            <Link className="ghost" to="/product/nova-time-pro">
              Build a Bundle
            </Link>
          </div>
          <div className="hero-stats">
            <div>
              <span className="stat">12k+</span>
              <span className="stat-label">weekly shoppers</span>
            </div>
            <div>
              <span className="stat">4.9</span>
              <span className="stat-label">average rating</span>
            </div>
            <div>
              <span className="stat">24h</span>
              <span className="stat-label">shipping turn</span>
            </div>
          </div>
        </div>
        <div className="hero-card">
          <div className="hero-card__badge">Limited</div>
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80"
            alt="Smart watch"
          />
          <div className="hero-card__meta">
            <h3>Nova Time Pro</h3>
            <p>Smartwatch with 10-day battery</p>
            <div className="price">$219</div>
          </div>
        </div>
      </section>

      <section id="collections" className="collections">
        <h2>Shop by mood</h2>
        <div className="collection-grid">
          <article className="collection">
            <h3>Studio Minimal</h3>
            <p>Desk essentials and focused lighting.</p>
            <button className="ghost small" type="button">
              Explore
            </button>
          </article>
          <article className="collection">
            <h3>Motion Ready</h3>
            <p>Travel kits, commuter bags, and chargers.</p>
            <button className="ghost small" type="button">
              Explore
            </button>
          </article>
          <article className="collection">
            <h3>Everyday Luxe</h3>
            <p>Soft goods, scents, and smart storage.</p>
            <button className="ghost small" type="button">
              Explore
            </button>
          </article>
        </div>
      </section>

      <section id="featured" className="featured">
        <div className="section-head">
          <h2>Featured picks</h2>
          <Link className="ghost" to="/product/nova-time-pro">
            View all
          </Link>
        </div>
        {loading ? (
          <p className="muted">Loading products...</p>
        ) : (
          <div className="product-grid">
            {featured.map((product) => (
              <article className="product" key={product._id || product.id}>
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="product-footer">
                  <span>${product.price}</span>
                  <button
                    className="primary small"
                    type="button"
                    onClick={() => add(product)}
                  >
                    Add
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section id="new" className="promo">
        <div className="promo-card">
          <h2>New drop: Atmos pods</h2>
          <p>Adaptive audio that switches modes automatically. Built for work, travel, and workout.</p>
          <button
            className="primary"
            type="button"
            onClick={() => products[5] && add(products[5])}
          >
            Grab yours
          </button>
        </div>
        <div className="promo-image">
          <img
            src="https://images.unsplash.com/photo-1518441902110-9e67b0f9cfe1?auto=format&fit=crop&w=700&q=80"
            alt="Wireless earbuds"
          />
        </div>
      </section>

      <section id="reviews" className="reviews">
        <h2>What people say</h2>
        <div className="review-grid">
          <article>
            <p>"Packaging was flawless and shipping was insanely fast. The watch is stunning."</p>
            <span>- Mia R.</span>
          </article>
          <article>
            <p>"Everything feels premium without being flashy. The desk lamp is my new favorite."</p>
            <span>- Julian C.</span>
          </article>
          <article>
            <p>"I built a bundle and saved a ton. The site is smooth and the products are legit."</p>
            <span>- Priya L.</span>
          </article>
        </div>
      </section>

      <section className="newsletter">
        <div>
          <h2>Join the Orbit list</h2>
          <p>Drop alerts, early access, and design stories twice a month.</p>
        </div>
        <form>
          <input type="email" placeholder="Email address" />
          <button className="primary" type="button">
            Sign up
          </button>
        </form>
      </section>
    </>
  );
};

export default Home;
