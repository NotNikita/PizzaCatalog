//------------------------------------Navigation Bar
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.nav-menu');

menu.addEventListener('click', () => {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
})

//------------------------------------Modal

const modal = document.getElementById('email-modal');
const openBtn = document.querySelector('.main-btn');
const closeBtn = document.querySelector('.close-btn');

//Click events
openBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});


//------------------------------------Form validation
const form = document.getElementById('form');
const namee = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('password-confirm');

//Show error message
function showError(input, message) {
    const formValidation = input.parentElement;
    formValidation.className = 'form-validation error';

    const errorMessage = formValidation.querySelector('p');
    errorMessage.innerText = message;
}

//Show valid message
function showValid(input) {
    const formValidation = input.parentElement;
    formValidation.className = 'form-validation valid';
}

// Check Required fields
function checkRequired(inputArr) {
    inputArr.forEach(element => {
        if (element.value.trim() === '') {
            showError(element, `${getFieldName(element)} is required`);
        }
        else {
            showValid(element);
        }
    });
}

//Check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    }
    else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be shorter than ${max} characters`);
    }
}

//check password match
function passwordMatch(pass1, pass2) {
    if (pass1.value !== pass2.value) {
        showError(input2, 'Passwords do not match');
    }
}

//Get fieldname
function getFieldName(input) {
    return input.name.charAt(0).toUpperCase() + input.name.slice(1);
}

//Event listeners
form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkRequired([namee, email, password, passwordConfirm]);
    checkLength(nickname, 3, 30);
    checkLength(email, 8, 25);
    checkLength(password, 6, 20);
    checkLength(passwordConfirm, 6, 20);
    passwordMatch(password, passwordConfirm);
})