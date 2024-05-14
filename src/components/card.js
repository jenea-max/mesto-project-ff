// @todo: Функция создания карточки
export function createCard(item, cardDelete, handleLike, handleImageClick) {
  const listItem = document.querySelector('#card-template').content;
  const copyListItem = listItem.cloneNode(true);
  const deleteButton = copyListItem.querySelector('.card__delete-button');
  const cardImage = copyListItem.querySelector('.card__image');
  const cardTitle = copyListItem.querySelector('.card__title');
  const likeButton = copyListItem.querySelector('.card__like-button');
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;
  deleteButton.addEventListener("click", cardDelete);
  likeButton.addEventListener("click", handleLike);
  cardImage.addEventListener("click", handleImageClick);
  return copyListItem;
};

// @todo: Функция удаления карточки
export function cardDelete (event) {
  const card = event.target.closest('.card');
  card.remove() ;
};

// @todo: Функция лайка карточки
export function handleLike(event) {
  const likeButton = event.target;
  likeButton.classList.toggle('card__like-button_is-active');
};
