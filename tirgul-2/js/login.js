const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  const user = getUsers().find((u) => u.username === username && u.password === password);

  if (!user) {
    loginMessage.textContent = "Wrong username or password";
    return;
  }

  // (ב) Save the logged-in user's details in localStorage (without the password)
  setLoggedInUser({ username: user.username, email: user.email, role: user.role });

  // (ד) Admin goes to the userManagement page, regular users go to the home page
  window.location.href = user.role === "admin" ? "userManagement.html" : "index.html";
});
