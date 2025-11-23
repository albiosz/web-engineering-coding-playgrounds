
# Web Component - "Add comment" section
Create a web component for the "Add comment" section. Use te shadow DOM and template syntax to encapsulate all related styles inside the component.


## Changes
1. moved the html code responsible for showing the comment section into a separate .html file
2. did the same with styles used for the table
3. removed the html and css code from the global files
4. created a `CommentSection` with the corresponding logic
  - the logic of the component added to the `connectedCallback()` method in the class
5. defined a custom element
  - `customElements.define('comment-section', CommentSection);`
6. used the component in the `index.html`


"""
`connectedCallback()`: Called each time the element is added to the document. The specification recommends that, as far as possible, developers should implement custom element setup in this callback rather than the constructor.
"""


## Problems
- the font size set in global `style.css` does not take effect on this separated component
  - I copied the `/* || typography */` section of `style.css` to the `comment-section.css` so the text style does not differ


## Sources
- [Using custom elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements)