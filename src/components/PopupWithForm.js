import Popup from "./Popup.js";
class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit.bind(this);
    this._formElement = this._popup.querySelector("form");
    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._sumbitButton = this._popup.querySelector(".popup__submit");
  }
  _getInputValues() {
    const data = {};
    this._inputList.forEach((input) => {
      data[input.name] = input.value;
    });
    return data;
  }
  waitForFetch(wait) {
    const buttonText = this._sumbitButton.textContent;
    if (wait) {
      this._sumbitButton.textContent += "...";
    } else {
      this._sumbitButton.textContent = buttonText.slice(
        0,
        buttonText.length - 3
      );
    }
  }
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
    });
  }
  close() {
    super.close();
    this._formElement.reset();
  }
}

export default PopupWithForm;
