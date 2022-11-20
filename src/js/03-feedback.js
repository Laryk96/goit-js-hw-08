import throttle from 'lodash.throttle';

const KEY_STORAGE = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

form.addEventListener('submit', onSubmitForm);
form.addEventListener('input', throttle(onInputForm, 500));

updateForm();

function onSubmitForm(e) {
  e.preventDefault();

  console.log(JSON.parse(localStorage.getItem(KEY_STORAGE)));

  e.currentTarget.reset();
  localStorage.removeItem(KEY_STORAGE);
}

function onInputForm(e) {
  const name = e.target.name;
  const value = e.target.value;

  let localData = localStorage.getItem(KEY_STORAGE);
  localData = localData ? JSON.parse(localData) : {};
  localData[name] = value;

  localStorage.setItem(KEY_STORAGE, JSON.stringify(localData));
}

function updateForm() {
  const userData = JSON.parse(localStorage.getItem(KEY_STORAGE));

  if (userData) {
    Object.entries(userData).forEach(([name, value]) => {
      form.elements[name].value = value;
    });
  }
}
