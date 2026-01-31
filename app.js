const PRODUCTS = [
  {
    id: "nova-time-pro",
    name: "Nova Time Pro",
    price: 219,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "halo-headphones",
    name: "Halo Headphones",
    price: 199,
    image: "https://images.unsplash.com/photo-1512499617640-c2f999018b72?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "lenscraft-mini",
    name: "Lenscraft Mini",
    price: 489,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "arc-desk-lamp",
    name: "Arc Desk Lamp",
    price: 79,
    image: "https://images.unsplash.com/photo-1518441983254-51d2b9f5f0b4?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "pulse-pack",
    name: "Pulse Pack",
    price: 129,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "atmos-pods",
    name: "Atmos Pods",
    price: 149,
    image: "https://images.unsplash.com/photo-1518441902110-9e67b0f9cfe1?auto=format&fit=crop&w=400&q=80"
  }
];

const CART_KEY = "orbit-cart";

const loadCart = () => {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (err) {
    return [];
  }
};

const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

const getCartCount = (cart) => cart.reduce((total, item) => total + item.qty, 0);

const findProduct = (id) => PRODUCTS.find((product) => product.id === id);

const addToCart = (id) => {
  const cart = loadCart();
  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, qty: 1 });
  }
  saveCart(cart);
  updateCartCount();
};

const updateCartCount = () => {
  const cart = loadCart();
  const count = getCartCount(cart);
  document.querySelectorAll(".cart-count").forEach((el) => {
    el.textContent = count;
  });
};

const formatMoney = (value) => `$${value.toFixed(2)}`;

const renderCart = () => {
  const list = document.querySelector(".cart-items__list");
  if (!list) return;

  const cart = loadCart();
  if (cart.length === 0) {
    list.innerHTML = `<div class="cart-empty">Your cart is empty. Start with a few picks.</div>`;
    updateSummary(0);
    return;
  }

  list.innerHTML = cart
    .map((item) => {
      const product = findProduct(item.id);
      if (!product) return "";
      return `
        <div class="cart-row" data-id="${item.id}">
          <div class="cart-item">
            <img src="${product.image}" alt="${product.name}" />
            <div>
              <strong>${product.name}</strong>
              <div class="muted">${formatMoney(product.price)}</div>
            </div>
          </div>
          <div class="cart-qty">
            <button type="button" data-action="decrease">-</button>
            <span>${item.qty}</span>
            <button type="button" data-action="increase">+</button>
          </div>
          <div>
            <strong>${formatMoney(product.price * item.qty)}</strong>
          </div>
        </div>
      `;
    })
    .join("");

  const subtotal = cart.reduce((sum, item) => {
    const product = findProduct(item.id);
    return product ? sum + product.price * item.qty : sum;
  }, 0);

  updateSummary(subtotal);
};

const updateSummary = (subtotal) => {
  const shipping = subtotal === 0 ? 0 : 12;
  const total = subtotal + shipping;
  const subtotalEl = document.querySelector(".summary-subtotal");
  const shippingEl = document.querySelector(".summary-shipping");
  const totalEl = document.querySelector(".summary-total");
  if (subtotalEl) subtotalEl.textContent = formatMoney(subtotal);
  if (shippingEl) shippingEl.textContent = formatMoney(shipping);
  if (totalEl) totalEl.textContent = formatMoney(total);
};

const setupCartInteractions = () => {
  const list = document.querySelector(".cart-items__list");
  if (!list) return;

  list.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    const row = event.target.closest(".cart-row");
    if (!row) return;
    const id = row.dataset.id;
    const cart = loadCart();
    const item = cart.find((entry) => entry.id === id);
    if (!item) return;

    if (button.dataset.action === "increase") {
      item.qty += 1;
    } else if (button.dataset.action === "decrease") {
      item.qty -= 1;
      if (item.qty <= 0) {
        const index = cart.findIndex((entry) => entry.id === id);
        cart.splice(index, 1);
      }
    }

    saveCart(cart);
    updateCartCount();
    renderCart();
  });
};

const bindAddButtons = () => {
  document.querySelectorAll("[data-add-to-cart]").forEach((button) => {
    button.addEventListener("click", () => {
      addToCart(button.dataset.addToCart);
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  bindAddButtons();
  renderCart();
  setupCartInteractions();
});
