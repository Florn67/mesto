class Popup{
    constructor(popupSelector){
        this._popup = document.querySelector(popupSelector)
    }
    open(){
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
    close(){
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }
    _handleEscClose(evt){
        if (evt.key === "Escape"){    
            this._close(this._popup);
        }
    }
    setEventListeners(){
        this._popup.addEventListener('click', function(evt){
            if (evt.target.classList.contains('popup')){
                closePopup();
            };
            if (evt.target.classList.contains('popup__close-button')){
                closePopup()
            }
        });
    }
}

export default Popup;