const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
const placesList = document.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');


const createCard = (cardContent, deleteCallback, likeCallback) => {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.card__image').src = cardContent.link;
  card.querySelector('.card__image').alt = cardContent.name;
  card.querySelector('.card__title').textContent = cardContent.name;
  card.querySelector('.card__delete-button').addEventListener('click', () => deleteCallback(card));
  card.querySelector('.card__like-button').addEventListener('click', () => likeCallback(card));
  return card;
};


const deleteCard = (card) => {
  card.remove();
};


const likeCard = (card) => {
  card.querySelector('.card__like-button').classList.toggle('card__like-button_is-active');
};


const renderCards = (cards) => {
  cards.forEach((card) => {
    placesList.append(createCard(card, deleteCard, likeCard));
  });
};


const addCard = () => {
  const popupNewCard = document.querySelector('.popup_type_new-card');
  popupNewCard.classList.add('popup_is-opened');
  popupNewCard.querySelector('.popup__button').addEventListener('click', (evt) => {
    evt.preventDefault();
    placesList.append(createCard({
        name: popupNewCard.querySelector('.popup__input_type_card-name').value,
        link: popupNewCard.querySelector('.popup__input_type_url').value
      }, deleteCard, likeCard));
    popupNewCard.classList.remove('popup_is-opened');
  });
};


addButton.addEventListener('click', addCard);
renderCards(initialCards);