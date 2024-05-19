
/** 
 * 'MenuPage' extends 'HTMLElement', making it a custom HTML element.
*/

export default class MenuPage extends HTMLElement {
  constructor() {
    super();
    /** 
     * In the constructor 'super()' is called to ensure parent class's constructor is also executed.
    */
    this.root = this.attachShadow({ mode: 'open' }); 

    /** 
     * '<style>' element is created and appended to the shadow root.
    */
    const styles = document.createElement('style');
    this.root.appendChild(styles);

    /** 
     * An asynchronous function 'loadCSS' is defined and invoked immediately to fetch and load CSS styles from '/components/MenuPage.css'.
    */
    async function loadCSS() {
      const request = await fetch('/components/MenuPage.css');
      const css = await request.text();
      styles.textContent = css;
    }
    loadCSS()
  }
  /** 
   * 'connectedCallback' is a lifecycle method that runs when the element is added to the DOM.
  */
  connectedCallback() {
    /** 
     * Fetches a template with the ID 'menu-page-template', 
     * clones the content, and appends it to the shadow root.
    */
    const template = document.getElementById('menu-page-template');
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    /** 
     * An event listener is added for 'appmenuchange' events 
     * which triggers the 'render' method when the event is fired. 
    */
    window.addEventListener('appmenuchange', () => {
      this.render();
    });
    /** 
     * The 'render' method is called to initialize the component's content.
    */
    this.render();
  }
  /** */
  /** 
   * 'render' method updates the component's content
  */
  render() {
    /** 
     * If 'app.store.menu' exists, it clears 
     * the current menu content ('innerHTML = '' ')
     * before rendering new one.
    */
    if (app.store.menu) {
      this.root.querySelector('#menu').innerHTML = '';

      /** 
       * It iterates over the categories of 'app.store.menu'.
      */
      for (let category of app.store.menu) {
        /** 
         *  creates list items for search category
        */
        const liCategory = document.createElement('li');
        
        liCategory.innerHTML = `
        <h3>${category.name}</h3>
        <ul class="category">
        </ul>
        `;
        /** 
         * appends list items to the menu
        */
        this.root.querySelector('#menu').appendChild(liCategory);

        /** 
         * Iterates over each 'product' in the 'category.products' array using the 'forEach' method.
        */
        category.products.forEach(product => {
          /** 
           * For each 'product', a new custom HTML element '<product-item>' is created.
          */
          const item = document.createElement('product-item');
          /** 
           * The 'product' object is converted to a JSON string using 'JSON.stringify(product)' and stored in the 'data-product' attribute of the 'item' element. This way 'product' data is associated with the 'product -item' element and can be easily accessed later.
          */
          item.dataset.product = JSON.stringify(product);
          /** 
           * The 'product-item' element ('item') is then appended as a child to this '<ul>' element.
          */
          liCategory.querySelector('ul').appendChild(item);
        });
      }
    } else {
      /** 
       * If 'app.store.menu' does not exist, 
       * it sets the menu content to 'Loading...'.
      */
      this.root.querySelector('#menu').innerHTML = 'Loading...'
    }
  }
}

/** 
 * Registers 'MenuPage' class as a custom element with the tag name 
 * 'menu-page' making it availabe for use in the HTML 
 * as '<menu-page>'.
*/
customElements.define('menu-page', MenuPage);