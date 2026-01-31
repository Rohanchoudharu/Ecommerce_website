import { useCart } from "../context/CartContext.jsx";

const Cart = () => {
  const { items, loading, subtotal, updateQty, clear } = useCart();
  const shipping = subtotal === 0 ? 0 : 12;
  const total = subtotal + shipping;

  return (
    <section className="cart-page">
      <div className="cart-hero">
        <h1>Your cart</h1>
        <p className="lead">Review your picks before checkout.</p>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          <div className="cart-items__head">
            <span>Item</span>
            <span>Qty</span>
            <span>Price</span>
          </div>
          <div className="cart-items__list">
            {loading ? (
              <div className="cart-empty">Loading cart...</div>
            ) : items.length === 0 ? (
              <div className="cart-empty">Your cart is empty. Start with a few picks.</div>
            ) : (
              items.map((item) => (
                <div className="cart-row" key={item.id}>
                  <div className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <strong>{item.name}</strong>
                      <div className="muted">${item.price.toFixed(2)}</div>
                    </div>
                  </div>
                  <div className="cart-qty">
                    <button type="button" onClick={() => updateQty(item.id, item.qty - 1)}>
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button type="button" onClick={() => updateQty(item.id, item.qty + 1)}>
                      +
                    </button>
                  </div>
                  <div>
                    <strong>${(item.price * item.qty).toFixed(2)}</strong>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <aside className="cart-summary">
          <h2>Order summary</h2>
          <div className="summary-line">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-line">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="summary-line total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="primary" type="button" onClick={clear}>
            Checkout
          </button>
          <p className="fine-print">Free returns within 30 days. Express delivery available at checkout.</p>
        </aside>
      </div>
    </section>
  );
};

export default Cart;
