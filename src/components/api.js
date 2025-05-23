export const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-39",
  headers: {
    authorization: "01cda741-c2ed-439a-ad59-3e3c9d444cfa",
    "Content-Type": "application/json",
  },
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, { headers: config.headers })
    .then(
      (res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
    .catch((err) => console.log(err));
};


export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, { headers: config.headers })
    .then(
      (res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
    .catch((err) => console.log(err));
};

export const setUserInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then(
      (res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
    .catch((err) => console.log(err));
};

export const setNewAvatar = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  })
    .then(
      (res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
    .catch((err) => console.log(err));
};

export const addNewCard = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    }),
  })
    .then(
      (res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
    .catch((err) => console.log(err));
};

export const deleteCardFromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(
      (res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
    .catch((err) => console.log(err));
};
