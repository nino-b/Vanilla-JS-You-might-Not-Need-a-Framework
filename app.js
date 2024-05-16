import proxiedStore from "./services/Store.js";
import Router from "./services/Router.js";
import API from "./services/API.js";
import loadData from "./services/Menu.js";

// Link web components to HTML
import MenuPage from "./components/MenuPage.js";
import DetailsPage from "./components/DetailsPage.js";
import OrderPage from "./components/OrderPage.js";
import ProductItem from "./components/ProductItem.js";
import CartItem from "./components/CartItem.js";

window.app = {}
app.store = proxiedStore;
app.router = Router;

// Another place where we can call it too
customElements.define('order-page', OrderPage);

window.addEventListener('DOMContentLoaded', async () => {
  loadData();
  app.router.init();
});

window.addEventListener('appcartchange', event => {
  const badge = document.getElementById('badge');
  const qty = app.store.cart.reduce((acc, item) =>  acc + item.quantity, 0);
  badge.textContent = qty;
  badge.hidden = qty == 0;
});