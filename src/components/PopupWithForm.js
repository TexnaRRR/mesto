import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._submit = this._popup.querySelector('.popup__button-submit');
      }

      _getInputValues() {
        const formValues = {};
        this._inputList.forEach(input => {
          formValues[input.name] = input.value;
        });
        return formValues;
      }

      setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
           evt.preventDefault();
          this._handleFormSubmit(this._getInputValues());
          this.close();
        })
      }

      close() {
        super.close();
        this._form.reset();
      }

      loading(isLoading) {
        if (isLoading) {
          this._submit.textContent = 'Сохранение...';
          this._submit.disabled = true;
        } else {
          this._submit.textContent = 'Сохранить';
          this._submit.disabled = false;
        }
      }
}