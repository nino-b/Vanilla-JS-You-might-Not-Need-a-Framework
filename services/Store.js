
const Store = {
  menu: null,
  cart: []
}

const proxiedStore = new Proxy(Store, {
  /** 
   * The 'set' function intercepts assignments to the properties of the 'Store'.
   * Assigns new value to the specified property on the target object.
   * Dispatches custom event when wither 'menu' or 'cart' is changed.
   * Always returns 'true' to indicate that the property set was successful.
   * 
   * If the 'menu' property is changed, a 'appmenuchange' event is dispatched.
   * If the 'cart' property is changed, a 'appcartchange' event is dispatched.
  */
  set(target, property, value) {
    target[property] = value;
    if (property == 'menu') {
      window.dispatchEvent(new Event('appmenuchange'));
    }
    if (property == 'cart') {
      window.dispatchEvent(new Event('appcartchange'));
    }
    return true;
  }
});

export default proxiedStore;