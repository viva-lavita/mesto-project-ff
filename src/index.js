import "./pages/index.css";
import {
  addNewCard,
  getUserInfo,
  getInitialCards,
  setNewAvatar,
  setUserInfo,
  deleteCardFromServer,
} from "./components/api.js";
import { openModal, closeModal } from "./components/modal.js";
import { likeCard, createCardElement } from "./components/card.js";
import { enableValidation, clearValidation } from "./components/validation.js";

const avatar = document.querySelector(".profile__image");
const currentUserName = document.querySelector(".profile__title");
const currentUserDescription = document.querySelector(".profile__description");
const addCardModal = document.querySelector(".popup_type_new-card");
const editProfileModal = document.querySelector(".popup_type_edit");
const imageModal = document.querySelector(".popup_type_image");
const editProfileAvatarModal = document.querySelector(
  ".popup_type_edit-profile-avatar"
);
const confirmDeleteModal = document.querySelector(".popup_type_confirm-delete");
const addCardButton = document.querySelector(".profile__add-button");
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardForm = document.forms["new-place"];
const profileForm = document.forms["edit-profile"];
const profileAvatarForm = document.forms["edit-profile-avatar"];
const confirmDeleteCardForm = document.forms["confirm-delete"];
const closeImageModalButton = imageModal.querySelector(".popup__close");
const closeProfileModalButton = editProfileModal.querySelector(".popup__close");
const closeCardModalButton = addCardModal.querySelector(".popup__close");
const closeProfileAvatarModalButton =
  editProfileAvatarModal.querySelector(".popup__close");
const closeConfirmDeleteModalButton =
  confirmDeleteModal.querySelector(".popup__close");
const addCardModalButton = addCardModal.querySelector(".popup__button");
const editProfileModalButton = editProfileModal.querySelector(".popup__button");
const editProfileAvatarModalButton =
  editProfileAvatarModal.querySelector(".popup__button");
const baseSaveButtonText = "Сохранить";
const LoadingButtonText = "Сохранение...";
const placesList = document.querySelector(".places__list");
let сurrentUserId;
let deletedCardId;
let deletedCardElement;

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
  });

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  inputErrorActiveClass: "popup__input-error_active",
  errorClass: "popup__error_visible",
};

const renderLoadingButton = (
  button,
  isLoading,
  baseText = baseSaveButtonText,
  loadingText = LoadingButtonText
) => {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = baseText;
  }
};

const addCard = (cardElement) => {
  placesList.prepend(cardElement);
};

const handleAddCardFormSubmit = (evt) => {
  evt.preventDefault();
  const placeName = addCardForm.elements["place-name"].value;
  const link = addCardForm.elements.link.value;
  renderLoadingButton(addCardModalButton, true);
  addNewCard(placeName, link)
    .then((card) => {
      const newCard = createCardElement(
        card,
        likeCard,
        openDeleteCardModal,
        clickCardImage,
        сurrentUserId
      );
      addCard(newCard);
    })
    .then(() => {
      addCardForm.reset();
      closeModal(addCardModal);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoadingButton(addCardModalButton, false);
    });
};

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  const profileForm = document.forms["edit-profile"];
  const newName = profileForm.name.value;
  const newDescription = profileForm.description.value;
  renderLoadingButton(editProfileModalButton, true);
  setUserInfo(newName, newDescription)
    .then((user) => {
      currentUserName.textContent = user.name;
      currentUserDescription.textContent = user.about;
    })
    .then(() => {
      profileForm.reset();
      closeModal(editProfileModal);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoadingButton(editProfileModalButton, false);
    });
};

const handleProfileAvatarFormSubmit = (evt) => {
  evt.preventDefault();
  const newAvatar = profileAvatarForm.link.value;
  renderLoadingButton(editProfileAvatarModalButton, true);
  setNewAvatar(newAvatar)
    .then((data) => {
      avatar.style.backgroundImage = `url(${data.avatar})`;
    })
    .then(() => {
      profileAvatarForm.reset();
      closeModal(editProfileAvatarModal);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoadingButton(editProfileAvatarModalButton, false);
    });
};

const openProfileModal = (modal) => {
  clearValidation(profileForm, validationConfig);
  profileForm.name.value = currentUserName.textContent;
  profileForm.description.value = currentUserDescription.textContent;
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

const openDeleteCardModal = (cardElement) => {
  openModal(confirmDeleteModal);
  deletedCardId = cardElement.id;
  deletedCardElement = cardElement;
};

const deleteCardModalSubmit = (evt) => {
  evt.preventDefault();
  deleteCardFromServer(deletedCardId)
    .then(() => {
      deletedCardElement.remove();
      closeModal(confirmDeleteModal);
      deletedCardId = null;
      deletedCardElement = null;
    })
    .catch((err) => console.log(err));
};

const renderCards = (cards, userId) => {
  cards.reverse().forEach((card) => {
    const newCardElement = createCardElement(
      card,
      likeCard,
      openDeleteCardModal,
      clickCardImage,
      userId
    );
    addCard(newCardElement);
  });
};

addCardButton.addEventListener("click", () => {
  clearValidation(addCardForm, validationConfig);
  openModal(addCardModal);
});
editProfileButton.addEventListener("click", () =>
  openProfileModal(editProfileModal)
);
avatar.addEventListener("click", () => {
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
closeConfirmDeleteModalButton.addEventListener("click", () =>
  closeModal(confirmDeleteModal)
);
confirmDeleteCardForm.addEventListener("submit", deleteCardModalSubmit);

enableValidation(validationConfig);
