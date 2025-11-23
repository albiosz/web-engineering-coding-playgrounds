import styles from './comment-section.css?inline'; // assets imported as a string, but may be processed by the bundler (Vite)
import template from './comment-section.html?raw'; // assets imported as a raw string

export class CommentSection extends HTMLElement {
  private shadow: ShadowRoot;

  constructor() {
    super();

    // create a shadow root
    // the custom element itself is the shadow host
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  // Called each time the element is added to the document
  async connectedCallback() {
    const templateElement = document.createElement('template');
    templateElement.innerHTML = `
      <style>${styles}</style>
      ${template}
    `;

    this.shadow.appendChild(templateElement.content.cloneNode(true));

    this.initializeEventListeners();
  }

  private initializeEventListeners(): void {
    const shadow = this.shadowRoot;
    if (!shadow) return;

    const showHideBtn = shadow.querySelector('.show-hide') as HTMLElement;
    const commentWrapper = shadow.querySelector(
      '.comment-wrapper'
    ) as HTMLElement;
    const form = shadow.querySelector('.comment-form') as HTMLFormElement;
    const nameField = shadow.querySelector('#name') as HTMLInputElement;
    const commentField = shadow.querySelector('#comment') as HTMLInputElement;
    const list = shadow.querySelector('.comment-container') as HTMLElement;

    if (
      !showHideBtn ||
      !commentWrapper ||
      !form ||
      !nameField ||
      !commentField ||
      !list
    ) {
      console.error('Required elements not found in shadow DOM');
      return;
    }

    this.setupToggleButton(showHideBtn, commentWrapper);
    this.setupCommentForm(form, nameField, commentField, list);
  }

  private setupToggleButton(button: HTMLElement, wrapper: HTMLElement): void {
    wrapper.style.display = 'none';

    button.onclick = () => {
      const showHideText = button.textContent;
      if (showHideText === 'Show comments') {
        button.textContent = 'Hide comments';
        wrapper.style.display = 'block';
      } else {
        button.textContent = 'Show comments';
        wrapper.style.display = 'none';
      }
    };
  }

  private setupCommentForm(
    form: HTMLFormElement,
    nameField: HTMLInputElement,
    commentField: HTMLInputElement,
    list: HTMLElement
  ): void {
    form.onsubmit = (e: Event) => {
      e.preventDefault();

      const listItem = document.createElement('li');
      const namePara = document.createElement('p');
      const commentPara = document.createElement('p');
      const nameValue = nameField.value;
      const commentValue = commentField.value;

      namePara.textContent = nameValue;
      commentPara.textContent = commentValue;

      console.log(`New comment from ${nameValue}: ${commentValue}`);

      list.appendChild(listItem);
      listItem.appendChild(namePara);
      listItem.appendChild(commentPara);

      nameField.value = '';
      commentField.value = '';
    };
  }
}

// customElements - global object, that is provided by the browser (like window, or document)
// it is used to define custom elements
// first argument - tag name
// second argument - class that implements the custom element
customElements.define('comment-section', CommentSection);
