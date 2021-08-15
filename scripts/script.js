const popups = Array.from(document.querySelectorAll('.popup'));
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
const cards = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;
const submitButtonAdd = document.querySelector('.popup__submit_type_add');

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

function closePopup(popup){
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', keyHandler)
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
    }
}

popups.forEach(function(popupElement){
    popupElement.addEventListener('click', function(evt){
        if (evt.target.classList.contains('popup')){
            closePopup(popupElement);
        };
        if (evt.target.classList.contains('popup__close-button')){
            closePopup(popupElement)
        }
    });
});

editButton.addEventListener('click', function() {
    nameInputEdit.value = profileName.textContent;
    descriptionInputEdit.value = profileDescription.textContent;
    openPopup(popupEdit);
});
addButton.addEventListener('click', () => openPopup(popupAdd));
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
    submitButtonAdd.setAttribute("disabled", "true");
    submitButtonAdd.classList.add('popup__submit_inactive');
    closePopup(popupAdd);
});