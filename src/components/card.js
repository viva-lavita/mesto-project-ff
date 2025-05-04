export const likeCard = (evt) => {
  evt.target.classList.add("card__like-button_is-active");
};

export const deleteCard = (evt) => {
  evt.target.closest(".card").remove();
};

export const createCardElement = (cardContent, handleLike, handleDelete, handleClickImage) => {
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

  cardDeleteButton.addEventListener("click", handleDelete);
  cardLikeButton.addEventListener("click", handleLike);
  cardImage.addEventListener("click", handleClickImage);

  return newCardElement;
};

export const addCard = (cardElement) => {
  const placesList = document.querySelector(".places__list");
  placesList.prepend(cardElement);
};
