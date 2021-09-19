function keyHandler(evt){
    if (evt.key === "Escape"){    
        closePopup(document.querySelector('.popup_opened'));
    }
}

export default keyHandler