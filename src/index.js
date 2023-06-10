import { fetchBreeds } from "./cat-api";
import { fetchCatByBreed } from "./cat-api";
import { getCatImg } from "./cat-api";

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
    selectEl: document.querySelector(".breed-select"),
    divEl: document.querySelector(".cat-info"),
}

fetchBreeds().then(
    (arrays) => {
        return arrays.reduce((markup, array) => markup + createMarkupSelect(array), " ");
    }
).then(updateMarkupSelect);

refs.selectEl.addEventListener('change', onChange);

function onChange(e) {
    e.preventDefault();
    const id = e.target.value;
    getCatImg(`${id}`).then(createMarkupDiv).then(updateMarkupDiv);
    fetchCatByBreed(`${id}`).then(arr => createMarkupText(arr)).then(updateMarkupDiv);
}

fetchCatByBreed('abob').then(console.log);
getCatImg('abob').then(console.log);


function createMarkupDiv(url) {
    return `<img src="${url}" width="520px"/>`;    
};

function createMarkupText({ name, description, temperament }) {
    return `<h2>${name}</h2><p>${description}</p><p><strong>Temperament: </strong>${temperament}</p>`;
};

function updateMarkupDiv(markup) {
    refs.divEl.insertAdjacentHTML("beforeend", markup);
}

function createMarkupSelect({id, name}) {
        return `<option value="${id}">${name}</option>`;
};

function updateMarkupSelect(markup) {
    refs.selectEl.innerHTML = markup;
};

fetchBreeds().then(console.log);