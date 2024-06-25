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

  if (userId !== cardInfo.owner._id) {
    deleteButton.disabled = true;
    deleteButton.classList.add('visually-hidden');
  } else{
    deleteButton.addEventListener('click', () => cardDelete(cardInfo._id, copyListItem));
  }
    cardImage.addEventListener('click', function() {
    openCard(cardInfo.name, cardInfo.link);
  });

  likeButton.addEventListener('click', () => {
    const likeMethod = likeButton.classList.contains('card__like-button_is-active') ? unlikeCard : likeCard;
    likeMethod(cardInfo._id) 
            .then((res) => {
              handleLike(likeButton); 
               likeCounter.textContent = res.likes.length;
            })
    .catch(err => console.log(err)); 
  });
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
export function handleLike(likeButton) { 
  likeButton.classList.toggle('card__like-button_is-active'); 
}; 
