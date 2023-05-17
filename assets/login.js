const form = document.getElementById('form');
const nameInput = document.getElementById('username');
const passInput = document.getElementById('password');

const isEmpty = (value) => value === '';

const isBetween = (length, min, max) => length < min || length > max ? false : true;

// Se evalua el Username
const checkUsername = () => {
    let valid = false;
    const min = 8;
    const max = 25;
    const username = nameInput.value.trim();

    if(isEmpty(username)){
        showError(nameInput, 'El username es obligatorio')
    } else if(!isBetween(username.length, min, max)) {
        showError(nameInput, `El username debe tener entre ${min} y ${max} carácteres`);
    } else {
        showSuccess(nameInput)
        valid = true;
    }
    return valid;
} 

// Se evalua la contraseña
const checkPassword = () => {
    let valid = false;
    const password = passInput.value.trim();
    if(isEmpty(password)){
        showError(passInput, 'La contraseña es obligatoria')
    } else if(!isPassValid(password)){
        showError(passInput, 'La contraseña debe tener entre 8 y 16 caracteres, al menos un numero, una minúscula y una mayúscula.')
    } else {
        showSuccess(passInput);
        valid = true;
    }
    return valid;
}

const isPassValid = (pass) => {
    const re = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
    return re.test(pass);
};

// Mensaje de errores
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

// Funcion para validar el FORM

const isValidForm = () => {
    const isUsernameValid = checkUsername()
    const isPasswordValid = checkPassword()

    return (isUsernameValid && isPasswordValid);
}

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
            case 'password':
                checkPassword();
                break;
        }
    })
);

// Funcion que maneja el evento SUBMIT
const submitForm = (e) => {
    e.preventDefault();
    if (isValidForm()) {
        alert("¡Has iniciado sesión!");
        form.reset();
    }
};

const init = () => {
    form.addEventListener("submit", submitForm);
};

init();


