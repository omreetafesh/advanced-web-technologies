const registerForm = document.getElementById("registerForm");
const registerMessage = document.getElementById("registerMessage");

function showRegisterMessage(text, isError) {
  registerMessage.textContent = text;
  registerMessage.className = isError ? "text-sm text-red-600" : "text-sm text-green-600";
}

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!username || !email || !password) {
    showRegisterMessage("Please fill in all fields", true);
    return;
  }

  const users = getUsers();

  if (users.some((u) => u.username === username)) {
    showRegisterMessage("Username already exists", true);
    return;
  }

  // (א) The first user to register is admin, everyone after is a regular user
  const role = users.length === 0 ? "admin" : "user";

  users.push({ username, email, password, role });
  saveUsers(users);

  showRegisterMessage(`Registered successfully as ${role}! Redirecting to login...`, false);
  registerForm.reset();
  setTimeout(() => (window.location.href = "login.html"), 1200);
});
