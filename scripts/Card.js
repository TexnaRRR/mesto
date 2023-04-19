
class Card {
  constructor(title, image, handleCardClick) {
    this._title = title;
    this._image = image;
    this._templateSelector = '.element-cards';
    this._template = '.element';
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    this._cardTemplate = document.querySelector(this._templateSelector).content;
    this._cardElement = this._cardTemplate.querySelector(this._template).cloneNode(true);
    this._trashButton = this._cardElement.querySelector('.element__del');
    this._likeButton = this._cardElement.querySelector('.element__button-like');
    this._elementTitle = this._cardElement.querySelector('.element__name');;
    this._cardImage = this._cardElement.querySelector('.element__image');
  }

  generateCard() {
    this._getTemplate();
    this._cardImage.src = this._image;
    this._cardElement.querySelector('.element__name').textContent = this._title;
    this._cardImage.alt = this._title;
    this._setEventListeners();
    return this._cardElement;

  }

  _toggleButtonLike() {
    this._likeButton.classList.toggle('element__button-like_active');
  }

  _deleteCard = () => {
    this._cardElement.remove();
    this._cardElement = null;
  }

  // _openFullImage() {
  //   popupFullImage.src = this._cardImage.src;
  //   popupFullImage.alt = this._elementTitle.textContent;
  //   titleImage.textContent = this._elementTitle.textContent;
  //   openPopup(popupImage);
  // };

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._toggleButtonLike());
    this._trashButton.addEventListener('click', this._deleteCard);
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._title, this._image)
  });
  }
}

export default Card;
