const list = document.querySelector('.places__list');
const listItem = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
function createCard(item, cardDelete) {
  const copyListItem = listItem.cloneNode(true);
  const deleteButton = copyListItem.querySelector('.card__delete-button');
  const cardImage = copyListItem.querySelector('.card__image');
  const cardTitle = copyListItem.querySelector('.card__title');
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;
  deleteButton.addEventListener("click", (event) => cardDelete(event));
  return copyListItem;
} 
// @todo: Функция удаления карточки
function cardDelete (event) {
  const card = event.target.closest('.card');
  card.remove() ;
}
// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  list.append(createCard(item, cardDelete));
});