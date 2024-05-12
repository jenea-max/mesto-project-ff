// @todo: Функция открытия модального окна
export function openModal(popupElement) {
  popupElement.classList.add('popup_is-opened');
  const closeButton = popupElement.querySelector('.popup__close');
  closeButton.addEventListener('click', () => closeModal(popupElement));
  document.addEventListener('keydown', closeModalByEsc);
  popupElement.addEventListener('mousedown', closeModalByOverlay);
}

// @todo: Функция закрытия модального окна
export function closeModal(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  const closeButton = popupElement.querySelector('.popup__close');
  closeButton.removeEventListener('click', () => closeModal(popupElement));
  document.removeEventListener('keydown', closeModalByEsc);
  popupElement.removeEventListener('mousedown', closeModalByOverlay);
}
// @todo: Функция закрытия модального окна по ESC
function closeModalByEsc(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

// @todo: Функция закрытия модального окна по Оверлею
function closeModalByOverlay(event) {
  if (event.target.classList.contains('popup_is-opened')) {
    closeModal(event.target);
  }
}
