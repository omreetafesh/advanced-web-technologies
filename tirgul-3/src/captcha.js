document.addEventListener('DOMContentLoaded', () => {
    // form variables
    const registerForm = document.getElementById('registerForm');
    const registerMessage = document.getElementById('registerMessage');
    let isAdmin = true;

    // CAPTCHA field variables
    const arithmeticChallengeSpan = document.getElementById('arithmetic-challenge');
    const arithmeticAnswerInput = document.getElementById('arithmetic-answer');
    const refreshArithmeticCaptchaButton = document.getElementById('refresh-arithmetic-captcha');
    const arithmeticError = document.getElementById('arithmetic-error');
    const captchaAttemptsError = document.getElementById('captcha-attempts-error');
    const recaptchaError = document.getElementById('recaptcha-error');
    let arithmeticNum1, arithmeticNum2, arithmeticExpectedAnswer;
    let incorrectAttempts = 0;
    const maxIncorrectAttempts = 3;

    // Create a random arithmetic question with +, -, * or /
    function generateArithmeticCaptcha() {
        // pick 2 random numbers from 1 to 10
        arithmeticNum1 = Math.floor(Math.random() * 10) + 1;
        arithmeticNum2 = Math.floor(Math.random() * 10) + 1;
        // pick one of the four operators
        const operations = ['+', '-', '*', '/'];
        const operation = operations[Math.floor(Math.random() * operations.length)];

        if (operation === '+') {
            arithmeticExpectedAnswer = arithmeticNum1 + arithmeticNum2;
        } else if (operation === '-') {
            arithmeticExpectedAnswer = arithmeticNum1 - arithmeticNum2;
        } else if (operation === '*') {
            arithmeticExpectedAnswer = arithmeticNum1 * arithmeticNum2;
        } else {
            // division - build the question from the answer so the result is always a whole number
            arithmeticExpectedAnswer = arithmeticNum1;
            arithmeticNum1 = arithmeticNum1 * arithmeticNum2;
        }

        const symbols = { '+': '+', '-': '-', '*': '×', '/': '÷' };
        arithmeticChallengeSpan.textContent = `${arithmeticNum1} ${symbols[operation]} ${arithmeticNum2} = ?`;

        // clear the answer field and hide the error message
        arithmeticAnswerInput.value = '';
        arithmeticError.classList.add('hidden');
    }

    // show a question when the page loads
    generateArithmeticCaptcha();

    function refreshCaptcha() {
        generateArithmeticCaptcha();
    }

    refreshArithmeticCaptchaButton.addEventListener('click', refreshCaptcha);

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // stop if the user used up all the allowed attempts
        if (incorrectAttempts >= maxIncorrectAttempts) {
            captchaAttemptsError.classList.remove('hidden');
            return;
        }

        const username = document.getElementById('userInput').value;
        const email = document.getElementById('mailInput').value;
        const password = document.getElementById('passInput').value;
        const confirmPassword = document.getElementById('confirmInput').value;
        const dob = document.getElementById('dateInput').value;
        registerMessage.textContent = "";

        if (password !== confirmPassword) {
            registerMessage.textContent = "Passwords do not match.";
            registerMessage.classList.remove("text-green-500");
            registerMessage.classList.add("text-red-500");
            return;
        }

        // external CAPTCHA - the user must tick "I'm not a robot"
        if (typeof grecaptcha === 'undefined' || grecaptcha.getResponse() === '') {
            recaptchaError.classList.remove('hidden');
            return;
        }
        recaptchaError.classList.add('hidden');

        const userAnswer = parseInt(arithmeticAnswerInput.value);
        if (!isNaN(userAnswer) && userAnswer === arithmeticExpectedAnswer) {
            try {
                if (find(username) || find(email)) {
                    registerMessage.textContent = "Username or email already exists.";
                    registerMessage.classList.remove("text-green-500");
                    registerMessage.classList.add("text-red-500");
                    return;
                }
                // the first user is admin, all the rest are regular users
                if (users == undefined || users.length < 1)
                    isAdmin = true;
                else
                    isAdmin = false;

                add(username, email, password, dob, isAdmin);

                registerMessage.textContent = "Registration successful! Save the downloaded db.json into the src folder.";
                registerMessage.classList.remove("text-red-500");
                registerMessage.classList.add("text-green-500");
                document.getElementById('userInput').value = "";
                document.getElementById('mailInput').value = "";
                document.getElementById('passInput').value = "";
                document.getElementById('confirmInput').value = "";
                document.getElementById('dateInput').value = "";
            } catch (error) {
                registerMessage.textContent = "An error occurred during registration.";
                registerMessage.classList.remove("text-green-500");
                registerMessage.classList.add("text-red-500");
            }

            incorrectAttempts = 0; // reset the incorrect attempts
            refreshCaptcha(); // show a new question
            grecaptcha.reset(); // reset the external CAPTCHA
        } else {
            incorrectAttempts++;
            arithmeticError.classList.remove('hidden');
            if (incorrectAttempts >= maxIncorrectAttempts) {
                captchaAttemptsError.classList.remove('hidden');
            }
        }
    });
});
