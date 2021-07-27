let closeButton = Array.from(document.querySelectorAll('.popup__close-button'));
let editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
let popup = Array.from(document.querySelectorAll('.popup'));
let form = Array.from(document.querySelectorAll('.popup__container'));
let nameInput = Array.from(document.querySelectorAll('.popup__input_value_name'));
let descriptionInput = Array.from(document.querySelectorAll('.popup__input_value_description'));
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
    nameInput[0].value = profileName.textContent;
    descriptionInput[0].value = profileDescription.textContent;
    popup[0].classList.add('popup_opened');
}

function openPopupMesto(){
    popup[1].classList.add('popup_opened');
}

function closePopup(popup){
    popup.classList.remove('popup_opened');
}

function changeInfo(evt){
    evt.preventDefault();
    profileName.textContent = nameInput[0].value;
    profileDescription.textContent = descriptionInput[0].value;
    closePopup();
}

editButton.addEventListener('click', openPopup);
addButton.addEventListener('click', openPopupMesto)
closeButton[0].addEventListener('click', () => closePopup(popup[0]));
closeButton[1].addEventListener('click', () => closePopup(popup[1]));
form[0].addEventListener('submit', changeInfo);