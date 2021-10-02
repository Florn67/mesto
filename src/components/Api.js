class Api{
    constructor({baseUrl, headers}){
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
    getUserInfo(){
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка запроса getUserInfo: ${res.status}`);
            })
            .then((result) => {
                return {name: result.name, about: result.about, avatarUrl: result.avatar}
            })
            .catch((err) => {
                console.log(err); 
            });
           
        
    }
    patchAvatar(avatarUrl, waitForFetch){
        waitForFetch(true);
        fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatarUrl
            })
        }) 
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка запроса patchAvatar: ${res.status}`);
            })
            .catch((err) => {
                console.log(err); 
            })
            .finally(() => {
                waitForFetch(false)
            });
    }
    getCards(){
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка запроса getCards: ${res.status}`);
            })
            .then((result) => {
                const initialCards = [];
                result.forEach(item => {
                    initialCards.push(item)
                 
                })
                
                return initialCards
            })
            .catch((err) => {
                console.log(err); 
            }); 
        
    }
    patchUserInfo(name, about, waitForFetch){
        waitForFetch(true)
        fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        }) 
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка запроса patchUserInfo: ${res.status}`);
            })
            .catch((err) => {
                console.log(err); 
            })
            .finally(() => {
                waitForFetch(false)
            });
    }
   postNewCard(name, link, waitForFetch){
    waitForFetch(true)
    fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    }) 
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка запроса postNewCard: ${res.status}`);
        })
        .catch((err) => {
            console.log(err); 
        })
        .finally(() => {
            waitForFetch(false)
        });
   }
   deleteCard(id){
       fetch(`${this._baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: this._headers
        }) 
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка запроса deleteCard: ${res.status}`);
        })
        .catch((err) => {
            console.log(err); 
        });  
   }
  
   putLike(id){
        fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: 'PUT',
            headers: this._headers
            }) 
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка запроса putLike: ${res.status}`);
            })
            .catch((err) => {
                console.log(err); 
            });  
    }
    deleteLike(id){
        fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: this._headers
            }) 
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка запроса deleteLike: ${res.status}`);
            })
            .catch((err) => {
                console.log(err); 
            });  
    }
}

export default Api