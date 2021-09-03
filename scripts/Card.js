class Card{
    constructor(initialCard, cardSelector){
        this._name = initialCard.name;
        this._link = initialCard.link;
        this._cardSelector = cardSelector;
    }
    _getTemplate() {
        return document.querySelector(this._cardSelector).content.cloneNode(true);
    }
    _setAttrubitues(){
        this._element.querySelector('.elements__image').setAttribute('alt', this._name);
        this._element.querySelector('.elements__image').setAttribute('src', this._link);
        this._element.querySelector('.elements__description').textContent = this._name;
    }
    _setEventListeners(){
        this._element.querySelector('.elements__like-button').addEventListener('click', function(evt){
            evt.target.classList.toggle('elements__like-button_liked');
        });
        this._element.querySelector('.elements__trash-button').addEventListener('click', function(evt){
            evt.target.closest('.elements__element').remove();
        });
    }
    generateCard(){
        this._element = this._getTemplate();
        this._setAttrubitues();
        this._setEventListeners();

        return this._element;
    }
}

export default Card;