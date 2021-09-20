import './pages/index.css'

import Card from './components/Card.js'
import FormValidator from './components/FormValidator.js'
import PopupWithImage from './components/PopupWithImage.js'
import Section from './components/Section.js'
import UserInfo from './components/UserInfo.js'
import PopupWithForm from './components/PopupWithForm.js'

import {editButton, initialCards, addButton, formEdit, formAdd, nameInputEdit, nameInputAdd, descriptionInputEdit, descriptionInputAdd, cardTemplate, validationOptions} from './utils/constants.js';

const addCardFormValidator = new FormValidator(validationOptions, formAdd);
const editProfileFormValidator  = new FormValidator(validationOptions, formEdit);
const userInfoMethods = new UserInfo({nameSelector: '.profile__name', infoSelector: '.profile__description'});
const PopupTypeImage = new PopupWithImage('.popup-image');
PopupTypeImage.setEventListeners();
const cardsList = new Section({items: initialCards, renderer: (item) => {
    const cardElement = new Card(item, cardTemplate, () => {PopupTypeImage.open( item.link, item.name) }).generateCard()
    cardsList.addItem(cardElement)
}},'.elements');
const popupTypeEdit = new PopupWithForm('.popup_type_edit', () => {
    event.preventDefault();
    userInfoMethods.setUserInfo(nameInputEdit.value, descriptionInputEdit.value);
    popupTypeEdit.close('edit');
})
const popupTypeAdd = new PopupWithForm('.popup_type_add', () => {
    event.preventDefault();
    const newCard = new Section({items: [{name: nameInputAdd.value, link: descriptionInputAdd.value}], renderer: (item) => {
        const cardElement = new Card(item, cardTemplate, () => {PopupTypeImage.open( item.link, item.name)}).generateCard()
        newCard.addItem(cardElement, 'prepend')
    }},'.elements');
    newCard.renderItems();
    addCardFormValidator.disableSubmitButton();
    popupTypeAdd.close('add');
})
popupTypeEdit.setEventListeners();
popupTypeAdd.setEventListeners();
addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();
cardsList.renderItems();

editButton.addEventListener('click', function() {
    let profileInfo = userInfoMethods.getUserInfo();
    nameInputEdit.value = profileInfo.name;
    descriptionInputEdit.value = profileInfo.info;
    editProfileFormValidator.hideAllErrors();
    popupTypeEdit.open();
});
addButton.addEventListener('click', function(){ 
    addCardFormValidator.hideAllErrors();
    popupTypeAdd.open('add');
});