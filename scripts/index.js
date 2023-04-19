import Card from './Card.js';
import FormValidator from './FormValidator.js';

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

const popupOverlays = document.querySelectorAll('.popup');

const formAdd = document.querySelector('.popup__form_add');
const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__button');
const popupAdd = document.querySelector('.popup_add');


const titleInput = formAdd.querySelector('.popup__input_type_title');
const linkInput = formAdd.querySelector('.popup__input_type_link');

const cardsContainer = document.querySelector('.elements');
const popupProfileEdit = document.querySelector('.popup_profile-edit');
const profileForm = document.querySelector('.popup__form-profile-edit');
const nameProfyleInput = profileForm.querySelector('.popup__input_type_name');
const jobProfyleInput = profileForm.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const closeButtons = document.querySelectorAll('.popup__button-close');

export const popupImage = document.querySelector('.popup-image');
export const popupFullImage = popupImage.querySelector('.popup-image__full-image');
export const titleImage = popupImage.querySelector('.popup-image__title');


const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const formValidatorProfileEdit = new FormValidator(validationConfig, profileForm);
formValidatorProfileEdit.enableValidation();


const formValidatorAddForm = new FormValidator(validationConfig, formAdd);
formValidatorAddForm.enableValidation();

initialCards.forEach((element) => {
  const card = createCard(element.name, element.link, handleCardClick);
  cardsContainer.append(card);
});


closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => {
    closePopup(popup);
  })
});

popupOverlays.forEach((popup) => {
  popup.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
      closePopup(popup);
    }
  })
});

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener("keydown", closePopupEsc);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
};

function closePopupEsc(event) {
  if (event.key === 'Escape') {
    const openPopuped = document.querySelector('.popup_opened');
    closePopup(openPopuped);
  }
};


function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameProfyleInput.value;
  profileJob.textContent = jobProfyleInput.value;
  closePopup(popupProfileEdit);
}

function saveNewCard(evt) {
  evt.preventDefault();
  const newCard = createCard(titleInput.value, linkInput.value, handleCardClick);
  cardsContainer.prepend(newCard);
  evt.target.reset();
}

function saveProfile() {
  nameProfyleInput.value = profileName.textContent;
  jobProfyleInput.value = profileJob.textContent;
}

function openPopupEditProfile() {
  saveProfile();
  openPopup(popupProfileEdit);
  formValidatorProfileEdit.resetValidationErrors();
  formValidatorProfileEdit.toggleButtonState();
}

function openPopupAdd() {
  openPopup(popupAdd);
  formAdd.reset();
  formValidatorAddForm.resetValidationErrors();
  formValidatorAddForm.toggleButtonState();
}

function handleCardClick (title, image) {
  popupFullImage.src = image
  popupFullImage.alt = title
  titleImage.textContent = title
  openPopup(popupImage)
}

function createCard(title, image, handleCardClick) {
  const card = new Card(title, image, handleCardClick);
  return card.generateCard();
}

formAdd.addEventListener('submit', (evt) => {
  saveNewCard(evt);
  closePopup(popupAdd);
});
profileForm.addEventListener('submit', handleEditProfileFormSubmit);
editButton.addEventListener('click', () => openPopupEditProfile());
addButton.addEventListener('click', () => openPopupAdd());
