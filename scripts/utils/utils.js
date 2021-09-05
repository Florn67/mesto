function openPopup(popup){
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', keyHandler);
}

function closePopup(popup){
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', keyHandler)
}
function keyHandler(evt){
    if (evt.key === "Escape"){    
        closePopup(document.querySelector('.popup_opened'));
    }
}

export {openPopup, closePopup, keyHandler}