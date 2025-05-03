export const likeCard = (button) => {
  button.classList.add("card__like-button_is-active");
};

export const deleteCard = (card) => {
  card.remove();
};

export const createCardElement = (cardContent) => {
  const newCardElement = document
    .querySelector("#card-template")
    .content.querySelector(".card")
    .cloneNode(true);
  const cardImage = newCardElement.querySelector(".card__image");
  const cardTitle = newCardElement.querySelector(".card__title");

  cardImage.src = cardContent.link;
  cardImage.alt = cardContent.name;
  cardTitle.textContent = cardContent.name;

  return newCardElement;
};

export const addCard = (cardElement) => {
  const placesList = document.querySelector(".places__list");
  placesList.prepend(cardElement);
};
