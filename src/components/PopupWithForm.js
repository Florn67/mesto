import {nameInputAdd, descriptionInputAdd} from '../utils/constants.js'
import Popup from './Popup.js'
class PopupWithForm extends Popup{
    constructor(popup, formSubmit){
        super(popup);
        this._formSubmit = formSubmit.bind(this);
    }
    _getInputValues(){
        return {name: nameInputAdd.value, link: descriptionInputAdd.value}
    }
    setEventListeners(){
        super.setEventListeners();
        this._popup.querySelector('form').addEventListener('submit', this._formSubmit)
    }
    close(key){
        super.close();
        if (key=='add'){
            nameInputAdd.value = "";
            descriptionInputAdd.value ="";
        }
    }
}

export default PopupWithForm