const closeModalOnEsc = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    };
  };
};

const closeModalOnOverlay = (evt, modal) => {
  const openedModal = document.querySelector(".popup_is-opened");
  const isNotModal = !evt.target.closest('.popup')
  if (openedModal && isNotModal) {
    closeModal(modal);
  };
};

export const openModal = (modal) => {
  modal.classList.add("popup_is-opened");
  const closeButton = modal.querySelector(".popup__close");
  closeButton.addEventListener("click", () => closeModal(modal));
  document.addEventListener("keyup", closeModalOnEsc);
  modal.classList.remove('popup_is-animated');
  document.addEventListener('mousedown', (evt) => closeModalOnOverlay(evt, modal))
};

export const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keyup", closeModalOnEsc);
  modal.classList.add('popup_is-animated');
  document.removeEventListener('mousedown', () => closeModalOnOverlay(modal))
};
