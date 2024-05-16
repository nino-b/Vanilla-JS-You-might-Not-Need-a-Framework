# Reactive Programming

Proxy   
A wrapper object that lets you intercept and modify operations performed on the wrapped object, allowing you to add custom behavior or validation to the object's properties and methods.

Proxies work with objects only. If we want to do something similar with simpler values, we can use classes with getters and setters.

```js
const original = {
 name: 'John Doe',
 age: 30
};
const s = new Proxy(original, handler);
console.log(s.age); // 30 years old
```


Proxy Handler  
Object that contains traps for intercepting and customizing operations performed on a JS Proxy Object.

Proxy Trap  
Method on a Proxy Handler Object that intercepts and customizes a specific operation performed on the target.


Most used Proxy Traps:
- get.
- set.
- has.
- deleteProperty.
- apply.
- construct.
- getOwnPropertyDescriptor.
- defineProperty.
- ownKeys.


Proxy Traps are also executed when we access a method (function) of the object.


With arrays and the usage of ```[]``` accessor, we can trap get and set and the index will be the property.

To detect changes in arrays. it's not just the accessor [], there are functions, like ```push``` that we can trap with ```apply```.


```event.target;``` - a lower level element where we clicked on.
```event.currentTarget;``` - the element that has event listener attached to.


```form.elements``` we can use to access form elements from JS. It returns an array.


```'change'``` event is triggered automatically only when user changes the UI.


Every time we call ```set```, we need to return ```true``` or ```false```.