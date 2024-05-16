# Routing

## History API

Pushing a new URL (the second argument is unused):
```history.pushState(optional_state, null, "/new-url"); ```

Listening for changes in the URL within the same page navigation:
```js
window.addEventListener("popstate", event => {
  const url = location.href;
});
```

```'popstate'``` is used when user clicks back or forward button.

```'popstate'``` won't be fired if user clicks on an external link or changes the URL manually.

Clear everything in the ```<main>```:  
```document.querySelector('main').childNodes``` - it will return everything, code, comments, white space.  
```document.querySelector('main').children``` - will return just code.