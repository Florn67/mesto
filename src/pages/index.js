import './index.css'

import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import PopupWithImage from '../components/PopupWithImage.js'
import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithForm from '../components/PopupWithForm.js'
import Api from '../components/Api.js'

import {editButton, addButton, formEdit, formAdd, nameInputEdit, descriptionInputEdit, cardTemplate, validationOptions} from '../utils/constants.js';

let initialCards = []
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-28',
  headers: {
    authorization: '1b5ba567-e5a7-4e1f-bced-8207d5690e1d',
    'Content-Type': 'application/json'
  }
});
const addCardFormValidator = new FormValidator(validationOptions, formAdd);
const editProfileFormValidator  = new FormValidator(validationOptions, formEdit);
const userInfoMethods = new UserInfo({nameSelector: '.profile__name', infoSelector: '.profile__description'});
const popupTypeImage = new PopupWithImage('.popup-image');
popupTypeImage.setEventListeners();

function createCard(item, count) {
    const cardElement = new Card(item, cardTemplate, count, () => {popupTypeImage.open( item.link, item.name) })
    cardElement
    return cardElement.generateCard();
  } 

const cardsList = new Section({items: initialCards, renderer: (item) => {
    cardsList.addItem(createCard(item))
}},'.elements');

api.getCards().then(res => {res.forEach(item => {
  cardsList.addItem(createCard({name: item.name, link: item.link}, item.likes.length), 'append');
  console.log(item)

})})

const popupTypeEdit = new PopupWithForm('.popup_type_edit', ({popupName, popupDescription}) => {
    userInfoMethods.setUserInfo({name: popupName, about: popupDescription});
    api.patchUserInfo(popupName, popupDescription)
    popupTypeEdit.close();
})
const popupTypeAdd = new PopupWithForm('.popup_type_add', ({popupNameMesto, popupLinkMesto}) => {
    cardsList.addItem(createCard({name: popupNameMesto, link: popupLinkMesto}), 'prepend')
    api.postNewCard(popupNameMesto, popupLinkMesto)
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

 
api.getUserInfo().then(res => {userInfoMethods.setUserInfo(res)})