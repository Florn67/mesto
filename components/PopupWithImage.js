//import contstants nameInput descriptinInput
class PopupWithImage extends Popup{
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