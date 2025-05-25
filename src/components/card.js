import {
  deleteCardFromServer,
  likeCardFromServer,
  unlikeCardFromServer,
} from "./api.js";
import { closeModal, openModal } from "./modal.js";

export const likeCard = (evt) => {
  const cardId = evt.target.closest(".card").id;
  const likeCounter = evt.target
    .closest(".card")
    .querySelector(".card__like_counter");
  if (evt.target.classList.contains("card__like-button_is-active")) {
    unlikeCardFromServer(cardId)
      .then((card) => {
        likeCounter.textContent = card.likes.length;
        evt.target.classList.remove("card__like-button_is-active");
      })
      .catch((err) => console.log(err));
  } else {
    likeCardFromServer(cardId)
      .then((card) => {
        likeCounter.textContent = card.likes.length;
        evt.target.classList.add("card__like-button_is-active");
      })
      .catch((err) => console.log(err));
  }
};

export const deleteCard = (evt) => {
  const card = evt.target.closest(".card");
  const deleteCardModal = document.querySelector(".popup_type_confirm-delete");
  const deleteCardButton = deleteCardModal.querySelector(".popup__button");
  openModal(deleteCardModal);

  deleteCardButton.addEventListener("click", () => {
    deleteCardFromServer(card.id)
      .then(() => {
        card.remove();
        closeModal(deleteCardModal);
      })
      .catch((err) => console.log(err));
  });
};

export const addCard = (cardElement) => {
  const placesList = document.querySelector(".places__list");
  placesList.prepend(cardElement);
};

export const createCardElement = (
  cardContent,
  handleLike,
  handleDelete,
  handleClickImage,
  userId
) => {
  const newCardElement = document
    .querySelector("#card-template")
    .content.querySelector(".card")
    .cloneNode(true);
  const cardImage = newCardElement.querySelector(".card__image");
  const cardTitle = newCardElement.querySelector(".card__title");
  const cardDeleteButton = newCardElement.querySelector(".card__delete-button");
  const cardLikeButton = newCardElement.querySelector(".card__like-button");
  const cardLikeCounter = newCardElement.querySelector(".card__like_counter");

  cardImage.src = cardContent.link;
  cardImage.alt = cardContent.name;
  cardTitle.textContent = cardContent.name;
  newCardElement.setAttribute("id", cardContent._id);
  newCardElement.dataset.ownerId = cardContent.owner._id;
  cardLikeCounter.textContent = cardContent.likes.length;

  cardImage.addEventListener("click", handleClickImage);
  cardLikeButton.addEventListener("click", handleLike);

  if (cardContent.likes.some((like) => like._id === userId)) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }
  if (newCardElement.dataset.ownerId !== userId) {
    cardDeleteButton.remove();
  } else {
    cardDeleteButton.addEventListener("click", handleDelete);
  }

  return newCardElement;
};
