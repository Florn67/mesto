import Card from './Card.js'
import FormValidator from './FormValidator.js';
import {openPopup, closePopup} from './utils/utils.js'

import Popup from '../../components/Popup.js'
import PopupWithImage from '../../components/PopupWithImage.js'
import Section from '../../components/Section.js'
import UserInfo from '../../components/UserInfo.js'
import PopupWithForm from '../components/PopupWithForm.js';

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
const cardsList = new Section({items: initialCards, renderer: (item) => {
    const cardElement = new Card(item, cardTemplate, () => {new PopupWithImage('.popup-image').open( item.link, item.name) }).generateCard()
    cardsList.setItem(cardElement)
}},'.elements')


addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();
cardsList.renderItems();

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
    const newCard = new Section({items: [{name: nameInputAdd.value, link: descriptionInputAdd.value}], renderer: (item) => {
        const cardElement = new Card(item, cardTemplate).generateCard()
        newCard.setItem(cardElement, 'prepend')
    }},'.elements')
    newCard.renderItems();
    nameInputAdd.value = "";
    descriptionInputAdd.value ="";
    addCardFormValidator.disableSubmitButton()
    closePopup(popupAdd);
});