import Popup from './Popup.js'
class PopupWithForm extends Popup{
    constructor(popupSelector, formSubmit){
        super(popupSelector);
        this._formSubmit = formSubmit.bind(this);
        this._formElement = this._popup.querySelector('form');
        this._inputList = this._popup.querySelectorAll('.popup__input');
    }
    _getInputValues(){
        const data = {};
        this._inputList.forEach((input) => {
            data[input.name] = input.value;
        });
        return data;
    }
    setEventListeners(){
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) =>{
            evt.preventDefault();
            this._formSubmit(this._getInputValues())
        });
    }
    close(){
        super.close();
        this._formElement.reset();
    }
}

export default PopupWithForm