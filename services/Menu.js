import API from "./API.js";

export default async function loadData() {
  app.store.menu = await API.fetchMenu();
}

// In case menu is not loaded, async function will wait for data to be loaded
export async function getProductById(id) {
  if (app.store.menu == null) {
    await loadData();
  }
  for (const c of app.store.menu) {
    for (const p of c.products) {
      if (p.id == id) {
        return p;
      }
    }
  }
  return null;
}