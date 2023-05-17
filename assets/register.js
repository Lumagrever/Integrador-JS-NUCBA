// declaracion de variables

const form = document.getElementById('form');
const nameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passInput = document.getElementById('password');
const phoneInput = document.getElementById('phone');


// Se evalua el Username
const checkUsername = () => {
    let valid = false;
    const min = 3;
    const max = 25;
    const username = nameInput.value.trim();

    if(isEmpty(username)){
        showError(nameInput, 'El username es obligatorio')
    } else if(!isBetween(username.length, min, max)) {
        showError(nameInput, `El username debe tener entre ${min} y ${max}`);
    } else {
        showSuccess(nameInput)
        valid = true;
    }
    return valid;
} 

// Se evalua el Email
const checkEmail = () => {
    let valid = false;
    const emailValue = emailInput.value.trim();
    if(isEmpty(emailValue)){
        showError(emailInput, 'El email es obligatorio');
    } else if(!isEmailValid(emailValue)){
        showError(emailInput, 'El email no es valido');
    } else {
        showSuccess(emailInput);
        valid = true;
    }
    return valid
}

// Se evalua la contraseña
const checkPassword = () => {
    let valid = false;
    const password = passInput.value.trim();
    if(isEmpty(password)){
        showError(passInput, 'La contraseña es obligatoria')
    } else if(!isPassValid(password)){
        showError(passInput, 'La contraseña debe tener entre 8 y 16 caracteres, al menos un numero, al menos una minúscula y al menos una mayúscula.')
    } else {
        showSuccess(passInput);
        valid = true;
    }
    return valid;
}

// Se evalua el telefono
const checkPhone = () => {
    let valid = false;
    const phoneValue = phoneInput.value.trim();
    if(!isPhoneValid(phoneValue)) {
        showError(phoneInput, 'El telefono ingresado debe tener 10 digitos')
    } else {
        showSuccess(phoneInput);
        valid = true;
    }
    return valid;
};

const isPhoneValid = (phone) => {
    const re = /^[0-9]{10}$/;
    return re.test(phone);
};

const isEmailValid = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
};

const isPassValid = (pass) => {
    const re = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
    return re.test(pass);
};

const isEmpty = (value) => value === '';

const isBetween = (length, min, max) => length < min || length > max ? false : true;

//Mensaje de errores
const showError = (input, message) => {
    const formField = input.parentElement;
    formField.classList.remove('success')
    formField.classList.add('error')
    const error = formField.querySelector("small");
    error.textContent = message;
}

const showSuccess = (input) => {
    const formField = input.parentElement;
    formField.classList.remove('error')
    formField.classList.add('success')
    const error = formField.querySelector("small");
    error.textContent = '';
}

const isValidForm = () => {
    const isUsernameValid = checkUsername()
    const isEmailValid = checkEmail()
    const isPasswordValid = checkPassword()
    const isPhoneValid = checkPhone()

    return (isUsernameValid && isEmailValid && isPasswordValid && isPhoneValid);
}

//METODO ALTERNATIVO

/*

form.addEventListener('submit', (e) =>{
    e.preventDefault();
// valido cada campo
    const isUsernameValid = checkUsername()
    const isEmailValid = checkEmail()
    const isPasswordValid = checkPassword()
    const isPhoneValid = checkPhone()
//valido el form
    const isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isPhoneValid;
    if(isFormValid) {
        form.submit();
    }
});
*/

const debounce = (fn, delay = 1000) => {
    let timeoutId;
    return (...args) => {
        // Aqui se cancela el timer anterior
        if(timeoutId) clearTimeout(timeoutId);

        // Aqui seteamos un nuevo timer
        timeoutId = setTimeout(() => {
            fn.apply(null,args);
        }, delay)
    };
};

form.addEventListener(
    "input",
    debounce((e) => {
        switch (e.target.id){
            case 'username':
                checkUsername();
                break;
            case 'email':
                checkEmail();
                break;
            case 'password':
                checkPassword();
                break;
            case 'phone':
                checkPhone();
                break
        }
    })
);

// FUNCION QUE MANEJA EL EVENTO SUBMIT
const submitForm = (e) => {
    e.preventDefault();
    if (isValidForm()) {
        alert("¡Tu cuenta ha sido creada correctamente!");
        form.reset();
    }
};

const init = () => {
    form.addEventListener("submit", submitForm);
};

init();