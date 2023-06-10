import { fetchBreeds, fetchCatByBreed, getCatImg } from './cat-api';
import SlimSelect from 'slim-select';

// fetchBreeds().then(result => getId(result)).then(res => console.log(res));
// fetchBreeds().then(result => console.log(result));

/*
1. отримати рефс

2. вішаємо слухач на форму change
отримати масив порід та записати в селект select.breed-select
поки йде запит порід, скрити select.breed-select і показати p.loader
зарендерити айді породи в значення 
3. отримати запит з інпуту та передати з нього у вигляді квері запит з айді котів на сервер
поки йде запит масиву котів, скрити  div.cat-info и показать p.loader
4. перевірити відподідь серверу, якщо негативна - повідомити користувача
5. отримаємо результат та перебираємо масив котів і створюємо розмітку в div.cat-info
6. рендеримо розмітку на веб іннером наприклад або?
7. обробити помилку в p.error і при списку порід і при пошуку котів по породі
8. прикрасити інтерфейс 
*/

const refs = {
  selectEl: document.querySelector('.breed-select'),
  divEl: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

hide(refs.selectEl);
hide(refs.error);

fetchBreeds()
  .then(arrays => {
    return arrays.reduce(
      (markup, array) => markup + createMarkupSelect(array),
      ' '
    );
  })
  .then(updateMarkupSelect)
  .then(() => {
    show(refs.selectEl);
    hide(refs.loader);
  })

  .catch(onError);
// (err) => onError(err)

refs.selectEl.addEventListener('change', onChange);

function onChange(e) {
  e.preventDefault();
  clearMarkupDiv();
  const id = e.target.value;
  show(refs.loader);
  hide(refs.divEl);
  getCatImg(id).then(createMarkupDiv).then(updateMarkupDiv).catch(onError);
  fetchCatByBreed(id)
    .then(arr => createMarkupText(arr))
    .then(updateMarkupDiv)
    .then(() => {
      hide(refs.loader);
      show(refs.divEl);
    })
    .catch(onError);
}

function createMarkupDiv(url) {
  return `<img src="${url}" width="520px"/>`;
}

function createMarkupText({ name, description, temperament }) {
  return `<h2>${name}</h2><p>${description}</p><p><strong>Temperament: </strong>${temperament}</p>`;
}

function updateMarkupDiv(markup) {
  refs.divEl.insertAdjacentHTML('beforeend', markup);
}

function clearMarkupDiv() {
  refs.divEl.innerHTML = '';
}

function createMarkupSelect({ id, name }) {
  return `<option value="${id}">${name}</option>`;
}

function updateMarkupSelect(markup) {
  refs.selectEl.innerHTML = markup;
  new SlimSelect({
    select: '.breed-select',
  });
}

function hide(el) {
  el.classList.add('hide');
}
function show(el) {
  el.classList.remove('hide');
}

function onError(err) {
  console.error(err);
  hide(refs.loader);
  show(refs.error);
}
fetchBreeds().then(console.log);
