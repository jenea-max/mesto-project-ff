import '../pages/index.css';
import { initialCards } from '../components/cards.js';
import { createCard,  cardDelete,  handleLike, handleImageClick} from '../components/card.js';
import { openModal, closeModal } from '../components/modal.js';
const list = document.querySelector('.places__list');

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  list.append(createCard(item, cardDelete, handleLike, handleImageClick));
});

document.addEventListener('DOMContentLoaded', () => {

  // @todo: поиск DOM-элементов на странице для открытия и закрытия модальных окон
  const openEditPopupButton = document.querySelector('.profile__edit-button');
  const openAddPopupButton = document.querySelector('.profile__add-button');
  const openImagePopupButton = document.querySelector('.popup__image');
  const popupEdit = document.querySelector('.popup_type_edit');
  const popupNewCard = document.querySelector('.popup_type_new-card');
  const popupImage = document.querySelector('.popup_type_image');

   // @todo: поиск DOM-элементов на странице для редактирования профиля
  const editProfileButton = document.querySelector('.profile__edit-button');
  const editProfileModal = document.querySelector('.popup_type_edit');
  const nameInput = editProfileModal.querySelector('.popup__input_type_name');
  const descriptionInput = editProfileModal.querySelector('.popup__input_type_description');
  const profileNameElement = document.querySelector('.profile__title');
  const profileDescriptionElement = document.querySelector('.profile__description');
  const closeButtons = document.querySelectorAll('.popup__close');

  // @todo: поиск DOM-элементов на странице для добавления карточек в профиль
  const addCardModal = document.querySelector('.popup_type_new-card');
  const addCardForm = addCardModal.querySelector('.popup__form');

  // @todo: навешивание обработчиков события открытия мод. окна
  openEditPopupButton.addEventListener('click', () => openModal(popupEdit));
  openAddPopupButton.addEventListener('click', () => openModal(popupNewCard));
  openImagePopupButton.addEventListener('click', () => openModal(popupImage));

  // @todo: навешивание обработчиков события закрытия мод. окна
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const openedPopup = document.querySelector('.popup_is-opened');
      if (openedPopup) {
        closeModal(openedPopup);
      }
    });
  });

  // @todo: функция для редактирования профиля
  function openEditProfileModal() {
    nameInput.value = profileNameElement.textContent;
    descriptionInput.value = profileDescriptionElement.textContent;
    openModal(editProfileModal);
  };

  // @todo: функция для сохранения изменений профиля
  function saveProfileChanges(event) {
    event.preventDefault();
    profileNameElement.textContent = nameInput.value;
    profileDescriptionElement.textContent = descriptionInput.value;
    closeModal(editProfileModal);
  };
  
  // @todo: отработчик для сохранения изменений профиля
  editProfileButton.addEventListener('click', openEditProfileModal);
  const editProfileForm = editProfileModal.querySelector('.popup__form');
  editProfileForm.addEventListener('submit', saveProfileChanges);

  //@todo: функция для добавления новой карточки
  function addNewCard(event) {
    event.preventDefault();
    const name = addCardForm.querySelector('.popup__input_type_card-name').value;
    const link = addCardForm.querySelector('.popup__input_type_url').value;
    const newCardData = {
      name: name,
      link: link
    };
    const newCardElement = createCard(newCardData, cardDelete, handleLike, handleImageClick);
    list.prepend(newCardElement);
    closeModal(addCardModal);
    addCardForm.reset();
  };

  //@todo: добавляем обработчик события submit для формы добавления новой карточки
  addCardForm.addEventListener('submit', addNewCard);

  //@todo: отработчик, открывающий попап при клике по изображению карточки
  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('card__image')) {
      handleImageClick(event);
    };
  });
});