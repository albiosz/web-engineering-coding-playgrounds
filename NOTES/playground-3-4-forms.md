
# `<input>` in the search form
The `<input>` element in the search form at the top could do with a label, but we don't want to add a visible text label that would potentially spoil the design and isn't really needed by sighted users. Fix this issue by adding a label that is only accessible to screen readers.

## Before the change
- the field does not have a label
- VoiceOvers reads it
  - Search query, Suchtextfeld

## Change
- label added
```html
<form class="search">
    <input type="search" id="search-query" name="q" placeholder="Search query">
    <label for="search-query" class="sr-only">Search the entire website</label>
    <input type="submit" value="Go!">
</form>
```

- css class to make it invisible for sighted users
```css
.sr-only {
  position:absolute;
  left:-10000px;
  top:auto;
  width:1px;
  height:1px;
  overflow:hidden;
}
```

- why not simply `display: none` or `visibility: hidden`?
  - it would make it invisible for the screen readers as well


## After the fix
- the field has a label
- VoiceOvers reads it
  - Search the entire website, Search query, Suchtextfeld

## Sources
- [How to show a label only to Screen Readers - Web Accessiblity](https://stackoverflow.com/questions/13551899/how-to-show-a-label-only-to-screen-readers-web-accessiblity)

# `<input>` in the comment form
The two `<input>` elements in the comment form have visible text labels, but they are not unambiguously associated with their labels — how do you achieve this? Note that you'll need to update some of the CSS rule as well.

## Change
- add labels for the input fields
- exchange `margin` with `gap`


## Questions?
- [ ] Which CSS rule was supposed to be edited?

## Sources
- [`<label>`](https://developer.mozilla.org/de/docs/Web/HTML/Reference/Elements/label)
- [CSS gap property vs. margin property](https://blog.logrocket.com/css-gap-vs-margin/)