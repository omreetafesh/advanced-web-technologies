const html = document.documentElement;
const registerForm = document.getElementById('registerForm');
const registerMessage = document.getElementById('registerMessage');

registerForm.addEventListener('submit', async (event) => {
  event.preventDefault();

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

  try {
    // find() and add() come from users.js and work against db.json
    if (find(username) || find(email)) {
      registerMessage.textContent = "Username or email already exists.";
      registerMessage.classList.remove("text-green-500");
      registerMessage.classList.add("text-red-500");
      return;
    }

    // The first user to register is admin, all the rest are regular users
    const isAdmin = users.length === 0;

    add(username, email, password, dob, isAdmin);

    registerMessage.textContent = "Registration successful! Save the downloaded db.json into the src folder.";
    registerMessage.classList.remove("text-red-500");
    registerMessage.classList.add("text-green-500");
    registerForm.reset();
  } catch (error) {
    registerMessage.textContent = "An error occurred during registration.";
    registerMessage.classList.remove("text-green-500");
    registerMessage.classList.add("text-red-500");
  }
});
