// @todo: Функция создания карточки
import { deleteUserCard, likeCard, unlikeCard } from "./api";
export function createCard(cardInfo, openCard, cardDelete, handleLike, handleImageClick, userId) {
  const listItem = document.querySelector('#card-template').content;
  const copyListItem = listItem.cloneNode(true);
  const deleteButton = copyListItem.querySelector('.card__delete-button');
  const cardImage = copyListItem.querySelector('.card__image');
  const cardTitle = copyListItem.querySelector('.card__title');
  const likeButton = copyListItem.querySelector('.card__like-button');
  const likeCounter = copyListItem.querySelector('.like-counter');

  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.name;
  cardTitle.textContent = cardInfo.name;
  likeCounter.textContent = cardInfo.likes.length;
  
   // Проверка, лайкнул ли текущий пользователь эту карточку
   if (cardInfo.likes.some(like => like._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  if (userId !== cardInfo.owner._id) {
    deleteButton.disabled = true;
    deleteButton.classList.add('visually-hidden');
  } else {
    deleteButton.addEventListener('click', () => cardDelete(cardInfo._id, copyListItem));
  }

  cardImage.addEventListener('click', function() {
    openCard(cardInfo.name, cardInfo.link);
  });

  // Обработка лайка через колбэк handleLike
  likeButton.addEventListener('click', () => handleLike(cardInfo._id, likeButton, likeCounter));
  cardImage.addEventListener("click", handleImageClick);

  return copyListItem;
};

// Функция удаления карточки
export function cardDelete (id, copyListItem) {
  deleteUserCard(id)
  .then(() => {
    copyListItem.remove();
  })
  .catch((err) => {
      console.log(err);
  })
};

// Функция добавления лайка
export function handleLike(cardId, likeButton, likeCounter) {
  const likeMethod = likeButton.classList.contains('card__like-button_is-active') ? unlikeCard : likeCard;

  likeMethod(cardId)
    .then((res) => {
      if (likeButton.classList.contains('card__like-button_is-active')) {
        likeButton.classList.remove('card__like-button_is-active');
      } else {
        likeButton.classList.add('card__like-button_is-active');
      }
      likeCounter.textContent = res.likes.length;
    })
    .catch(err => console.log(err));
};