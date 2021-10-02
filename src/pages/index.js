import './index.css'

import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import PopupWithImage from '../components/PopupWithImage.js'
import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithForm from '../components/PopupWithForm.js'
import Api from '../components/Api.js'
import PopupWithConfirm from '../components/PopupWithConfirm.js'

import {editButton, addButton, formEdit, formAdd, nameInputEdit, descriptionInputEdit, cardTemplate, validationOptions, editAvatarButton, formAvatar} from '../utils/constants.js';

let initialCards = []

const addCardFormValidator = new FormValidator(validationOptions, formAdd);
const editProfileFormValidator  = new FormValidator(validationOptions, formEdit);
const editAvatarValidator = new FormValidator(validationOptions, formAvatar);
const userInfoMethods = new UserInfo({nameSelector: '.profile__name', infoSelector: '.profile__description'}, '.profile', () => {});
const popupTypeImage = new PopupWithImage('.popup-image');

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-28',
  headers: {
    authorization: '1b5ba567-e5a7-4e1f-bced-8207d5690e1d',
    'Content-Type': 'application/json'
  }
});

popupTypeImage.setEventListeners();


function createCard(item) {
    const cardElement = new Card({name: item.name, link: item.link}, cardTemplate, item, () => {popupTypeImage.open( item.link, item.name) }, (evt) => {
      const deletingCard = evt.target.closest('.elements__element');
      const popupTypeDelete = new PopupWithConfirm('.popup-delete', () => { deletingCard.remove(); api.deleteCard(item._id)})
      popupTypeDelete.setEventListeners()
      popupTypeDelete.open()
    }, userInfoMethods.getUserInfo().name,

    (liked) => {if(liked){
      api.deleteLike(item._id)
      return false
    }else{
      api.putLike(item._id)
      return true
    }}
    )
    
    return cardElement.generateCard();
  } 

function handleWaitForFetch(popupType, wait){
  popupType.waitForFetch(wait)
  if (!wait){
    popupType.close()
  }
}

const cardsList = new Section({items: initialCards, renderer: (item) => {
    cardsList.addItem(createCard(item))
}},'.elements');

api.getCards().then(res => {res.forEach(item => {
  cardsList.addItem(createCard(item), 'append');
})})

const popupTypeEdit = new PopupWithForm('.popup_type_edit', ({popupName, popupDescription}) => {
    userInfoMethods.setUserInfo({name: popupName, about: popupDescription});
    api.patchUserInfo(popupName, popupDescription, (wait) => {handleWaitForFetch(popupTypeEdit, wait)})
})
const popupTypeAdd = new PopupWithForm('.popup_type_add', ({popupNameMesto, popupLinkMesto}) => {
    // cardsList.addItem(createCard({name: popupNameMesto, link: popupLinkMesto, likes: [], owner: {name: userInfoMethods.getUserInfo().name}}), 'prepend')
    api.postNewCard(popupNameMesto, popupLinkMesto, (wait) => {handleWaitForFetch(popupTypeAdd, wait)
     if(!wait){
      api.getCards().then(res => {res.forEach(item => {
        if((item.name === popupNameMesto) && (item.owner.name ===  userInfoMethods.getUserInfo().name)){
          cardsList.addItem(createCard(item), 'prepend')
        }
      })})
     }
    })
    addCardFormValidator.disableSubmitButton();
})
const popupTypeAvatar = new PopupWithForm('.popup_type_avatar', ({popupLinkAvatar}) => {
  userInfoMethods.setAvatar(popupLinkAvatar);
  api.patchAvatar(popupLinkAvatar, (wait) => {
    handleWaitForFetch(popupTypeAvatar, wait)
  });
  
})


popupTypeEdit.setEventListeners();
popupTypeAdd.setEventListeners();
popupTypeAvatar.setEventListeners();

addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();
editAvatarValidator.enableValidation();
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
editAvatarButton.addEventListener('click', function(){
  popupTypeAvatar.open()
})
 
api.getUserInfo().then(res => {
  userInfoMethods.setUserInfo({name: res.name, about: res.about})
  userInfoMethods.setAvatar(res.avatarUrl)
})
