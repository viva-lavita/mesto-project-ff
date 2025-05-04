import "./pages/index.css";
import initialCards from "./components/initial_cards.js";
import { openModal, closeModal } from "./components/modal.js";
import {
  addCard,
  deleteCard,
  likeCard,
  createCardElement,
} from "./components/card.js";

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
const placesList = document.querySelector(".places__list");

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
  closeModal(addCardModal);
};

const handleFormSubmit = (evt) => {
  evt.preventDefault();
  const profileForm = document.forms["edit-profile"];
  const newName = profileForm.name.value;
  const newDescription = profileForm.description.value;
  document.querySelector(".profile__title").textContent = newName;
  document.querySelector(".profile__description").textContent = newDescription;
  closeModal(editProfileModal);
};

const openProfileForm = (modal) => {
  openModal(modal);
  const currentName = document.querySelector(".profile__title").textContent;
  const currentDescription = document.querySelector(
    ".profile__description"
  ).textContent;
  profileForm.name.value = currentName;
  profileForm.description.value = currentDescription;
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

addCardButton.addEventListener("click", () => openModal(addCardModal));
editProfileButton.addEventListener("click", () =>
  openProfileForm(editProfileModal)
);
renderCards(initialCards);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);
profileForm.addEventListener("submit", handleFormSubmit);
closeImageModalButton.addEventListener("click", () => closeModal(imageModal));
closeCardModalButton.addEventListener("click", () => closeModal(addCardModal));
closeProfileModalButton.addEventListener("click", () =>
  closeModal(editProfileModal)
);
