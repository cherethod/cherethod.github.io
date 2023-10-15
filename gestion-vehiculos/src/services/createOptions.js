export async function createOptions (value) {
    const fragment = document.createDocumentFragment();
    value.forEach(option => {
        let optionElem = document.createElement('OPTION');
        optionElem.value = option;
        optionElem.textContent = option;
        fragment.appendChild(optionElem);
      })
    return fragment;
}