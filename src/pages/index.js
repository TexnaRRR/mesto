import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupConfirm from '../components/PopupConfirm.js';
import './index.css';
import { validationConfig, formAdd, addButton, editButton, profileForm, nameProfyleInput, jobProfyleInput, updateAvatarButton, popupUpdateAvatar } from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: 'bb829a07-da39-4077-b524-9d1f07ed9775',
    'Content-Type': 'application/json'
  }
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
      id: userData._id
    });
    section.renderItems(initialCards);
  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err);
  });

  function createCard(data, templateSelector) {
  const card = new Card(
    userInfo.id,
    data,
    templateSelector,
    () => popupWithImage.open(data),
    (card) => {
      popupConfirmDelete.open();
      popupConfirmDelete.setHandleDelete(() => {
        popupConfirmDelete.loading(true);
        api.deleteUserCard(card.getCardId())
          .then(() => {
            console.log(card);
            card.deleteCard();
            popupConfirmDelete.close();
          })
          .catch((err) => {
            console.log('Ошибка. Запрос не выполнен: ', err);
          })
          .finally(() => {
            popupConfirmDelete.loading(false);
          })
      })
    },
    (card) => {
      api.putLike(card.getCardId())
        .then((res) => {
          card.toggleLike(res);
        })
        .catch((err) => {
          console.log('Ошибка. Запрос не выполнен: ', err);
        })
    },
    (card) => {
      api.deleteLike(card.getCardId())
        .then((res) => {
          card.toggleLike(res);
        })
        .catch((err) => {
          console.log('Ошибка. Запрос не выполнен: ', err);
        })
    })
  return card.generateCard();
}

const userInfo = new UserInfo({
  name: '.profile__name',
  about: '.profile__job',
  avatar: '.profile__avatar'
});

const section = new Section({
  renderer: (data) => {
    section.addItem(createCard(data, '.element-cards '));
  }
},
  '.elements');

const popupWithImage = new PopupWithImage('.popup-image');

const formValidatorProfileEdit = new FormValidator(validationConfig, profileForm);
formValidatorProfileEdit.enableValidation();

const formValidatorAddForm = new FormValidator(validationConfig, formAdd);
formValidatorAddForm.enableValidation();

const formValidatorUpdateAvatar = new FormValidator(validationConfig, popupUpdateAvatar);
formValidatorUpdateAvatar.enableValidation();


  const formPopupAdd = new PopupWithForm({
    popupSelector: '.popup_add',
    handleFormSubmit: ({ title, link }) => {
      formPopupAdd.loading(true);
      // console.log ({ title, link });
      api.addNewCard({ title, link })
        .then((data) => {
          section.addNewItem(createCard(data, '.element-cards'));
          formPopupAdd.close();
        })
        .catch((err) => {
          console.log('Ошибка. Запрос не выполнен: ', err);
        })
        .finally(() => {
          formPopupAdd.loading(false);
        });
    }
  });

  const formPopupProfileEdit = new PopupWithForm({
    popupSelector: '.popup_profile-edit',
    handleFormSubmit: ({ name, job }) => {
      formPopupProfileEdit.loading(true);
      api.setUserInfo({ name, job })
        .then((data) => {
          userInfo.setUserInfo({ name: data.name, about: data.about, avatar: data.avatar });
          formPopupProfileEdit.close();
        })
        .catch((err) => {
          console.log('Ошибка. Запрос не выполнен: ', err);
        })
        .finally(() => {
          formPopupProfileEdit.loading(false);
        });
    }
  });
  
  const updateAvatar = new PopupWithForm({
    popupSelector: '.popup_update-avatar',
    handleFormSubmit: ({ avatar }) => {
      updateAvatar.loading(true);
      api.updateUserAvatar({ avatar })
        .then((data) => {
          userInfo.setUserInfo({ name: data.name, about: data.about, avatar: data.avatar });
          updateAvatar.close();
        })
        .catch((err) => {
          console.log('Ошибка. Запрос не выполнен: ', err);
        })
        .finally(() => {
          updateAvatar.loading(false);
        });
    }
  });


const popupConfirmDelete = new PopupConfirm('.popup_confirm')

popupConfirmDelete.setEventListeners();
updateAvatar.setEventListeners();
popupWithImage.setEventListeners();
formPopupAdd.setEventListeners();
formPopupProfileEdit.setEventListeners();

function openPopupEditProfile() {
  formPopupProfileEdit.open();
  const { name, about } = userInfo.getUserInfo();
  nameProfyleInput.value = name;
  jobProfyleInput.value = about;
  formValidatorProfileEdit.resetValidationErrors();
  formValidatorProfileEdit.toggleButtonState();
}

function openPopupAdd() {
  formPopupAdd.open();
  formValidatorAddForm.resetValidationErrors();
  formValidatorAddForm.toggleButtonState();
}

function openPopupUpdateAvatar() {
  updateAvatar.open();
  formValidatorUpdateAvatar.resetValidationErrors();
  formValidatorUpdateAvatar.toggleButtonState();
}

// function handleCardClick (title, image) {
//   popupFullImage.src = image
//   popupFullImage.alt = title
//   titleImage.textContent = title
//   popupWithImage.open(title, image);
// }


// formAdd.addEventListener('submit', (evt) => {
//   saveNewCard(evt);
//   closePopup(popupAdd);
// });


editButton.addEventListener('click', () => openPopupEditProfile());
addButton.addEventListener('click', () => openPopupAdd());
updateAvatarButton.addEventListener('click', openPopupUpdateAvatar);
