# DOM

DOM is a representation of the document structure in the memory that browsers are creating, and which lets us to connect web pages, the HTML to the JS.

DOM API is a browser API that lets developers manipulate DOM from the scripting language.

From JS, we are not changing the HTML, we are changing the DOM. But the browser is representing the change in the UI and it looks like we are changing the HTML file. So, actually we are changing the memory representation, not the HTML itself.


DOM API is available on the objects:
- 'window' global object.
- 'document' object.
- One object per HTML element other nodes in the document.


In JS each HTML element is represented by a class with the name <b>HTMLElement</b>. 

Other HTML elements are inheriting from that <b>HTMLElement</b>, e.g. there is a <b>HTMLImageElement</b>. Those objects have instance properties and methods. Changes in properties or children will trigger updates in the user interface <b>when we release the thread</b>.


We can listen to the events happening in that elements and react in consequence.

Example:
```
document
   |
   |__HTMLBodyElement
         |
         |__HTMLHeaderElement
              |
              |__HTMLHeadingElement
              |
              |__HTMLParagraphElement
              |
              |__HTMLImageElement
```


To work with DOM elements from JS, we can:
- Pick element from the current DOM.
- Create element and then inject it in the DOM.

To manipulate the element, we need a reference to it.
When we have a reference to an Element we can:
- Read its content.
- Change its content.
- Remove it.
- Add new elements to it.


To work with DOM API, we can select elements from the DOM by:
- ID.
- Class Name.
- Name.
- CSS Selector.
- Navigating the DOM Structure.


When Selecting the elements, some functions return:
- One HTML Element (HTMLElement).
- A live HTML Collection (HTMLCollection).
- Static element collection (NodeList).

To get a reference to one DOM element:
- ```getElementById```
- ```querySelector```
- If no element is found, they will return ```null```.

To get a reference to multiple DOM elements:
- ```getElementsbyTagName``` -  live collections
- ```getElementsbyClassName``` -  live collections
- ```getElementsbyName``` -  live collections
- ```querySelectorAll``` - returns static collection
- If no element is found, they will return an empty collection.


HTMLCollections (live), don't havemodern array interfaces, like: ```filter```, ```map```, ```reduce``` or ```forEach```.
<b>Only ```querySelectorAll``` has ```forEach``` method</b>.

To overcome this problem, by creating an array from the HTMLCollection: ```Array.from(collection)```.


HTML and DOM are not the same. Head and the Body tags can be implicit in HTML. Head and Body are MANDATORY for DOM. In the devTools, we see DOM not the HTML.


```'load'``` waits for everything to be loaded (all files, like css, videos...).

```'DOMContentLoaded'``` waits for the DOM to be loaded, not other files.


Events:
- Load, click, double click.
- Value change.
- Keyboard events: jeyup, keydown, kwypress.
- Mouse events: mouseover, mouseout...
- Pointer and Touch events.
- Scroll, Focus and more APIs.

Some specific objects have specified events:
- ```'DOMContentLoaded'``` in the window
- ```'popstate'``` in the window


Binding functions to events in DOM objects:
- onevent properties.
- addEventListener.


If we apply the same element ```addEventListenet``` the same event more than once, all handlers will be executed. They don't need to be defined all in the same file.


Event listener has three parameters:
1. Event type.
2. Event handler function.
3. Options: {once: false, passive: false} (optional).

```once: true``` - execute event listener only once and then remove it. This way explicitly removing event listener is not necessary.

```passive: true``` - it is telling the browser that it can respond to the action (e.g. scroll) without having to wait for the script. It ensures smooth performance.


We can dispatch events in the document, in the 'window' object.
```js
const event = new Event('customName')
element.dispatchEvent(event);```


When we delete a DOM element, we should EXPLICITY REMOVE event listeners.


Creating shorthands:
```js
const $ = function(args){ return document.querySelector(args);}
const $$ = function(args){ return document.querySelectorAll(args);}

HTMLElement.prototype.on = function(a, b, c){ return this.addEventListener(a, b, c); }
HTMLElement.prototype.off = function(a, b){ return this.removeEventListener(a, b); }
HTMLElement.prototype.$ = function(s){ return this.querySelector(s); }
HTMLElement.prototype.$$ = function(s){ return this.querySelectorAll(s); }
```


Module content are not global. So if we want to make some content global, we can define it as a property of a global 'window' object, e.g.:
```window.app = {} app.store = Store```

Import:
- If we are not using a bundler, when importing modules, use full path: ```import API from "./services/API.js";```
- If we use a bundler, we can use a relative path:
```import API from "./services/API";```