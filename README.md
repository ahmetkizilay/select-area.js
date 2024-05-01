# select-area.js

This is a small Javascript module to select and get the relative coordinates of an area on a webpage. 

Once called, a semi-transparent ```<div>``` is created on top of the target element and a fully-transparent white rectangle is repositioned according to mouse click and drag.

#### Usage
Use ```createWallFor``` method passing the target ```<div>``` on top of which the semi-transparent wall will be added as the argument. See below for the available methods to invoke on the return value.

#### Available methods
* __onSelectionStart__: method to be called when mouse is pressed on the cover.
* __onSelectionChange__: method to be called when mouse is dragged during selection ie. during the selected area is being resized.
* __onSelected__: method to be called called when selection is completed ie. when the mouse is released. 
* __close__: destroys the ```<div>```

#### Sample Code
```javascript
var tracker = document.querySelector('#tracker span');

var wall = createWallFor('#main');
wall.onSelectionStart(function () {
    tracker.innerHTML = 'select a region';
});
wall.onSelectionChange(function (result) {
    tracker.innerHTML = 'l: ' + result.left + ', t: ' + result.top + ', w: ' + result.width + ', h: ' + result.height;
});
wall.onSelected(function (result) {
    tracker.innerHTML = 'l: ' + result.left + ', t: ' + result.top + ', w: ' + result.width + ', h: ' + result.height;
});
```

#### See also
Live examples are available [here](https://ahmetkizilay.github.io/select-area.js/index.html) and [here](https://ahmetkizilay.github.io/select-area.js/svg-capture.html).

Also checkout my other [repository](https://github.com/ahmetkizilay/highlight-area.js) for programmatically highlighting HTML elements and mouse tracking.