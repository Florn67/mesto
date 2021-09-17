//import contstants nameInput descriptinInput
import Popup from './Popup.js'
class PopupWithForm extends Popup{
    constructor(popup, formSubmit){
        super(popup);
        this._formSubmit = formSubmit;
    }
    _getInputValues(){
        return {name: nameInputAdd.value, link: descriptionInputAdd.value}
    }
    _setEventListener(){
        super._setEventListener();
        //addCard
    }
    _close(){
        super.close();
        nameInputAdd.value = "";
        descriptionInputAdd.value ="";
    }
}

export default PopupWithForm