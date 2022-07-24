# vanilla-lettering-js
Vanilla port of the jQuery plugin lettering.js (https://github.com/davatron5000/Lettering.js)

## Methods

Lettering uses 3 methods, **chars** (default), **words** and **lines**.

### chars

```html
<span data-attribute="chars">This is some text</span>
```

```html
<span data-attribute="chars">
  <span class="char1">T<span>
  <span class="char2">h<span>
  <span class="char3">i<span>
  <span class="char4">s<span>
  <span class="char-space"> <span>
  <span class="char6">i<span>
  <span class="char7">s<span>
  <span class="char-space"> <span>
  <span class="char9">s<span>
  <span class="char10">o<span>
  <span class="char11">m<span>
  <span class="char11">e<span>
  <span class="char-space"> <span>
  <span class="char13">t<span>
  <span class="char14">e<span>
  <span class="char15">x<span>
  <span class="char16">t<span>
<span>
```

### words

```html
<span data-attribute="words">This is some text</span>
```

```html
<span data-attribute="chars">
  <span class="word1">This<span>
  <span class="word2">is<span>
  <span class="word3">some<span>
  <span class="word4">text<span>
</span>
```

_todo_: 
splitting words in chars used with jQuery chaining (https://github.com/davatron5000/Lettering.js/wiki/Chaining-with-lettering())

## Usage

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

This will automatically produce on document ready:

```html
<span>
  <span class="word1">This</span>
  <span class="word2">is</span>
  <span class="word3">some</span>
  <span class="word4">text</span>
</span>
```
