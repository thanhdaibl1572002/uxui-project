import { validateEmpty, validateEmail, showNotify } from "../js/utils.js";
import { getLanguageData } from "../js/utils.js";

const renderSignIn = async () => {
    const languageData = await getLanguageData();
    const signin = document.getElementById("sign-in")
    signin.innerHTML = `
    <div id="close-sign-in"><i class="fa-solid fa-rectangle-xmark"></i></div>
    <form class="sign-in-form">
        <div class="sign-in-form-content">
            <div class="logo">
                <img src="../resources/images/logo.png" alt="uxui-logo">
                <span>UXUI</span>SHOP
            </div>
            <div class="title">
                <h2>${languageData.signin.title}</h2>
                <span>${languageData.signin.subtitle}</span>
            </div>
            <div class="form">
                <div class="form-item">
                    <label for="sign-in-email"><i class="fa-solid fa-envelope"></i>${languageData.signin.form.email.title}</label>
                    <input type="email" id="sign-in-email" placeholder="${languageData.signin.form.email.placeholder}"/>
                    <ul class="error">
                        <li>${languageData.signin.form.email.error.empty}</li>
                        <li>${languageData.signin.form.email.error.accept}</li>
                    </ul>
                </div>
                <div class="form-item">
                    <label for="sign-in-password"><i class="fa-solid fa-key"></i>${languageData.signin.form.password.title}</label>
                    <input type="password" id="sign-in-password" placeholder="${languageData.signin.form.password.placeholder}"/>
                    <ul class="error">
                        <li>${languageData.signin.form.password.error.empty}</li>
                    </ul>
                    <div class="show-hide-password">
                        <div class="show"><i class="fa-regular fa-eye-slash"></i></div>
                        <div class="hide"><i class="fa-regular fa-eye"></i></div> 
                    </div>
                </div>
            </div>
            <div class="remember-and-forgot">
                <div class="remember">
                    <input type="checkbox" id="remember-account"/>
                    <label for="remember-account">${languageData.signin.remember}</label>
                </div>
                <a href="./home.html" class="forgot-password">${languageData.signin.forgotpassword}</a>
            </div>
            <button id="sign-in-button-form">${languageData.signin.button}</button>
            <div class="do-not-have-an-account">
                ${languageData.signin.donothaveanaccount.text} <span>${languageData.signin.donothaveanaccount.span}</span>
            </div>
            <div class="line-other-sign-in-methods">
                <span>${languageData.signin.linesigninmethods}</span>
            </div>
            <div class="other-sign-in-methods">
                <div class="google other-sign-in-methods-item">
                    <img src="../resources/images/logo-google.png" alt=""> ${languageData.signin.signinmethods.google}
                </div>
                <div class="facebook other-sign-in-methods-item">
                    <img src="../resources/images/logo-facebook.png" alt=""> ${languageData.signin.signinmethods.facebook}
                </div>
                <div class="appleid other-sign-in-methods-item">
                    <img src="../resources/images/logo-appleid.png" alt=""> ${languageData.signin.signinmethods.appleid}
                </div>
                <div class="wechat other-sign-in-methods-item">
                    <img src="../resources/images/logo-wechat.png" alt=""> ${languageData.signin.signinmethods.wechat}
                </div>
            </div>
        </div>
    </form>
    `

    const emailInput = document.querySelector('#sign-in-email');
    const passwordInput = document.querySelector('#sign-in-password');
    const showPasswordBtn = document.querySelector("#sign-in .show-hide-password .show");
    const hidePasswordBtn = document.querySelector("#sign-in .show-hide-password .hide");
    const signInButton = document.getElementById("sign-in-button-form");

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

    emailInput.addEventListener("blur", () => {
        setInputValidationStatus(emailInput, validateEmail(emailInput.value.trim()));
    });
    emailInput.addEventListener("keyup", () => {
        setInputValidationStatus(emailInput, validateEmail(emailInput.value.trim()));
    });

    passwordInput.addEventListener("blur", () => {
        setInputValidationStatus(passwordInput, validateEmpty(passwordInput.value.trim()));
    });
    passwordInput.addEventListener("keyup", () => {
        setInputValidationStatus(passwordInput, validateEmpty(passwordInput.value.trim()));
    });

    const backgroundNotify = "linear-gradient(to right, #ff416c 0%, #ff4b2b 100%)";
    signInButton.addEventListener("click", (event) => {
        event.preventDefault();
        let isValid = true;
        setInputValidationStatus(emailInput, validateEmail(emailInput.value.trim()));
        setInputValidationStatus(passwordInput, validateEmpty(passwordInput.value.trim()));
        if (!validateEmail(emailInput.value.trim()) || !validateEmpty(passwordInput.value.trim())) {
            isValid = false
        }
        if (isValid) {
            const listUser = JSON.parse(localStorage.getItem("listUser")) || [];
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();
            const user = listUser.find(item => item.email === email);
            if (!user) {
                showNotify(languageData.signin.failed, "top", "center", backgroundNotify);
            } else {
                if (user.password !== password) {
                    showNotify(languageData.signin.failed, "top", "center", backgroundNotify);
                } else {
                    localStorage.setItem("user", JSON.stringify(user));
                    showNotify(languageData.signin.success + " !", "top", "center");
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

    // ===================================== Hide Sign In Form =====================================
    const closeSignIn = document.getElementById('close-sign-in');
    const signIn = document.getElementById('sign-in');
    const background = document.getElementById('background');

    closeSignIn.addEventListener("click", () => {
        signIn.classList.remove('active');
        background.classList.remove('active');
    });

    background.addEventListener("click", () => {
        signIn.classList.remove('active');
        background.classList.remove('active');
    });

    const openSignUp = document.querySelector(".do-not-have-an-account span");
    const signUp = document.getElementById('sign-up');

    openSignUp.addEventListener("click", () => {
        signIn.classList.remove('active');
        signUp.classList.add('active');
    })
}

renderSignIn()