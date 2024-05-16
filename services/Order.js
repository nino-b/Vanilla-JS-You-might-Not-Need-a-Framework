import { getProductById } from "./Menu.js";

export default async function addToCart(id) {
  const product = await getProductById(id);
  const results = app.store.cart.filter(prodInCart => {
    return prodInCart.product.id == id;
  });
  if (results.length == 1) {
    app.store.cart = app.store.cart.map(p => {
      return p.product.id == id ? {...p, quantity: p.quantity} : p;
    });
  } else {
    // Because we are just changing the value
    // we won't use 'app.store.cart.push',
    // instead we just assign a new array that combines old and new values
    app.store.cart = [...app.store.cart, {product, quantity: 1}];
  }
}

export function removeFromCart(id) {
  app.store.cart = app.store.cart.filter(p => p.product.id != id);
}