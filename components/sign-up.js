import { validateName, validateEmail, validatePhoneNumber, validatePassword, validateConfirmPassword, showNotify } from "../js/utils.js";
import { getLanguageData } from "../js/utils.js";

const renderSignUp = async () => {
    const languageData = await getLanguageData();
    const signup = document.getElementById("sign-up")
    signup.innerHTML = `
    <div id="close-sign-up"><i class="fa-solid fa-rectangle-xmark"></i></div>
    <form class="sign-up-form">
        <div class="sign-up-form-content">
            <div class="logo">
                <img src="../resources/images/logo.png" alt="uxui-logo">
                <span>UXUI</span>SHOP
            </div>
            <div class="title">
                <h2>${languageData.signup.title}</h2>
                <span>${languageData.signup.subtitle}</span>
            </div>
            <div class="form">
                <div class="form-item">
                    <label for="sign-up-name"><i class="fa-solid fa-user"></i>${languageData.signup.form.name.title}</label>
                    <input type="text" id="sign-up-name" placeholder="${languageData.signup.form.name.placeholder}"/>
                    <ul class="error">
                        <li>${languageData.signup.form.name.error.empty}</li>
                        <li>${languageData.signup.form.name.error.accept}</li>
                        <li>${languageData.signup.form.name.error.length}</li>
                    </ul>
                </div>
                <div class="form-item">
                    <label for="sign-up-email"><i class="fa-solid fa-envelope"></i>${languageData.signup.form.email.title}</label>
                    <input type="email" id="sign-up-email" placeholder="${languageData.signup.form.email.placeholder}"/>
                    <ul class="error">
                        <li>${languageData.signup.form.email.error.empty}</li>
                        <li>${languageData.signup.form.email.error.accept}</li>
                        <li>${languageData.signup.form.email.error.length}</li>
                    </ul>
                </div>
                <div class="form-item">
                    <label for="sign-up-phone"><i class="fa-solid fa-phone"></i>${languageData.signup.form.phone.title}</label>
                    <input type="number" id="sign-up-phone" placeholder="${languageData.signup.form.phone.placeholder}"/>
                    <ul class="error">
                        <li>${languageData.signup.form.phone.error.empty}</li>
                        <li>${languageData.signup.form.phone.error.accept}</li>
                        <li>${languageData.signup.form.phone.error.length}</li>
                    </ul>
                    <div class="dropdown-calling-code">
                        <div class="select">
                            <span class="selected"><img src="../resources/images/icon-vietnam.png"/>${languageData.signup.form.phone.callingcode.default}</span>
                            <i class="fa-solid fa-caret-down"></i>
                        </div>
                        <ul class="list">
                            <li><img src="../resources/images/icon-vietnam.png"/>${languageData.signup.form.phone.callingcode.vietnam}</li>
                            <li><img src="../resources/images/icon-usa.png"/>${languageData.signup.form.phone.callingcode.unitedstates}</li>
                            <li><img src="../resources/images/icon-china.png"/>${languageData.signup.form.phone.callingcode.chinese}</li>
                        </ul>
                    </div>
                </div>
                <div class="form-item">
                    <label for="sign-up-password"><i class="fa-solid fa-key"></i>${languageData.signup.form.password.title}</label>
                    <input type="password" id="sign-up-password" placeholder="${languageData.signup.form.password.placeholder}"/>
                    <ul class="error">
                        <li>${languageData.signup.form.password.error.empty}</li>
                        <li>${languageData.signup.form.password.error.accept}</li>
                        <li>${languageData.signup.form.password.error.length}</li>
                    </ul>
                    <div class="show-hide-password">
                        <div class="show"><i class="fa-regular fa-eye-slash"></i></div>
                        <div class="hide"><i class="fa-regular fa-eye"></i></div> 
                    </div>
                </div>
                <div class="form-item">
                    <label for="sign-up-repassword"><i class="fa-solid fa-key"></i>${languageData.signup.form.cfpassword.title}</label>
                    <input type="password" id="sign-up-repassword" placeholder="${languageData.signup.form.cfpassword.placeholder}"/>
                    <ul class="error">
                        <li>${languageData.signup.form.cfpassword.error.empty}</li>
                        <li>${languageData.signup.form.cfpassword.error.accept}</li>
                    </ul>
                    <div class="show-hide-cfpassword">
                        <div class="show"><i class="fa-regular fa-eye-slash"></i></div>
                        <div class="hide"><i class="fa-regular fa-eye"></i></div> 
                    </div>
                </div>
            </div>
            <div class="agree-terms">
                <div class="agree">
                    <input type="checkbox" id="agree-terms-priavcy"/>
                    <label for="agree-terms-priavcy">${languageData.signup.confirmation.label} <a href="./home.html">${languageData.signup.confirmation.link}</a></label>
                </div>
            </div>
            <button id="sign-up-button-form">${languageData.signup.button}</button>
            <div class="have-an-account">
                ${languageData.signup.haveanaccount.text} <span>${languageData.signup.haveanaccount.span}</span>
            </div>
        </div>
    </form>
    `

    const nameInput = document.querySelector('#sign-up-name');
    const emailInput = document.querySelector('#sign-up-email');
    const phoneInput = document.querySelector('#sign-up-phone');
    const passwordInput = document.querySelector('#sign-up-password');
    const confirmPasswordInput = document.querySelector('#sign-up-repassword');

    const showPasswordBtn = document.querySelector("#sign-up .show-hide-password .show");
    const hidePasswordBtn = document.querySelector("#sign-up .show-hide-password .hide");

    const showCFPasswordBtn = document.querySelector("#sign-up .show-hide-cfpassword .show");
    const hideCFPasswordBtn = document.querySelector("#sign-up .show-hide-cfpassword .hide");

    const signUpButton = document.getElementById('sign-up-button-form');
    const agreeCheckbox = document.getElementById('agree-terms-priavcy');

    // ===================================== Validate Form =====================================
    const setInputValidationStatus = (inputElm, isValid) => {
        const labelElm = inputElm.previousElementSibling;
        const errorListElm = inputElm.nextElementSibling;
        if (isValid) {
            inputElm.style.border = "2px solid var(--main-color)";
            labelElm.style.color = "var(--main-color)";
            errorListElm.style.display = "none";
        } else {
            inputElm.style.border = "2px solid #ff3838";
            labelElm.style.color = "#ff3838";
            errorListElm.style.display = "flex";
        }
    };

    const inputElements = [
        { element: nameInput, validator: validateName },
        { element: emailInput, validator: validateEmail },
        { element: phoneInput, validator: validatePhoneNumber },
        { element: passwordInput, validator: validatePassword },
        { element: confirmPasswordInput, validator: (password, confirmPassword) => validateConfirmPassword(password, confirmPassword), passwordElement: passwordInput },
    ];

    inputElements.forEach(input => {
        const { element, validator, passwordElement } = input;
        element.addEventListener("blur", () => {
            if (passwordElement) {
                setInputValidationStatus(element, validator(element.value.trim(), passwordElement.value.trim()));
            } else {
                setInputValidationStatus(element, validator(element.value.trim()))
            }
        });
        element.addEventListener("keyup", () => {
            if (passwordElement) {
                setInputValidationStatus(element, validator(element.value.trim(), passwordElement.value.trim()));
            } else {
                setInputValidationStatus(element, validator(element.value.trim()))
            }
        });
    });

    // ===================================== Sign Up =====================================
    const backgroundNotify = "linear-gradient(to right, #ff416c 0%, #ff4b2b 100%)";
    signUpButton.addEventListener("click", (event) => {
        event.preventDefault();
        let isValid = true;
        inputElements.forEach(input => {
            const { element, validator, passwordElement } = input;
            if (passwordElement) {
                setInputValidationStatus(element, validator(element.value.trim(), passwordElement.value.trim()));
            } else {
                setInputValidationStatus(element, validator(element.value.trim()));
            }
            if (!validator(element.value.trim(), passwordElement?.value?.trim())) {
                isValid = false;
            }
        });

        if (isValid) {
            if (!agreeCheckbox.checked) {
                showNotify(languageData.signup.erroragree, "top", "center", backgroundNotify);
            } else {
                const name = nameInput.value.trim();
                const email = emailInput.value.trim();
                const phone = phoneInput.value.trim();
                const password = passwordInput.value.trim();
                const user = {
                    name: name,
                    email: email,
                    phone: phone,
                    password: password
                };
                let listUser = JSON.parse(localStorage.getItem("listUser")) || [];
                const isEmailExist = listUser.some(item => item.email === email);
                const isPhoneExist = listUser.some(item => item.phone === phone);
                if (isEmailExist) {
                    showNotify(languageData.signup.erroremail, "top", "center", backgroundNotify);
                } else if (isPhoneExist) {
                    showNotify(languageData.signup.errorphone, "top", "center", backgroundNotify);
                } else {
                    listUser.push(user);
                    localStorage.setItem('user', JSON.stringify(user));
                    localStorage.setItem('listUser', JSON.stringify(listUser));
                    showNotify(languageData.signup.success + " !", "top", "center");
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            }
        }
    });

    // ===================================== Show/Hide Password =====================================
    showPasswordBtn.addEventListener("click", () => {
        passwordInput.type = "text";
        showPasswordBtn.style.display = "none";
        hidePasswordBtn.style.display = "flex";
    });

    hidePasswordBtn.addEventListener("click", () => {
        passwordInput.type = "password";
        showPasswordBtn.style.display = "flex";
        hidePasswordBtn.style.display = "none";
    });

    showCFPasswordBtn.addEventListener("click", () => {
        confirmPasswordInput.type = "text";
        showCFPasswordBtn.style.display = "none";
        hideCFPasswordBtn.style.display = "flex";
    });

    hideCFPasswordBtn.addEventListener("click", () => {
        confirmPasswordInput.type = "password";
        showCFPasswordBtn.style.display = "flex";
        hideCFPasswordBtn.style.display = "none";
    });

    // ===================================== Select Calling Code =====================================
    const selectCallingCode = document.querySelector('.dropdown-calling-code .select');
    const selectedCallingCode = document.querySelector('.dropdown-calling-code .select .selected');
    const listCallingCode = document.querySelector('.dropdown-calling-code .list');
    const listItems = listCallingCode.querySelectorAll('li');

    selectCallingCode.addEventListener('click', () => {
        listCallingCode.classList.add('active');
    });

    document.addEventListener('click', (event) => {
        if (!selectCallingCode.contains(event.target)) {
            listCallingCode.classList.remove('active');
        }
    });

    listItems.forEach((item) => {
        const imgSrc = item.querySelector('img').getAttribute('src');
        const text = item.textContent.trim();
        item.addEventListener('click', () => {
            selectedCallingCode.innerHTML = '<img src="' + imgSrc + '"/>' + text.split(' ')[0];
        })
    })

    // ===================================== Hide Sign Up Form =====================================
    const closeSignUp = document.getElementById('close-sign-up');
    const signUp = document.getElementById('sign-up');
    const background = document.getElementById('background');

    closeSignUp.addEventListener("click", () => {
        signUp.classList.remove('active');
        background.classList.remove('active');
    });

    background.addEventListener("click", () => {
        signUp.classList.remove('active');
        background.classList.remove('active');
    });

    const openSignIn = document.querySelector(".have-an-account span");
    const signIn = document.getElementById('sign-in');

    openSignIn.addEventListener("click", () => {
        signUp.classList.remove('active');
        signIn.classList.add('active');
    })
}

renderSignUp()