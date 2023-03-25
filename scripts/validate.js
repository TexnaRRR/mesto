const showInputError = (validationConst, popupForm, formInput, errorMessage) => {
  const formError = popupForm.querySelector(`.${formInput.id}-error`);
  formInput.classList.add(validationConst.inputErrorClass);
  formError.classList.add(validationConst.errorClass);
  formError.textContent = errorMessage;
};

const hideInputError = (validationConst, popupForm, formInput) => {
  const formError = popupForm.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove(validationConst.inputErrorClass);
  formError.classList.remove(validationConst.errorClass);
  formError.textContent = '';
};

const isValid = (validationConst, popupForm, formInput) => {
  if (!formInput.validity.valid) {
    showInputError(validationConst, popupForm, formInput, formInput.validationMessage);
  } else {
    hideInputError(validationConst, popupForm, formInput);
  }
};

const setEventListeners = (validationConst, popupForm) => {
  const inputList = Array.from(popupForm.querySelectorAll(validationConst.inputSelector));
  const buttonElement = popupForm.querySelector(validationConst.submitButtonSelector);
  inputList.forEach((formInput) => {
    formInput.addEventListener('input', () => {
      isValid(validationConst, popupForm, formInput);
      toggleButtonState(validationConst, inputList, buttonElement);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((popupForm) => {
    return !popupForm.validity.valid;
  });
};

const toggleButtonState = (validationConst, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationConst.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationConst.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const enableValidation = (validationConst) => {
  const formList = Array.from(document.querySelectorAll(validationConst.formSelector));
  formList.forEach((popupForm) => {
    setEventListeners(validationConst, popupForm);
  })
};

function resetErrorInput(validationConst, popup) {
  const form = popup.querySelector(validationConst.formSelector);
  const inputs = Array.from(form.querySelectorAll(validationConst.inputSelector));
  inputs.forEach((input) => {
    input.classList.remove(validationConst.inputErrorClass);
  });
};

function resetErrorMessage(validationConst, popup) {
  const form = popup.querySelector(validationConst.formSelector);
  const formErrors = Array.from(form.querySelectorAll('.popup__input-error'));
  formErrors.forEach((error) => {
    error.classList.remove(validationConst.errorClass);
    error.textContent = '';
  });
};

function resetValidationErrors (validationConst, popup) {
  resetErrorInput(validationConst, popup);
  resetErrorMessage(validationConst, popup)
};
