const popupImage = document.querySelector(".popup-image");
const popupImageSelf = document.querySelector(".popup-image__image");
const popupImageDescription = document.querySelector(
  ".popup-image__description"
);

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const formEdit = document.querySelector(".popup__form_type_edit");
const formAdd = document.querySelector(".popup__form_type_add");
const formAvatar = document.querySelector(".popup__form_type_avatar");
const nameInputEdit = document.querySelector(".popup__input_value_name-edit");
const descriptionInputEdit = document.querySelector(
  ".popup__input_value_description-edit"
);
const cardTemplate = "#card-template";
const editAvatarButton = document.querySelector(
  ".profile__avatar-edit-container"
);

const validationOptions = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_inactive",
  inputErrorClass: "popup__input_error",
  errorClassActive: "popup__input-error_active",
};

export {
  popupImage,
  popupImageSelf,
  popupImageDescription,
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
};
