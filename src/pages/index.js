import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';
import { initialCards, validationConfig, formAdd, addButton, editButton, profileForm, nameProfyleInput, jobProfyleInput, popupFullImage , titleImage } from '../utils/constants.js';

const formValidatorProfileEdit = new FormValidator(validationConfig, profileForm);
formValidatorProfileEdit.enableValidation();


const formValidatorAddForm = new FormValidator(validationConfig, formAdd);
formValidatorAddForm.enableValidation();

function renderCard(item) {
  section.addItem(createCard(item.name, item.link, handleCardClick));
  }

const section = new Section({
  items: initialCards,
  renderer: (item) => {
    renderCard(item);
  }
},
  '.elements');

section.renderItems();

const popupWithImage = new PopupWithImage('.popup-image');

const formPopupAdd = new PopupWithForm({
  popupSelector: '.popup_add',
  handleFormSubmit: (item) => {
    renderCard(item);
  }
})

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job'
});

const formPopupProfileEdit = new PopupWithForm({
  popupSelector: '.popup_profile-edit',
  handleFormSubmit: (item) => {
    userInfo.setUserInfo(item.name, item.job);
  }
})

popupWithImage.setEventListeners();
formPopupAdd.setEventListeners();
formPopupProfileEdit.setEventListeners();

function openPopupEditProfile() {
  const user = userInfo.getUserInfo();
  const name = user.name;
  const job = user.job;
  formPopupProfileEdit.open();
  nameProfyleInput.value = name;
  jobProfyleInput.value = job;
  formValidatorProfileEdit.resetValidationErrors();
  formValidatorProfileEdit.toggleButtonState();
}

function openPopupAdd() {
  formPopupAdd.open();
  formValidatorAddForm.resetValidationErrors();
  formValidatorAddForm.toggleButtonState();
}

function handleCardClick (title, image) {
  popupFullImage.src = image
  popupFullImage.alt = title
  titleImage.textContent = title
  popupWithImage.open(title, image);
}

function createCard(title, image, handleCardClick) {
  const card = new Card(title, image, handleCardClick);
  return card.generateCard();
}

// formAdd.addEventListener('submit', (evt) => {
//   saveNewCard(evt);
//   closePopup(popupAdd);
// });


editButton.addEventListener('click', () => openPopupEditProfile());
addButton.addEventListener('click', () => openPopupAdd());
