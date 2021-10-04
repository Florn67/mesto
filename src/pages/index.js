import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Api from "../components/Api.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";

import {
  editButton,
  addButton,
  formEdit,
  formAdd,
  nameInputEdit,
  descriptionInputEdit,
  cardTemplate,
  validationOptions,
  editAvatarButton,
  formAvatar,
} from "../utils/constants.js";

const addCardFormValidator = new FormValidator(validationOptions, formAdd);
const editProfileFormValidator = new FormValidator(validationOptions, formEdit);
const editAvatarValidator = new FormValidator(validationOptions, formAvatar);
const userInfoMethods = new UserInfo(
  { nameSelector: ".profile__name", infoSelector: ".profile__description" },
  ".profile",
  () => {}
);
const popupTypeImage = new PopupWithImage(".popup-image");
const popupTypeDelete = new PopupWithConfirm(".popup-delete");

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-28",
  headers: {
    authorization: "1b5ba567-e5a7-4e1f-bced-8207d5690e1d",
    "Content-Type": "application/json",
  },
});

popupTypeImage.setEventListeners();
popupTypeDelete.setEventListeners();

function createCard(item, myCard = false) {
  const cardElement = new Card(
    { name: item.name, link: item.link },
    cardTemplate,
    item,
    () => {
      popupTypeImage.open(item.link, item.name);
    },
    (id, evt) => {
      popupTypeDelete.open();
      popupTypeDelete.setSubmitAction(() => {
        api.deleteCard(id).then(() => {
          cardElement.deleteCard(evt);
          popupTypeDelete.close();
        });
      });
    },
    userInfoMethods.getUserInfo().name,
    (liked) => {
      if (liked) {
        api.deleteLike(item._id);
        return false;
      } else {
        api.putLike(item._id);
        return true;
      }
    }
  );
  return cardElement.generateCard(myCard);
}

function handleWaitForFetch(popupType, wait) {
  popupType.waitForFetch(wait);
  if (!wait) {
    popupType.close();
  }
}

const cardsList = new Section(".elements");

const popupTypeEdit = new PopupWithForm(".popup_type_edit",({ popupName, popupDescription }) => {
    api.patchUserInfo(popupName, popupDescription, (wait) => {
        handleWaitForFetch(popupTypeEdit, wait);
      })
      .then(
        userInfoMethods.setUserInfo({
          name: popupName,
          about: popupDescription,
        })
      );
  }
);
const popupTypeAdd = new PopupWithForm(".popup_type_add", ({ popupNameMesto, popupLinkMesto }) => {
    api.postNewCard(popupNameMesto, popupLinkMesto, (wait) => {
        handleWaitForFetch(popupTypeAdd, wait);
      })
      .then((res) => {
        cardsList.addItem(createCard(res, true), "prepend");
        addCardFormValidator.disableSubmitButton();
      });
  }
);
const popupTypeAvatar = new PopupWithForm(".popup_type_avatar",({ popupLinkAvatar }) => {
    api.patchAvatar(popupLinkAvatar, (wait) => {
        handleWaitForFetch(popupTypeAvatar, wait);
      })
      .then(() => {
        userInfoMethods.setAvatar(popupLinkAvatar);
      });
  }
);

popupTypeEdit.setEventListeners();
popupTypeAdd.setEventListeners();
popupTypeAvatar.setEventListeners();

addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();
editAvatarValidator.enableValidation();

editButton.addEventListener("click", function () {
  const profileInfo = userInfoMethods.getUserInfo();
  nameInputEdit.value = profileInfo.name;
  descriptionInputEdit.value = profileInfo.info;
  editProfileFormValidator.hideAllErrors();
  popupTypeEdit.open();
});
addButton.addEventListener("click", function () {
  addCardFormValidator.hideAllErrors();
  popupTypeAdd.open();
});
editAvatarButton.addEventListener("click", function () {
  popupTypeAvatar.open();
});

Promise.all([api.getUserInfo(), api.getCards()]).then(
  ([userInfo, initialCards]) => {
    userInfoMethods.setUserInfo({ name: userInfo.name, about: userInfo.about });
    userInfoMethods.setAvatar(userInfo.avatarUrl);
    initialCards.forEach((item) => {
      cardsList.addItem(createCard(item));
    });
  }
);
