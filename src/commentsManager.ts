export { commentsSectionToggleManager, commentFormManager };

const commentsSectionToggleManager = () => {
  const showHideBtn: HTMLElement | null = document.querySelector('.show-hide');
  const commentWrapper: HTMLElement | null =
    document.querySelector('.comment-wrapper');

  if (!showHideBtn || !commentWrapper) {
    console.error('Required elements not found for comments toggle');
    return;
  }

  commentWrapper.style.display = 'none';

  showHideBtn.onclick = () => {
    const showHideText = showHideBtn.textContent;
    if (showHideText === 'Show comments') {
      showHideBtn.textContent = 'Hide comments';
      commentWrapper.style.display = 'block';
    } else {
      showHideBtn.textContent = 'Show comments';
      commentWrapper.style.display = 'none';
    }
  };
};

const commentFormManager = () => {
  const form: HTMLElement | null = document.querySelector('.comment-form');
  const nameField: HTMLInputElement | null = document.querySelector('#name');
  const commentField: HTMLInputElement | null =
    document.querySelector('#comment');
  const list: HTMLElement | null = document.querySelector('.comment-container');

  if (!form || !nameField || !commentField || !list) {
    console.error('Required elements not found for comment form!');
    return;
  }

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
};
