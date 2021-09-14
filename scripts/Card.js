import {popupImageSelf, popupImageDescription, popupImage} from './utils/constants.js'
import {openPopup} from './utils/utils.js'
class Card{
    constructor(initialCard, cardSelector, handleCardClick){
        this._name = initialCard.name;
        this._link = initialCard.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }
    _getTemplate() {
        return document.querySelector(this._cardSelector).content.cloneNode(true);
    }
    _setAttrubitues(){
        this._cardImage = this._element.querySelector('.elements__image');
        this._cardImage.setAttribute('alt', this._name);
        this._cardImage.setAttribute('src', this._link);
        this._element.querySelector('.elements__description').textContent = this._name;
    }
    _setEventListeners(){
        const _this = this
        this._element.querySelector('.elements__like-button').addEventListener('click', function(evt){
            evt.target.classList.toggle('elements__like-button_liked');
        });
        this._element.querySelector('.elements__trash-button').addEventListener('click', function(evt){
            evt.target.closest('.elements__element').remove();
        });
        this._cardImage.addEventListener('click', function(){   
                //handleCardClick()         
                popupImageSelf.setAttribute('src', _this._link);
                popupImageSelf.setAttribute('alt', _this._name);
                popupImageDescription.textContent = _this._name;
                openPopup(popupImage);
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