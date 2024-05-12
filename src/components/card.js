import { openModal } from '../components/modal.js';

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
  deleteButton.addEventListener("click", (event) => cardDelete(event));
  likeButton.addEventListener("click", (event) => handleLike(event));
  cardImage.addEventListener("click", (event) => handleImageClick(event));
  return copyListItem;
} 
// @todo: Функция удаления карточки
export function cardDelete (event) {
  const card = event.target.closest('.card');
  card.remove() ;
}

// @todo: Функция лайка карточки
export function handleLike(event) {
  const likeButton = event.target;
  likeButton.classList.toggle('card__like-button_is-active');
}
// @todo: Функция увеличения фотографии карточки
export function handleImageClick(event) {
  const imageSrc = event.target.getAttribute('src');
  const imageAlt = event.target.getAttribute('alt');
  const popupImage = document.querySelector('.popup_type_image');
  const popupImageContent = popupImage.querySelector('.popup__content');
  const popupImageElement = popupImageContent.querySelector('.popup__image');
  const popupCaptionElement = popupImageContent.querySelector('.popup__caption');
  popupImageElement.src = imageSrc;
  popupImageElement.alt = imageAlt;
  popupCaptionElement.textContent = imageAlt;
  openModal(popupImage);
}