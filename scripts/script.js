const popups = Array.from(document.querySelectorAll('.popup'));
const closeButtonEdit = document.querySelector('.popup__close-button_type_edit');
const closeButtonAdd = document.querySelector('.popup__close-button_type_add');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const formEdit = document.querySelector('.popup__form_type_edit');
const formAdd = document.querySelector('.popup__form_type_add');
const nameInputEdit = document.querySelector('.popup__input_value_name-edit');
const nameInputAdd = document.querySelector('.popup__input_value_name-add');
const descriptionInputEdit = document.querySelector('.popup__input_value_description-edit');
const descriptionInputAdd = document.querySelector('.popup__input_value_description-add');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupImage = document.querySelector('.popup-image')
const popupImageSelf = document.querySelector('.popup-image__image');
const popupImageDescription = document.querySelector('.popup-image__description');
const popupImageCloseButton = document.querySelector('.popup-image__close-button');
const cards = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;

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

    cardImage.addEventListener('click', function(evt){
        const eventTarget = evt.target;
        popupImage.classList.add('popup-image_opened');
        popupImageSelf.setAttribute('src', eventTarget.getAttribute('src'));
        popupImageSelf.setAttribute('alt', eventTarget.getAttribute('alt'));
        popupImageDescription.textContent = descriptionValue;
        document.addEventListener('keydown', keyHandler);
    });

    return cardElement
}

function addCard(cardElement, key = 'app'){
    if (key==='app'){
        cards.append(cardElement);
    }
    if (key==='prep'){
        cards.prepend(cardElement);
    }
}

function openPopup(popup){
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', keyHandler);
}

function closePopup(popup, key="default"){
    if (key==='default'){
        popup.classList.remove('popup_opened');
    }else{
        popup.classList.remove('popup-image_opened');
    }
}

initialCards.forEach(function(item){
    addCard(createCard(item.name, item.link));
})

function keyHandler(evt){
    if (evt.key === "Escape"){
        popups.forEach(function(popupElement){
            if (popupElement.classList.contains('popup_opened')){
                closePopup(popupElement);
            }
        })
        if (popups.every(function(popupElement){
            return (!popupElement.classList.contains('popup_opened'))
        })){
            closePopup(popupImage, 'image');
        }
        removeListenerForKeys();
    }
}

function removeListenerForKeys(){
    document.removeEventListener('keydown', keyHandler)
}

popups.forEach(function(popupElement){
    popupElement.addEventListener('click', function(evt){
        if (evt.target.classList.contains('popup')){
            closePopup(popupElement);
        };
    });
});

editButton.addEventListener('click', function() {
    nameInputEdit.value = profileName.textContent;
    descriptionInputEdit.value = profileDescription.textContent;
    openPopup(popupEdit);
});
addButton.addEventListener('click', () => openPopup(popupAdd));
closeButtonEdit.addEventListener('click', () => closePopup(popupEdit));
closeButtonAdd.addEventListener('click', () => closePopup(popupAdd));
popupImageCloseButton.addEventListener('click', () => closePopup(popupImage, "image"));
formEdit.addEventListener('submit', function(evt){
    evt.preventDefault();
    profileName.textContent = nameInputEdit.value;
    profileDescription.textContent = descriptionInputEdit.value;
    closePopup(popupEdit);
});
formAdd.addEventListener('submit', function(evt){
    evt.preventDefault();
    addCard(createCard(nameInputAdd.value, descriptionInputAdd.value), 'prep');
    nameInputAdd.value = "";
    descriptionInputAdd.value ="";
    closePopup(popupAdd);
});
popupImage.addEventListener('click', function(evt){
    if (evt.target.classList.contains('popup-image')){
        closePopup(popupImage, "image");
    }
})

