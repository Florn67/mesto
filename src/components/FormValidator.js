class FormValidator{
    constructor(validationOptions, formElement){
        this._formSelector = validationOptions.formSelector;
        this._inputSelector = validationOptions.inputSelector;
        this._inactiveButtonClass = validationOptions.inactiveButtonClass;
        this._inputErrorClass = validationOptions.inputErrorClass;
        this._errorClassActive = validationOptions.errorClassActive;
        this._submitButtonSelector = validationOptions.submitButtonSelector;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    }
    
    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
          return !inputElement.validity.valid;
        })
    };

    
    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
          this._buttonElement.classList.add(this._inactiveButtonClass);
          this._buttonElement.setAttribute("disabled", "true");
        } else {
          this._buttonElement.classList.remove(this._inactiveButtonClass);
          this._buttonElement.removeAttribute("disabled");
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
        this._toggleButtonState()
        this._inputList.forEach((inputElement) => {
            const _this = this
            inputElement.addEventListener('input', function() {
                _this._checkInputValidity(inputElement);
                _this._toggleButtonState();
            });
        });
    }

    enableValidation(){        
        this._setEventListeners(this._inputList, this._buttonElement)

        return this._formElement
    }

    disableSubmitButton(){
        this._buttonElement.setAttribute("disabled", "true");
        this._buttonElement.classList.add('popup__submit_inactive');
    }

    hideAllErrors(){
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement)
        });
        this._toggleButtonState(this._inputList, this._buttonElement)
    }

}

export default FormValidator