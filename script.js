let closeButton = document.querySelector('.popup__close-button');
let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let submitButton = document.querySelector('.popup__submit');
let form = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__name');
let descriptionInput = document.querySelector('.popup__description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

function openPopup(){
    popup.classList.add('popup_opened');
    console.log('11');
}

function closePopup(){
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    popup.classList.remove('popup_opened');
    console.log('11');
}

function changeInfo(evt){
    evt.preventDefault();
    nameInpitValue = nameInput.value;
    descriptionInputValue = descriptionInput.value;
    profileName.textContent = nameInpitValue;
    profileDescription.textContent = descriptionInputValue;
    closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
form.addEventListener('submit', changeInfo);