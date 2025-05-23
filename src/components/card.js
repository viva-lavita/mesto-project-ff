import { deleteCardFromServer } from "./api.js";

export const likeCard = (evt) => {
  evt.target.classList.add("card__like-button_is-active");
};

export const deleteCard = (evt) => {
  const card = evt.target.closest(".card");
  deleteCardFromServer(card.id)
    .then(() => card.remove())
    .catch((err) => console.log(err));
};


export const addCard = (cardElement) => {
  const placesList = document.querySelector(".places__list");
  placesList.prepend(cardElement);
};

export const createCardElement = (cardContent, handleLike, handleDelete, handleClickImage, userId) => {
  const newCardElement = document
    .querySelector("#card-template")
    .content.querySelector(".card")
    .cloneNode(true);
  const cardImage = newCardElement.querySelector(".card__image");
  const cardTitle = newCardElement.querySelector(".card__title");
  const cardDeleteButton = newCardElement.querySelector(".card__delete-button");
  const cardLikeButton = newCardElement.querySelector(".card__like-button");

  cardImage.src = cardContent.link;
  cardImage.alt = cardContent.name;
  cardTitle.textContent = cardContent.name;
  newCardElement.setAttribute("id", cardContent._id);
  newCardElement.dataset.ownerId = cardContent.owner._id;

  cardImage.addEventListener("click", handleClickImage);
  cardLikeButton.addEventListener("click", handleLike);
  if (newCardElement.dataset.ownerId !== userId) {
    cardDeleteButton.remove();
  } else {
    cardDeleteButton.addEventListener("click", handleDelete);
  }

  return newCardElement;
};
