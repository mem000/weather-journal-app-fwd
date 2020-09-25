const fragment = document.createDocumentFragment();
const cirs = document.querySelector('.circles');
for (let i = 1; i <= 20; i++) {
    const newElement = document.createElement('li');
    fragment.appendChild(newElement);
}
cirs.appendChild(fragment);