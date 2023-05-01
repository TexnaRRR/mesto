export const initialCards = [
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
  
  export const popupOverlays = document.querySelectorAll('.popup');
  
  export const formAdd = document.querySelector('.popup__form_add');
  export const addButton = document.querySelector('.profile__add-button');
  export const editButton = document.querySelector('.profile__button');
  export const popupAdd = document.querySelector('.popup_add');
  
  
  export const titleInput = formAdd.querySelector('.popup__input_type_title');
  export const linkInput = formAdd.querySelector('.popup__input_type_link');
  
  export const cardsContainer = document.querySelector('.elements');
  export const popupProfileEdit = document.querySelector('.popup_profile-edit');
  export const profileForm = document.querySelector('.popup__form-profile-edit');
  export const nameProfyleInput = profileForm.querySelector('.popup__input_type_name');
  export const jobProfyleInput = profileForm.querySelector('.popup__input_type_job');
  export const profileName = document.querySelector('.profile__name');
  export const profileJob = document.querySelector('.profile__job');
  export const closeButtons = document.querySelectorAll('.popup__button-close');
  
  export const popupImage = document.querySelector('.popup-image');
  export const popupFullImage = popupImage.querySelector('.popup-image__full-image');
  export const titleImage = popupImage.querySelector('.popup-image__title');
  
  
  export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button-submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  };

  