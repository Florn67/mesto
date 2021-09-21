class Popup{
    constructor(popupSelector){
        this._popup = document.querySelector(popupSelector)
        this._handleEscClose = this._handleEscClose.bind(this); 
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
            this.close();
        };
    };
    setEventListeners(){
        const _this = this
        this._popup.addEventListener('click', function(evt){
            if (evt.target.classList.contains('popup')){
                _this.close();
            };
            if (evt.target.classList.contains('popup__close-button')){
                _this.close();
            }
        });
    }
}

export default Popup;