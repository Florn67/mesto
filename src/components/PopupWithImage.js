import Popup from "./Popup.js";
class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup-image__image");
    this._popupImageDescription = this._popup.querySelector(
      ".popup-image__description"
    );
  }
  open(link, name) {
    this._popupImage.setAttribute("src", link);
    this._popupImage.setAttribute("alt", name);
    this._popupImageDescription.textContent = name;
    super.open();
  }
}

export default PopupWithImage;
