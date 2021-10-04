import Popup from "./Popup.js";

class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  setSubmitAction(confirmationDelete) {
    this._popup
      .querySelector(".popup-delete__button")
      .addEventListener("click", confirmationDelete);
  }
}

export default PopupWithConfirm;
