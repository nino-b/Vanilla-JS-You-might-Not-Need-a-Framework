# Web Component

Web Component is a modular, reusable building block for web development that encapsulates a set of related functionality and user interface elements.


It is a set of standards:
- Custom Elements
- HTML Templates.
- Shadow DOM.
- Declarative Shadow DOM.


## Custom Element

A way to define new, reusable HTML elements with custom behavior and functionality using JS.  
In other words, it registers a custom HTML element in the browser.

- In the name of custom elements, we must use a HYPHEN ('-'). This way we avoid future conflicts in future reserved words.
- Custom element class must extend ```HTMLElement``` class (don't forget ```super()``` in the constructor).
- Attributes are defined: from JS with ```dataset```, and from HTML from ```data-```.
- Slot - a placeholder in a custom element that we can fill with a markup content. We can have multiple slots.


```js
class MyElement extends HTMLElement {
 constructor() {
 super();
 }
}
customElements.define("my-element",
 MyElement);
```
```html
<body>
 <my-element> /my-element>
/body>
<script>
document.createElement("my-element");
/script>
```


#### Custom Elements Lifecycle

```js
class MyElement extends HTMLElement {
 constructor() { // Set up initial state, event listeners, etc.
 super();
 }
 connectedCallback() { }    // The element is added to the document
 disconnectedCallback() { } // The element is removed to the document
 adoptedCallback() { } // The element has been moved to a new document
 attributeChangedCallback(name, oldValue, new Value) { } // Every time there is a change in the attribute, this callback will be executed
}
customElements.define("my-element", MyElement);
```


Custom Elements with Customized Builtins
```js
class MyCustomElement extends HTMLElement
{
 constructor() {
 super();
 }
}
customElements.define("my-element",
 MyElement);
 ```
 ```html
 <div is="my-element"></div>
```


#### Template Element

Fragments of markup that can be cloned and inserted into the document at runtime, with reusable HTML content that can be rendered and modified dynamically.  
```<template></template>```


Template Element Cloning
```js
connectedCallback() {
 const template = document.getElementById("template1");
 const content = template.content.cloneNode(true);
 this.appendChild(content);
}
```


#### Shadow DOM

A private, isolated DOM tree within a web component that is separate from the main document's DOM tree.

CSS that is declared for the main DOM won't apply to the elements in the Shadow DOM and vice versa.

There are pseudo-classes and pseudo-elements that allow communication between DOMs in stylesheets. 

Shadow DOM can be opened or closed, defining visibility from the outer DOM. If Shadow DOM is opened, DOM elements from the outer DOM can access inside elements of the Shadow DOM.


```js
class MyElement extends HTMLElement {
 constructor() {
 super();
 this.root = this.attachShadow({ mode: "open" });
 }
 connectedCallback() {
 this.root.appendChild( .)
 }
}
```

```html
<template id="template1">
 <style>
 * this declaration ONLY changes h1s inside this custom element /
 h1 { color: red }
 </style>
 <header>
 <h1>This is a template </h1>
 <p>This content is not rendered initially </p>
 </header>
</template>
```


Where to define HTML for a Custom Element:
- Use DOM APIs
- Use a ```<template>``` in the main HTML
- Use an external HTML file loaded withfetch (it can be prefetched)
  - Using innerHTML
  - Using DOMParser


#### Declarative Shadow DOM

A way to define Shadow DOM directly in the HTML using a new set of attributes and tags. At this moment not all browsers are supporting it!!!

Where to define CSS for a Custom Element:
Use CSSOM APIs
- Add a ```<script>``` to a ```<template>```.
- Add a ```<link>``` in the ```<template>```.
- Use an external CSS file loaded with fetch (it can be prefetched) and injected in the Shadow DOM as a ```<style>```.


Where is the link between template and the custom element?

There is no link between template and the custom element. Instead we are going to load that template e.g. by ID.  
We can reuse the same template for more than one custom element. This is why cloning is necessary.