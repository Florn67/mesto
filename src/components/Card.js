class Card{
    constructor(initialCard, cardSelector, likeCount, handleCardClick){
        this._name = initialCard.name;
        this._link = initialCard.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._likeCount = likeCount;
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
        this._element.querySelector('.elements__trash-button').addEventListener('click', function(evt){
            evt.target.closest('.elements__element').remove();
        });
        this._cardImage.addEventListener('click', this._handleCardClick);
    }
    generateCard(){
        this._element = this._getTemplate();
        this._setAttrubitues();
        this._setEventListeners();
        this._setLikes()
        return this._element;
    }
}

export default Card;