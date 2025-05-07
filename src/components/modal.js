const closeModalOnEsc = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    };
  };
};

const closeModalOnOverlay = (evt) => {
  if (evt.target.classList.contains('popup')) {
    closeModal(evt.target)
  };
};

export const openModal = (modal) => {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keyup", closeModalOnEsc);
  modal.classList.remove('popup_is-animated');
  document.addEventListener('mousedown', closeModalOnOverlay)
};

export const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keyup", closeModalOnEsc);
  modal.classList.add('popup_is-animated');
  document.removeEventListener('mousedown', closeModalOnOverlay)
};
