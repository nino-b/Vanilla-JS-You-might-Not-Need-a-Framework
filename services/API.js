import loadData from "./Menu.js";

/** 
 * 'API' object contains a 'url' property with path to the menu data
 * and a 'fetchMenu' method that fetches and parses the JSON data from thie URL.
 * 
 * The 'fetchMenu' method uses the Fetch API to retrieve data and 
 * 'await' to handle asynchronous operations.
*/
const API = {
  url: '/data/menu.json',
  fetchMenu: async () => {
    const result = await fetch(API.url);
    return await result.json();
  }
}

export default API;