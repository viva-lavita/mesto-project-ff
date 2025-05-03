import "./pages/index.css";
import initialCards from "./components/initial_cards.js";
import { openModal, closeModal } from "./components/modal.js";
import {
  addCard,
  deleteCard,
  likeCard,
  createCardElement,
} from "./components/card.js";

const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
const addCardForm = document.forms["new-place"];
const addCardModal = document.querySelector(".popup_type_new-card");
const editProfileModal = document.querySelector(".popup_type_edit");
const imageModal = document.querySelector(".popup_type_image");
const placesList = document.querySelector(".places__list");

const handleAddCardFormSubmit = (evt) => {
  evt.preventDefault();
  const addCardForm = document.forms["new-place"];
  const placeName = addCardForm.elements["place-name"].value;
  const link = addCardForm.elements.link.value;
  const newCard = createCardElement({
    name: placeName,
    link: link,
  });
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
  const profileForm = document.forms["edit-profile"];
  const currentName = document.querySelector(".profile__title").textContent;
  const currentDescription = document.querySelector(
    ".profile__description"
  ).textContent;
  profileForm.name.value = currentName;
  profileForm.description.value = currentDescription;
  profileForm.addEventListener("submit", handleFormSubmit);
};

const clickCardImage = (element, cardElement) => {
  const image = imageModal.querySelector(".popup__image");
  const imageDescription = imageModal.querySelector(".popup__caption");
  image.src = element.src;
  image.alt = element.alt;
  imageDescription.textContent =
    cardElement.querySelector(".card__title").textContent;
  openModal(imageModal);
};

const clickCard = (evt, handleLike, handleDelete, handleClickImage) => {
  const targetElement = evt.target;
  const classes = targetElement.classList;
  const cardElement = targetElement.closest(".card");
  if (classes.contains("card__like-button")) {
    handleLike(targetElement);
  } else if (classes.contains("card__delete-button")) {
    handleDelete(cardElement);
  } else if (classes.contains("card__image")) {
    handleClickImage(targetElement, cardElement);
  }
};

const renderCards = (cards) => {
  cards.forEach((card) => {
    const newCardElement = createCardElement(card);
    addCard(newCardElement);
  });
};

addButton.addEventListener("click", () => openModal(addCardModal));
editButton.addEventListener("click", () => openProfileForm(editProfileModal));
renderCards(initialCards);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);
placesList.addEventListener("click", (evt) =>
  clickCard(evt, likeCard, deleteCard, clickCardImage)
);
