
const Router = {
  init: () => {
    document.querySelectorAll('a.navlink').forEach(a => {
      a.addEventListener('click', event => {
        event.preventDefault();
        const url = a.getAttribute('href');
        Router.go(url);
      });
    });
    // Event handler for URL changes
    window.addEventListener('popstate', event => {
      Router.go(event.state.route, false);
    });

    // Check the initial URL.
    Router.go(location.pathname);
  },
  /** 
   * We might want to change the history, but don't want to change the route.
   * E.g. if user logs in and then clicks the 'back' button
   * we don't want user to log out, just want to change the page.
  */
  go: (route, addToHistory = true) => {
    if (addToHistory) {
      history.pushState({ route }, '', route);
    }

    let pageElement = null;
    switch (route) {
      case '/':
        pageElement = document.createElement('menu-page');
        break;
      case'/order':
        pageElement = document.createElement('order-page');

        break;
      default:
        if (route.startsWith('.product-')) {
          pageElement = document.createElement('details-page');

          // Push a new element
          const paramId = route.substring(route.lastIndexOf('-') + 1);
          pageElement.dataset.productId = paramId;
        }
    }
    if (pageElement) {
      document.querySelector('main');

      const cache = document.querySelector('main');
      cache.innerHTML = "";
      cache.appendChild(pageElement);
      window.scrollX = 0;
      window.scrollY = 0;
    } else {
      document.querySelector('main').innerHTML = 'Oops, 404!'
    }
  },
}

export default Router;