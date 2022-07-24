# vanilla-lettering-js
Vanilla port of the jQuery plugin lettering.js (https://github.com/davatron5000/Lettering.js)

## Usage

Lettering uses 3 methods, **chars** (default), **words** and **lines**.

### Global Context

`lettering` is assigned to an object called `Tools` in global context by default:

```javascript
document.Tools.lettering('.some-header');
document.Tools.lettering('.some-subline', 'lines');
```

### Attribute

Add a `data-lettering` attribute to the element instead of calling the global function:

```html
<span data-lettering="words">This is some text</span>
```

This will automatically on document ready produce:

```html
<span>
  <span class="word1">This</span>
  <span class="word2">is</span>
  <span class="word3">some</span>
  <span class="word4">text</span>
</span>
```
