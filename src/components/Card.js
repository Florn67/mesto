class Card{
    constructor(initialCard, cardSelector, likeCount, handleCardClick, handleDeleteConfirm, owner, currentName){
        this._name = initialCard.name;
        this._link = initialCard.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._likeCount = likeCount;
        this._handleDeleteConfirm = handleDeleteConfirm.bind(this);
        this._owner = owner;
        this._currentName = currentName;
    }
    _getTemplate() {
        return document.querySelector(this._cardSelector).content.cloneNode(true);
    }
    _setLikes(){
        this._element.querySelector('.elements__like-counter').textContent = this._likeCount
    }
    _setAttrubitues(){
        this._cardImage = this._element.querySelector('.elements__image');
        this._cardImage.setAttribute('alt', this._name);
        this._cardImage.setAttribute('src', this._link);
        this._element.querySelector('.elements__description').textContent = this._name;
    }
    _setEventListeners(){
        this._element.querySelector('.elements__like-button').addEventListener('click', function(evt){
            evt.target.classList.toggle('elements__like-button_liked');
        });
        this._element.querySelector('.elements__trash-button').addEventListener('click', this._handleDeleteConfirm)
        this._cardImage.addEventListener('click', this._handleCardClick);
    }
    _checkOwner(){
        console.log(this._currentName, this._owner)
        if(this._currentName !== this._owner){
            this._element.querySelector('.elements__trash-button').remove();
        }
    }
    generateCard(){
        this._element = this._getTemplate();
        this._setAttrubitues();
        this._setEventListeners();
        this._checkOwner();
        this._setLikes()
        return this._element;
    }
}

export default Card;