import Card from './Card.js'
import FormValidator from './FormValidator.js';
import {openPopup, closePopup} from './utils/utils.js'

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

const cards = document.querySelector('.elements');
const cardTemplate = '#card-template';
const submitButtonAdd = document.querySelector('.popup__submit_type_add');


const validationOptions = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_error',
    errorClassActive: 'popup__input-error_active'
}

const addCardFormValidator = new FormValidator(validationOptions, formAdd);
const editProfileFormValidator  = new FormValidator(validationOptions, formEdit);

addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();

function addCard(cardElement, key = 'append'){
    if (key==='append'){
        cards.append(cardElement);
    }
    if (key==='prepend'){
        cards.prepend(cardElement);
    }
}

function createCard(initialCard, cardSelector){
    return new Card(initialCard, cardSelector).generateCard()
}

initialCards.forEach(function(item){
    addCard(createCard(item, cardTemplate));
})

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
    editProfileFormValidator.hideAllErrors();
    openPopup(popupEdit);
});
addButton.addEventListener('click', function(){ 
    addCardFormValidator.hideAllErrors();
    openPopup(popupAdd)
});
formEdit.addEventListener('submit', function(evt){
    evt.preventDefault();
    profileName.textContent = nameInputEdit.value;
    profileDescription.textContent = descriptionInputEdit.value;
    closePopup(popupEdit);
});
formAdd.addEventListener('submit', function(evt){
    evt.preventDefault();
    addCard(createCard({name: nameInputAdd.value, link: descriptionInputAdd.value}, cardTemplate), 'prepend');
    nameInputAdd.value = "";
    descriptionInputAdd.value ="";
    addCardFormValidator.disableSubmitButton()
    closePopup(popupAdd);
});