const popup = document.querySelector('.popup');
const OpenEditButton = document.querySelector('.profile__button');
const closeButton = document.querySelector('.popup__button-close');
let formElement = document.querySelector('.popup__container');
let nameProfyleInput = formElement.querySelector('.popup__input_type_name');
let jobProfyleInput = formElement.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

function popupClose() {
  popup.classList.remove('popup_opened');  
}

function popupOpen() {
  popup.classList.add('popup_opened');
  nameProfyleInput.value = profileName.textContent;
  jobProfyleInput.value = profileJob.textContent;
}

  function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameProfyleInput.value;
    profileJob.textContent = jobProfyleInput.value;
    popupClose();
  }

  closeButton.addEventListener('click', popupClose);
  OpenEditButton.addEventListener('click', popupOpen);
  formElement.addEventListener('submit', handleFormSubmit);