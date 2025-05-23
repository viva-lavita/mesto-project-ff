import "./pages/index.css";
import { addNewCard, config, getUserInfo, getInitialCards, setNewAvatar, setUserInfo } from "./components/api.js";
import { openModal, closeModal } from "./components/modal.js";
import {
  addCard,
  deleteCard,
  likeCard,
  createCardElement,
} from "./components/card.js";
import { enableValidation, clearValidation } from "./components/validation.js";

const avatar = document.querySelector(".profile__image");
const currentUserName = document.querySelector(".profile__title");
const currentUserDescription = document.querySelector(".profile__description");
const addCardModal = document.querySelector(".popup_type_new-card");
const editProfileModal = document.querySelector(".popup_type_edit");
const imageModal = document.querySelector(".popup_type_image");
const editProfileAvatarModal = document.querySelector(".popup_type_edit-profile-avatar");
const addCardButton = document.querySelector(".profile__add-button");
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardForm = document.forms["new-place"];
const profileForm = document.forms["edit-profile"];
const profileAvatarForm = document.forms["edit-profile-avatar"];
const closeImageModalButton = imageModal.querySelector(".popup__close");
const closeProfileModalButton = editProfileModal.querySelector(".popup__close");
const closeCardModalButton = addCardModal.querySelector(".popup__close");
const closeProfileAvatarModalButton = editProfileAvatarModal.querySelector(".popup__close");
let сurrentUserId;

Promise.all([getUserInfo(), getInitialCards()])
  .then(([user, cards]) => {
    currentUserName.textContent = user.name;
    currentUserDescription.textContent = user.about;
    avatar.style.backgroundImage = `url(${user.avatar})`;
    сurrentUserId = user._id;
    renderCards(cards, сurrentUserId);
  })
  .catch((err) => {
    console.log(err);
  })

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
  addNewCard(placeName, link)
  .then((card) => {
    const newCard = createCardElement(
      card,
      likeCard,
      deleteCard,
      clickCardImage,
      сurrentUserId
    );
    addCard(newCard);
  })
  
  addCardForm.reset();
  clearValidation(addCardForm, validationConfig);
  closeModal(addCardModal);
};

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  const profileForm = document.forms["edit-profile"];
  const newName = profileForm.name.value;
  const newDescription = profileForm.description.value;
  setUserInfo(newName, newDescription).then((user) => {
    currentUserName.textContent = user.name;
    currentUserDescription.textContent = user.about;
  }).catch((err) => console.log(err));
  profileForm.reset();
  clearValidation(profileForm, validationConfig);
  closeModal(editProfileModal);
};

const handleProfileAvatarFormSubmit = (evt) => {
  evt.preventDefault();
  const newAvatar = profileAvatarForm.link.value;
  setNewAvatar(newAvatar).then((data) => {
    console.log(data);
    avatar.style.backgroundImage = `url(${data.avatar})`;
  }).catch((err) => console.log(err));
  profileAvatarForm.reset();
  clearValidation(profileAvatarForm, validationConfig);
  closeModal(editProfileAvatarModal);
};

const openProfileModal = (modal) => {
  clearValidation(profileForm, validationConfig);
  profileForm.name.value = currentUserName.textContent;
  profileForm.description.value = currentUserDescription.textContent;;
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

const renderCards = (cards, userId) => {
  cards.forEach((card) => {
    const newCardElement = createCardElement(
      card,
      likeCard,
      deleteCard,
      clickCardImage,
      userId
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
avatar.addEventListener("click", () => {
  profileAvatarForm.reset();
  clearValidation(profileAvatarForm, validationConfig);
  openModal(editProfileAvatarModal);
});
addCardForm.addEventListener("submit", handleAddCardFormSubmit);
profileForm.addEventListener("submit", handleProfileFormSubmit);
profileAvatarForm.addEventListener("submit", handleProfileAvatarFormSubmit);
closeImageModalButton.addEventListener("click", () => closeModal(imageModal));
closeCardModalButton.addEventListener("click", () => closeModal(addCardModal));
closeProfileModalButton.addEventListener("click", () =>
  closeModal(editProfileModal)
);
closeProfileAvatarModalButton.addEventListener("click", () =>
  closeModal(editProfileAvatarModal)
);

enableValidation(validationConfig);
