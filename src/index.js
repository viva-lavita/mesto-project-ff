import "./pages/index.css";
import initialCards from "./components/initial_cards.js";
import { openModal, closeModal } from "./components/modal.js";
import {
  addCard,
  deleteCard,
  likeCard,
  createCardElement,
} from "./components/card.js";
import { enableValidation, clearValidation } from "./components/validation.js";

const addCardButton = document.querySelector(".profile__add-button");
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardForm = document.forms["new-place"];
const profileForm = document.forms["edit-profile"];
const addCardModal = document.querySelector(".popup_type_new-card");
const editProfileModal = document.querySelector(".popup_type_edit");
const imageModal = document.querySelector(".popup_type_image");
const closeImageModalButton = imageModal.querySelector(".popup__close");
const closeProfileModalButton = editProfileModal.querySelector(".popup__close");
const closeCardModalButton = addCardModal.querySelector(".popup__close");

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const handleAddCardFormSubmit = (evt) => {
  evt.preventDefault();
  const addCardForm = document.forms["new-place"];
  const placeName = addCardForm.elements["place-name"].value;
  const link = addCardForm.elements.link.value;
  const newCard = createCardElement(
    {
      name: placeName,
      link: link,
    },
    likeCard,
    deleteCard,
    clickCardImage
  );
  addCard(newCard);
  addCardForm.reset();
  clearValidation(addCardForm, validationConfig);
  closeModal(addCardModal);
};

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  const profileForm = document.forms["edit-profile"];
  const newName = profileForm.name.value;
  const newDescription = profileForm.description.value;
  document.querySelector(".profile__title").textContent = newName;
  document.querySelector(".profile__description").textContent = newDescription;
  clearValidation(profileForm, validationConfig);
  closeModal(editProfileModal);
};

const openProfileModal = (modal) => {
  clearValidation(profileForm, validationConfig);
  const currentName = document.querySelector(".profile__title").textContent;
  const currentDescription = document.querySelector(
    ".profile__description"
  ).textContent;
  profileForm.name.value = currentName;
  profileForm.description.value = currentDescription;
  openModal(modal);
};

const clickCardImage = (evt) => {
  const image = imageModal.querySelector(".popup__image");
  const imageDescription = imageModal.querySelector(".popup__caption");
  image.src = evt.target.src;
  image.alt = evt.target.alt;
  imageDescription.textContent = evt.target
    .closest(".card")
    .querySelector(".card__title").textContent;
  openModal(imageModal);
};

const renderCards = (cards) => {
  cards.forEach((card) => {
    const newCardElement = createCardElement(
      card,
      likeCard,
      deleteCard,
      clickCardImage
    );
    addCard(newCardElement);
  });
};

addCardButton.addEventListener("click", () => {
  addCardForm.reset();
  clearValidation(addCardForm, validationConfig);
  openModal(addCardModal);
});
editProfileButton.addEventListener("click", () =>
  openProfileModal(editProfileModal)
);
renderCards(initialCards);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);
profileForm.addEventListener("submit", handleProfileFormSubmit);
closeImageModalButton.addEventListener("click", () => closeModal(imageModal));
closeCardModalButton.addEventListener("click", () => closeModal(addCardModal));
closeProfileModalButton.addEventListener("click", () =>
  closeModal(editProfileModal)
);

enableValidation(validationConfig);
