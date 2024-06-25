import '../pages/index.css';
import { createCard,  cardDelete,  handleLike} from '../components/card.js';
import { openModal, closeModal } from '../components/modal.js';
import { enableValidation, clearValidation} from '../components/validation.js';
import { getUserInfo, getInitialCards, editedUserInfo, addNewCard, updateAvatar} from './api.js';
import initialCards from './cards.js';

// ОБЩИЙ РАЗДЕЛ
const buttonCloseList = document.querySelectorAll('.popup__close'); 
buttonCloseList.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closeModal(popup)); 
  popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup')) {
            closeModal(popup);
        }
    });
})

function renderLoading(isLoading) {
  const openedPopup = document.querySelector('.popup_is-opened');
  if (openedPopup) {
      const saveButton = openedPopup.querySelector('.popup__button');
      saveButton.textContent = isLoading?  'Сохранение...' : 'Сохранить';
  }
}

// РАЗДЕЛ ПРОФИЛЯ
const userProfile =  document.querySelector('.profile');
const userName = userProfile.querySelector('.profile__title');
const userDescription = userProfile.querySelector('.profile__description');
const userImage = userProfile.querySelector('.profile__image');

const profilePopup = document.querySelector('.popup_type_edit');
const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const descriptionInput = profileFormElement.querySelector('.popup__input_type_description');
profilePopup.classList.add('popup_is-animated'); 

const editProfileButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.forms['edit-profile'];

//навешивание обработчиков события открытия мод. окна
editProfileButton.addEventListener('click', () => {
  nameInput.value = userName.textContent;
  descriptionInput.value = userDescription.textContent;
  clearValidation(popupEditProfile,validationConfig); // Очистка ошибок валидации перед открытием
  openModal(profilePopup);
});

// @todo: функция сохранения изменений профиля
function saveProfileChanges(event) {
  event.preventDefault();
  renderLoading (true);
  editedUserInfo ({
    name: nameInput.value,
    about: descriptionInput.value
  })

  .then((userInfo) => {
    userName.textContent = userInfo.name;
    userDescription.textContent = userInfo.about;
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(false);
    closeModal(profilePopup);
  });
};
profileFormElement.addEventListener('submit', saveProfileChanges);

//РАЗДЕЛ НАЧАЛЬНЫХ КАРТОЧЕК
const cardList = document.querySelector('.places__list');
const popupImage = document.querySelector('.popup_type_image');
const popupTitle = popupImage.querySelector ('.popup__caption');

function openCard(name, link) {
  popupImage.src = link;
  popupTitle.textContent = name;
  popupImage.alt = name;
  openModal(popupImage)
};

Promise.all([getUserInfo(),getInitialCards()])
.then(([userInfo, cardAdded]) => {
  const userId = userInfo._id;
  userName.textContent = userInfo.name;
  userDescription.textContent = userInfo.about;
  userImage.style = `background-image: url('${userInfo.avatar}')`;
  cardAdded.forEach(function (cardAdded) { 
    cardList.append(createCard(cardAdded, openCard, cardDelete, handleLike, handleImageClick, userInfo._id)); 
}); 
})
 .catch((err) => {
  console.log(err);
});   

//функция увеличения фотографии карточки
function handleImageClick(event) {
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
};

//РАЗДЕЛ ДОБАВЛЕНИЯ КАРТОЧЕК
const placePopup = document.querySelector('.popup_type_new-card');
const placeElement = placePopup.querySelector('.popup__form');
const placeName = placeElement.querySelector('.popup__input_type_card-name');
const placeImage = placeElement.querySelector('.popup__input_type_url');
const editPlaceButton = document.querySelector('.profile__add-button');
placePopup.classList.add('popup_is-animated'); 
const popupAddPlace = document.forms['new-place'];

editPlaceButton.addEventListener('click', () => {
  openModal(placePopup);
  clearValidation(popupAddPlace, validationConfig)
});

//функция для обновления карточек
function savePlaceFormChanges (evt){
  evt.preventDefault();
  renderLoading(true);
  addNewCard({
    name: placeName.value,
    link: placeImage.value
  })
  .then((cardInfo) => {
  cardList.prepend(createCard(cardInfo, openCard, cardDelete, handleLike, handleImageClick, cardInfo.owner._id));
  placeElement.reset();})
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
  renderLoading(false);
  closeModal(placePopup);
  })
}

placeElement.addEventListener('submit', savePlaceFormChanges);

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
  
enableValidation(validationConfig); 

//РАЗДЕЛ С ИЗМЕНЕНИЕМ АВТАВАРА
const popupAvatar = document.querySelector('.popup__input_type_avatar_edit');
const editAvatarButton = document.querySelector('.avatar-button');
const popupEditAvatar = document.forms['edit-avatar'];
const avatarInput = popupEditAvatar['avatar']

editAvatarButton.addEventListener('click', function() {
  openModal(popupAvatar);
  avatarInput.value = '';
  clearValidation(popupEditAvatar, validationConfig);
});
  
popupEditAvatar.addEventListener('submit', function(evt) {
  evt.preventDefault();
  renderLoading(true);
  updateAvatar(avatarInput.value)
    .then((userInfo) => {
  userImage.style = `background-image: url('${userInfo.avatar}')`;
  })
  .finally(() => {
    renderLoading(false);
    closeModal(popupAvatar);
  });
});