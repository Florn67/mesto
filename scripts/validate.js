

const showInputError = (formElement, inputElement, errorMessage, validationOptions) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationOptions.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationOptions.errorClassActive);
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement, validationOptions) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(validationOptions.inactiveButtonClass);
      buttonElement.setAttribute("disabled", "true");
    } else {
      buttonElement.classList.remove(validationOptions.inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
}; 

const checkInputValidity = (formElement, inputElement, validationOptions) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationOptions);
    } else {
        hideInputError(formElement, inputElement, validationOptions);
    }
}

const hideInputError = (formElement, inputElement, validationOptions) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationOptions.inputErrorClass);
    errorElement.classList.remove(validationOptions.errorClassActive);
    errorElement.textContent = '';
};

const setEventListeners = (formElement, validationOptions) => {
    const inputList = Array.from(formElement.querySelectorAll(validationOptions.inputSelector));
    const buttonElement = formElement.querySelector(validationOptions.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validationOptions);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            checkInputValidity(formElement, inputElement, validationOptions);
            toggleButtonState(inputList, buttonElement, validationOptions);
        });
    });
    if (formElement.classList.contains('popup__form_type_add')){
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', function() {
                setListenerToAdd(inputList)
            });
        })
    }
}

const enableValidation = (validationOptions = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_error',
    errorClassActive: 'popup__input-error_active'
}) => {
    const formList = Array.from(document.querySelectorAll(validationOptions.formSelector));
    formList.forEach(function(formElement){
        setEventListeners(formElement, validationOptions);
    });
}
enableValidation();