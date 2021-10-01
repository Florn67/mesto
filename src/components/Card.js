class Card{
    constructor(initialCard, cardSelector, item, handleCardClick, handleDeleteConfirm, currentName, handleLikeClick){
        this._name = initialCard.name;
        this._link = initialCard.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._likeCount = item.likes.length;
        this._handleDeleteConfirm = handleDeleteConfirm.bind(this);
        this._owner = item.owner.name;
        this._currentName = currentName;
        this._handleLikeClick = handleLikeClick.bind(this);
        this._liked = item.likes.some(item => {return item.name === this._currentName});
    }
    _getTemplate() {
        return document.querySelector(this._cardSelector).content.cloneNode(true);
    }
    _setLikes(count){
        this._element.querySelector('.elements__like-counter').textContent = count;
        if (this._liked){
        
            this._element.querySelector('.elements__like-button').classList.add('elements__like-button_liked')
        }
    }
    _setAttrubitues(){
        this._cardImage = this._element.querySelector('.elements__image');
        this._cardImage.setAttribute('alt', this._name);
        this._cardImage.setAttribute('src', this._link);
        this._element.querySelector('.elements__description').textContent = this._name;
    }
    _setEventListeners(){
        const _this = this;
        this._element.querySelector('.elements__like-button').addEventListener('click', function(evt){
            if(_this._handleLikeClick(_this._liked)){
                evt.target.classList.add('elements__like-button_liked');
                _this._liked = true;
            }else{
                evt.target.classList.remove('elements__like-button_liked');
                _this._liked = false;
            };
            // _this._requestLikeCount(_this._cardId).then(item => {_this._setLikes(item.length)})
        });
        this._element.querySelector('.elements__trash-button').addEventListener('click', this._handleDeleteConfirm)
        this._cardImage.addEventListener('click', this._handleCardClick);
    }
    _checkOwner(){
        
        if(this._currentName !== this._owner){
            this._element.querySelector('.elements__trash-button').remove();
        }
    }
    generateCard(){
        console.log(this._liked)
        this._element = this._getTemplate();
        this._setAttrubitues();
        this._setEventListeners();
        this._checkOwner();
        this._setLikes(this._likeCount)
        return this._element;
    }
}

export default Card;