function createCard(descriptionValue, imageSource){
    const cardElement = cardTemplate.cloneNode(true);
    const deleteButton = cardElement.querySelector('.elements__trash-button');
    const cardImage = cardElement.querySelector('.elements__image')

    cardImage.setAttribute('alt', `${descriptionValue}`);
    cardImage.setAttribute('src', `${imageSource}`);
    cardElement.querySelector('.elements__description').textContent = descriptionValue;
    cardElement.querySelector('.elements__like-button').addEventListener('click', function(evt){
        const eventTarget = evt.target;
        eventTarget.classList.toggle('elements__like-button_liked');
    });

    deleteButton.addEventListener('click', function(){
        const deletingElement = deleteButton.closest('.elements__element');
        deletingElement.remove();
    });

    cardImage.addEventListener('click', function(){
        popupImageSelf.setAttribute('src', imageSource);
        popupImageSelf.setAttribute('alt', descriptionValue);
        popupImageDescription.textContent = descriptionValue;
        openPopup(popupImage);
    });

    return cardElement
}