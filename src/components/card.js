import {
  likeCardFromServer,
  unlikeCardFromServer,
} from "./api.js";

export const likeCard = (cardId, button, likeCounter) => {
  if (button.classList.contains("card__like-button_is-active")) {
    unlikeCardFromServer(cardId)
      .then((card) => {
        likeCounter.textContent = card.likes.length;
        button.classList.remove("card__like-button_is-active");
      })
      .catch((err) => console.log(err));
  } else {
    likeCardFromServer(cardId)
      .then((card) => {
        likeCounter.textContent = card.likes.length;
        button.classList.add("card__like-button_is-active");
      })
      .catch((err) => console.log(err));
  }
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
  cardLikeButton.addEventListener("click", () => handleLike(cardContent._id, cardLikeButton, cardLikeCounter));

  if (cardContent.likes.some((like) => like._id === userId)) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }
  if (newCardElement.dataset.ownerId !== userId) {
    cardDeleteButton.remove();
  } else {
    cardDeleteButton.addEventListener("click", () => handleDelete(newCardElement));
  }

  return newCardElement;
};
