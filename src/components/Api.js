const handleResponse = (res) => {
    if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
  }
class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then(handleResponse)
      .then((result) => {
        return {
          name: result.name,
          about: result.about,
          avatarUrl: result.avatar,
        };
      })
      .catch((err) => {
        console.log(err);
      });
  }
  patchAvatar(avatarUrl, waitForFetch) {
    waitForFetch(true);
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    })
      .then(handleResponse)
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        waitForFetch(false);
      });
  }
  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then(handleResponse)
      .then((result) => {
        const initialCards = [];
        result.forEach((item) => {
          initialCards.push(item);
        });

        return initialCards;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  patchUserInfo(name, about, waitForFetch) {
    waitForFetch(true);
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then(handleResponse)
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        waitForFetch(false);
      });
  }
  postNewCard(name, link, waitForFetch) {
    waitForFetch(true);
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then(handleResponse)
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        waitForFetch(false);
      });
  }
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(handleResponse)
      .catch((err) => {
        console.log(err);
      });
  }

  putLike(id) {
    fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
    })
      .then(handleResponse)
      .catch((err) => {
        console.log(err);
      });
  }
  deleteLike(id) {
    fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(handleResponse)
      .catch((err) => {
        console.log(err);
      });
  }
}

export default Api;
