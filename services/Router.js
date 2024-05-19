/** */
const Router = {
  /** 
   * The init method sets up event listeners for navigation links 
   * and handles initial URL routing.
  */
  init: () => {
    /** 
     * The method selects all anchor elements ('<a>') 
     * with the class 'navlink'
    */
    document.querySelectorAll('a.navlink').forEach(a => {
      /** 
       * For each of these links, it adds a click event listener.
      */
      a.addEventListener('click', event => {
        /** 
         * The event listener prevents the default link behavior
         * (sending request to server).
        */
        event.preventDefault();
        /** 
         * Retrieves the URL from the link's href attribute
        */
        const url = a.getAttribute('href');
        /** 
         * Calls Router.go(url) to handle the routing
        */
        Router.go(url);
      });
    });
    /** 
     * This event is triggered when the user navigates 
     * using the browser's back or forward buttons.
    */
    window.addEventListener('popstate', event => {
      /** 
       * The listener calls Router.go with the 
       * route stored in the event's state
       * (this is about when we pushed '{ route }' 
       * as the first (state object) argument to the history: 
       * ' history.pushState({ route }, '', route);'), 
       * but without adding this state to the browser's history 
       * (addToHistory = false).
      */
      Router.go(event.state.route, false);
    });

    /** 
     * The method calls Router.go(location.pathname) 
     * to handle the initial URL when the page loads.
     * 
     * This is important because if user pastes the link that is 
     * on the specific page, it should be opened on that page,
     * not on the initial page.
    */
    Router.go(location.pathname);
  },
  /** 
   * 'addToHistory = true' option exists because
   * we might want to change the history, but don't want to change the route.
   * E.g. if user logs in and then clicks the 'back' button
   * we don't want user to log out, just want to change the page.
  */
  go: (route, addToHistory = true) => {
    /** 
     * If addToHistory is true, it adds the route to the 
     * browser's history using 'history.pushState'.
     * 
     * '{ route }' - state object, associated with the new history entry. 
     * In this case stores route being navigated to.
     * '' - intended to be the title of the new history entry,
     * but it is not used any more.
     * 'route'-  URL for the history entry. 
     * Must be of the same origin as the current URL.
    */
    if (addToHistory) {
      history.pushState({ route }, '', route);
    }

    /** 
     * It determines which custom element to create based on the route.
    */
    let pageElement = null;
    switch (route) {
      /** 
       * '/' creates a <menu-page> element
      */
      case '/':
        pageElement = document.createElement('menu-page');
        break;
      /** 
       * '/order' creates an <order-page> element.
      */
      case'/order':
        pageElement = document.createElement('order-page');
        break;

      /** 
       * Routes starting with '.product-' create 
       * a <details-page> element and set its productId dataset property.
       * If no matching route is found, pageElement remains null.
      */
      default:
        /** 
         * Within the default case, there is a check to see 
         * if the route starts with the string '.product-'.
         * 
         * This is used to identify routes that represent 
         * individual products, typically followed by a 
         * unique identifier (e.g., '.product-123').
        */
        if (route.startsWith('.product-')) {
          /** 
           * If the route matches the condition, a new 
           * custom element <details-page> is created 
          */
          pageElement = document.createElement('details-page');

          /** 
           * const paramId = route.substring(route.lastIndexOf('-') + 1); 
           * extracts the product ID from the route.
           * 'route.lastIndexOf('-')' finds the position 
           * of the last hyphen in the route string.
           * 'route.substring(route.lastIndexOf('-') + 1)' 
           * extracts the substring that follows the last hyphen, 
           * which represents the product ID.
          */
          const paramId = route.substring(route.lastIndexOf('-') + 1);
          /** 
           * 'pageElement.dataset.productId = paramId;' 
           * sets a custom data attribute data-product-id 
           * on the <details-page> element, assigning it the 
           * extracted product ID.
           * 
           * This allows the <details-page> element to access the 
           * product ID and fetch or display the relevant product details.
          */
          pageElement.dataset.productId = paramId;
        }
    }
    /** 
     * Updating the DOM.
     * 
     * If a pageElement is created, it replaces the content of the <main> element with this new element and scrolls the window to the top.
    */
    if (pageElement) {
      document.querySelector('main');

      const cache = document.querySelector('main');
      cache.innerHTML = "";
      cache.appendChild(pageElement);
      window.scrollX = 0;
      window.scrollY = 0;
    } else {
      /** 
       * If no pageElement is created, it displays a "404" message in the <main> element.
      */
      document.querySelector('main').innerHTML = 'Oops, 404!'
    }
  },
}

export default Router;