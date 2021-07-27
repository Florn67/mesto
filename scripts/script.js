let closeButton = document.querySelector('.popup__close-button');
let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let form = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input_value_name');
let descriptionInput = document.querySelector('.popup__input_value_description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

const cards = document.querySelector('.elements');
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
]; 

function addCard(descriptionValue, imageSource){
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.elements__image').setAttribute('alt', `${descriptionValue}`);
    cardElement.querySelector('.elements__image').setAttribute('src', `${imageSource}`);
    cardElement.querySelector('.elements__description').textContent = descriptionValue;
    cards.append(cardElement);
}

initialCards.forEach(function(item){
    addCard(item.name, item.link);
})

function openPopup(){
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    popup.classList.add('popup_opened');
}

function closePopup(){
    popup.classList.remove('popup_opened');
}

function changeInfo(evt){
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
form.addEventListener('submit', changeInfo);