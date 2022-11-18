import throttle from 'lodash.throttle';

const KEY_STORAGE = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const LocalData = {};

form.addEventListener('submit', onSubmitForm);
form.addEventListener('input', throttle(onInputForm, 300));

updateForm();

function onSubmitForm(e) {
  e.preventDefault();

  e.currentTarget.reset();
  localStorage.removeItem(KEY_STORAGE);

  console.log(LocalData);
}

function onInputForm(e) {
  const name = e.target.name;
  const value = e.target.value;

  LocalData[name] = value;

  localStorage.setItem(KEY_STORAGE, JSON.stringify(LocalData));
}

function updateForm() {
  const formLocalStorage = JSON.parse(localStorage.getItem(KEY_STORAGE));

  if (formLocalStorage) {
    addValueToForm(formLocalStorage);
  }
}

function addValueToForm(data) {
  form.elements.email.value = data.email;
  form.elements.message.value = data.message;
}
