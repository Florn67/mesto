import './index.css'

import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import PopupWithImage from '../components/PopupWithImage.js'
import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithForm from '../components/PopupWithForm.js'

import {editButton, initialCards, addButton, formEdit, formAdd, nameInputEdit, descriptionInputEdit, cardTemplate, validationOptions} from '../utils/constants.js';

const addCardFormValidator = new FormValidator(validationOptions, formAdd);
const editProfileFormValidator  = new FormValidator(validationOptions, formEdit);
const userInfoMethods = new UserInfo({nameSelector: '.profile__name', infoSelector: '.profile__description'});
const popupTypeImage = new PopupWithImage('.popup-image');
popupTypeImage.setEventListeners();

function createCard(item) {
    const cardElement = new Card(item, cardTemplate, () => {popupTypeImage.open( item.link, item.name) })
    return cardElement.generateCard();
  } 


const cardsList = new Section({items: initialCards, renderer: (item) => {
    cardsList.addItem(createCard(item))
}},'.elements');
const popupTypeEdit = new PopupWithForm('.popup_type_edit', ({popupName, popupDescription}) => {
    userInfoMethods.setUserInfo(popupName, popupDescription);
    popupTypeEdit.close();
})
const popupTypeAdd = new PopupWithForm('.popup_type_add', ({popupNameMesto, popupLinkMesto}) => {
    cardsList.addItem(createCard({name: popupNameMesto, link: popupLinkMesto}), 'prepend')
    addCardFormValidator.disableSubmitButton();
    popupTypeAdd.close();
})
popupTypeEdit.setEventListeners();
popupTypeAdd.setEventListeners();
addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();
cardsList.renderItems();

editButton.addEventListener('click', function() {
    const profileInfo = userInfoMethods.getUserInfo();
    nameInputEdit.value = profileInfo.name;
    descriptionInputEdit.value = profileInfo.info;
    editProfileFormValidator.hideAllErrors();
    popupTypeEdit.open();
});
addButton.addEventListener('click', function(){ 
    addCardFormValidator.hideAllErrors();
    popupTypeAdd.open();
});