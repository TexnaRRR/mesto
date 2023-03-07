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

const cardTemplate = document.querySelector('.element-cards').content;
const cardsElement = document.querySelector('.elements');
const formAdd = document.querySelector('.popup__form_add');
const addButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_add');
const closeAddForm = document.querySelector('.popup__button-close_add');
const titleInput = formAdd.querySelector('.popup__input_type_title');
const linkInput = formAdd.querySelector('.popup__input_type_link');
const OpenEditButton = document.querySelector('.profile__button');
const popupProfileEdit = document.querySelector('.popup_profile-edit');
const formElement = document.querySelector('.popup__form-profile-edit');
const nameProfyleInput = formElement.querySelector('.popup__input_type_name');
const jobProfyleInput = formElement.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const closeButtons = document.querySelectorAll('.popup__button-close');
const closePopupImage = document.querySelector('.popup-image__button-close');
const popupImage = document.querySelector('.popup-image');
const popupFullImage = popupImage.querySelector('.popup-image__full-image');
const titleImage = popupImage.querySelector('.popup-image__title');


closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => {
    closePopup(popup);
  })
});

function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameProfyleInput.value;
  profileJob.textContent = jobProfyleInput.value;
  closePopup(popupProfileEdit);
}

const createCard = (item) => {
  const cardTemplateClone = cardTemplate.cloneNode(true);
  const cardImage = cardTemplateClone.querySelector('.element__image');
  cardTemplateClone.querySelector('.element__name').textContent = item.name;
  cardTemplateClone.querySelector('.element__image').src = item.link;
  cardTemplateClone.querySelector('.element__image').alt = item.name;
  cardTemplateClone.querySelector('.element__button-like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__button-like_active');
  });

  const ElementCard = cardTemplateClone.querySelector('.element');
  cardTemplateClone.querySelector('.element__del').addEventListener('click', () => {
    ElementCard.remove();
  });

  cardImage.addEventListener('click', () => {
    const cardNameElement = ElementCard.querySelector('.element__name').textContent;
    popupFullImage.src = cardImage.src;
    popupFullImage.alt = cardNameElement;
    titleImage.textContent = cardNameElement;

    openPopup(popupImage);
  });

  return cardTemplateClone;
};

formAdd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const cardLinkTitle = {
    name: titleInput.value,
    link: linkInput.value
  };
  cardsElement.prepend(createCard(cardLinkTitle));

  closePopup(popupAdd);
  evt.target.reset();
});
OpenEditButton.addEventListener('click', () => {
  nameProfyleInput.value = profileName.textContent;
  jobProfyleInput.value = profileJob.textContent;
  openPopup(popupProfileEdit);
});
formElement.addEventListener('submit', handleEditProfileFormSubmit);
addButton.addEventListener('click', () => {
  openPopup(popupAdd);
});

initialCards.forEach(function(element) {
  createCard(element);
  cardsElement.append(createCard(element));
});