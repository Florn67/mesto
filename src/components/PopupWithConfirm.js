import Popup from "./Popup.js";

class PopupWithConfirm extends Popup{
    constructor(popupSelector, deleteCard){
        super(popupSelector)
        this._deleteCard = deleteCard.bind(this);
    }
    setEventListeners(){
        super.setEventListeners();
        this._popup.querySelector('.popup-delete__button').addEventListener('click', () => {
            this._deleteCard()
            this.close()
        })
    }
}

export default PopupWithConfirm