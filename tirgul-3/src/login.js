const html = document.documentElement;
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

loginForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const usernameOrEmail = document.getElementById('userInput').value;
  const password = document.getElementById('passInput').value;

  // find() from users.js reads the users from db.json
  let user = find(usernameOrEmail)

  let nameOrEmail = 'test';
  let pass = 'password';

  if (user != undefined) {
    nameOrEmail = usernameOrEmail;
    pass = user.password;
  }

  if (usernameOrEmail === nameOrEmail && password === pass) {
    loginMessage.textContent = 'Login successful!';
    loginMessage.classList.remove('text-red-500');
    loginMessage.classList.add('text-green-500');

    // Save the logged-in user's details in local storage (without the password)
    localStorage.setItem('currentUser', JSON.stringify({
      username: user.username,
      email: user.email,
      dob: user.dob,
      isAdmin: user.isAdmin
    }));

    // Admin goes to the userManagement page, regular users go to the home page
    setTimeout(() => {
      window.location.href = user.isAdmin ? '/src/userManagement.html' : '/index.html';
    }, 800);
  } else {
    loginMessage.textContent = 'Invalid username/email or password.';
    loginMessage.classList.remove('text-green-500');
    loginMessage.classList.add('text-red-500');
  }
});
