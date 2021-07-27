const closeButton = Array.from(document.querySelectorAll('.popup__close-button'));
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popup = Array.from(document.querySelectorAll('.popup'));
const form = Array.from(document.querySelectorAll('.popup__container'));
const nameInput = Array.from(document.querySelectorAll('.popup__input_value_name'));
const descriptionInput = Array.from(document.querySelectorAll('.popup__input_value_description'));
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupImage = document.querySelector('.popup-image')
const popupImageSelf = document.querySelector('.popup-image__image');
const popupImageDescription = document.querySelector('.popup-image__description');
const popupImageCloseButton = document.querySelector('.popup-image__close-button');
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

function addCard(descriptionValue, imageSource, key = 'app'){
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);
    const deleteButton = cardElement.querySelector('.elements__trash-button');
    const cardImage = cardElement.querySelector('.elements__image')

    cardElement.querySelector('.elements__image').setAttribute('alt', `${descriptionValue}`);
    cardElement.querySelector('.elements__image').setAttribute('src', `${imageSource}`);
    cardElement.querySelector('.elements__description').textContent = descriptionValue;
    cardElement.querySelector('.elements__button').addEventListener('click', function(evt){
        const eventTarget = evt.target;
        eventTarget.classList.toggle('elements__button_liked');
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
    });

    if (key==='app'){
        cards.append(cardElement);
    }
    if (key==='prep'){
        cards.prepend(cardElement);
    }
}

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

function closePopupImage(){
    popupImage.classList.remove('popup-image_opened');
}

function changeInfo(evt){
    evt.preventDefault();
    profileName.textContent = nameInput[0].value;
    profileDescription.textContent = descriptionInput[0].value;
    closePopup(popup[0]);
}

function addNewMesto(evt){
    evt.preventDefault();
    addCard(nameInput[1].value, descriptionInput[1].value, 'prep');
    closePopup(popup[1]);
}

function changeLikeButtonColor(evt){
    console.log('132');
    const eventTarget = evt.target;
    console.log(eventTarget.getAttribute('src'));
}

initialCards.forEach(function(item){
    addCard(item.name, item.link);
})

editButton.addEventListener('click', openPopup);
addButton.addEventListener('click', openPopupMesto)
closeButton[0].addEventListener('click', () => closePopup(popup[0]));
closeButton[1].addEventListener('click', () => closePopup(popup[1]));
popupImageCloseButton.addEventListener('click', closePopupImage);
form[0].addEventListener('submit', changeInfo);
form[1].addEventListener('submit', addNewMesto);