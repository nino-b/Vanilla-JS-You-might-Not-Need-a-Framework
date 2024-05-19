import API from "./API.js";

/** 
 * The 'loadData' function fetches the menu data from the API 
 * and stores it in the 'app.store.menu'.
*/
export default async function loadData() {
  app.store.menu = await API.fetchMenu();
}

/** 
 * 'getProductById' function checks if 'app.store.menu' is loaded.
 * If not, it waits for 'loadData' to load the menu.
 * 
 * Then it iterates through the categories and their products to find the product with the matching 'id'.
 * 
 * If the product is found, it is returned, otherwise 'null' is returned.
*/
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