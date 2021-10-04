class Card {
  constructor(
    initialCard,
    cardSelector,
    item,
    handleCardClick,
    handleDeleteConfirm,
    currentName,
    handleLikeClick
  ) {
    this._name = initialCard.name;
    this._link = initialCard.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._likeCount = item.likes.length;
    this._id = item._id;
    this._handleDeleteConfirm = handleDeleteConfirm.bind(this);
    this._owner = item.owner.name;
    this._currentName = currentName;
    this._handleLikeClick = handleLikeClick.bind(this);
    this._liked = item.likes.some((item) => {
      return item.name === this._currentName;
    });
  }
  _getTemplate() {
    return document.querySelector(this._cardSelector).content.cloneNode(true);
  }
  _setLikes(count) {
    this._element.querySelector(".elements__like-counter").textContent = count;
    if (this._liked) {
      this._element
        .querySelector(".elements__like-button")
        .classList.add("elements__like-button_liked");
    }
  }
  _setAttrubitues() {
    this._cardImage = this._element.querySelector(".elements__image");
    this._cardImage.setAttribute("alt", this._name);
    this._cardImage.setAttribute("src", this._link);
    this._element.querySelector(".elements__description").textContent =
      this._name;
  }
  _setEventListeners() {
    this._element.querySelector(".elements__like-button").addEventListener("click", (evt) => {
        let likeCountElement = evt.target.nextElementSibling;
        if (this._handleLikeClick(this._liked)) {
          evt.target.classList.add("elements__like-button_liked");
          likeCountElement.textContent = parseInt(likeCountElement.textContent) + 1;
          this._liked = true;
        } else {
          evt.target.classList.remove("elements__like-button_liked");
          likeCountElement.textContent = parseInt(likeCountElement.textContent) - 1;
          this._liked = false;
        }
      });
    this._element.querySelector(".elements__trash-button").addEventListener("click", (evt) => {
        this._handleDeleteConfirm(this._id, evt);
      });
    this._cardImage.addEventListener("click", this._handleCardClick);
  }
  deleteCard(evt) {
    evt.target.closest(".elements__element").remove();
  }
  _checkOwner() {
    if (this._currentName !== this._owner) {
      this._element.querySelector(".elements__trash-button").remove();
    }
  }
  generateCard(myCard) {
    this._element = this._getTemplate();
    this._setAttrubitues();
    this._setEventListeners();
    if (!myCard) {
      this._checkOwner();
    }
    this._setLikes(this._likeCount);
    return this._element;
  }
}

export default Card;
