## Summary

A `position: sticky` polyfill that's dependency-free and does not modify the DOM tree, i.e., React-friendly.  See [react-sticky-position](https://github.com/jackmoore/react-sticky-position) for the React component.

#### Demo

Todo

#### Options

##### primary

The DOM node to be made sticky.

##### placeholder

The placeholder is given the height of the primary node when the primary node becomes sticky. This is to maintain the height of the wrapper node when the primary node sticks.

##### wrapper

DOM node that wraps the primary and placeholder nodes.

##### computeWidth

Flag that, when true, will cause the width of the primary and placeholder nodes to be set to the width of the wrapper node.

##### favorPolyfill

Flag that, when true, will override the native browser implementation of sticky positioning and use the polyfill. This is useful if you are experiencing oddities with the native implementation.

##### Install via NPM
```bash
npm install sticky-position
```

Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php)
