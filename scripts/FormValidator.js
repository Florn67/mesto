class FormValidator{
    constructor(validationOptions, formElement){
        this._formSelector = validationOptions.formSelector;
        this._inputSelector = validationOptions.inputSelector;
        this._inactiveButtonClass = validationOptions.inactiveButtonClass;
        this._inputErrorClass = validationOptions.inputErrorClass;
        this._errorClassActive = validationOptions.errorClassActive;
        this._submitButtonSelector = validationOptions.submitButtonSelector;
        this._formElement = formElement;
    }
    
    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
          return !inputElement.validity.valid;
        })
    };

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
          buttonElement.classList.add(this._inactiveButtonClass);
          buttonElement.setAttribute("disabled", "true");
        } else {
          buttonElement.classList.remove(this._inactiveButtonClass);
          buttonElement.removeAttribute("disabled");
        }
    }; 

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClassActive);
    };

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClassActive);
        errorElement.textContent = '';
    };
    _setEventListeners(inputList, buttonElement) {
        this._toggleButtonState(inputList, buttonElement)
        inputList.forEach((inputElement) => {
            const _this = this
            inputElement.addEventListener('input', function() {
                _this._checkInputValidity(inputElement);
                _this._toggleButtonState(inputList, buttonElement);
            });
        });
    }
    enableValidation(){        
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._setEventListeners(inputList, buttonElement)

        return this._formElement
    }
}

export default FormValidator