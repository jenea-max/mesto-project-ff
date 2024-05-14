// @todo: Функция открытия модального окна
export function openModal(popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeModalByEsc); 
  popupElement.addEventListener('mousedown', closeModalByOverlay); 
};

// @todo: Функция закрытия модального окна
export function closeModal(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalByEsc);
  popupElement.removeEventListener('mousedown', closeModalByOverlay);
};

// @todo: Функция закрытия модального окна по ESC
export function closeModalByEsc(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    };
  };
};

// @todo: Функция закрытия модального окна по Оверлею
export function closeModalByOverlay(event) {
  if (event.target.classList.contains('popup_is-opened')) {
    closeModal(event.target);
  };
};
