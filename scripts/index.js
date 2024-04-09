// @todo: DOM узлы
const list = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(name, link, cardDelete) {
  const listItem = document.querySelector('#card-template').content;
  const copyListItem = listItem.cloneNode(true);
  const deleteButton = copyListItem.querySelector('.card__delete-button');
  copyListItem.querySelector(".card__image").src = link;
  copyListItem.querySelector(".card__image").alt = name;
  copyListItem.querySelector(".card__title").textContent = name;
  deleteButton.addEventListener("click", (event) => cardDelete(event));
  
  return copyListItem;
} 
// @todo: Функция удаления карточки
function cardDelete () {
  const card = event.target.closest('.card');
  card.remove() ;
}
// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  list.append(createCard(item.name, item.link, cardDelete));
});