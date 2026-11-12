import "./style.css";

// Shared navbar - shows Login/Register for guests, or the user's name + Logout when logged in
const navbar = document.getElementById("navbar");

if (navbar) {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const linkClass = "rounded-lg px-3 py-2 text-sm font-medium text-gray-200 hover:bg-gray-700 hover:text-white";

  let links = `<a href="/index.html" class="${linkClass}">Home</a>`;
  if (loggedInUser) {
    if (loggedInUser.role === "admin") {
      links += `<a href="/src/userManagement.html" class="${linkClass}">User Management</a>`;
    }
    links += `<button id="logoutBtn" class="${linkClass}">Logout</button>`;
  } else {
    links += `<a href="/src/login.html" class="${linkClass}">Login</a>
              <a href="/src/register.html" class="${linkClass}">Register</a>`;
  }

  navbar.innerHTML = `
    <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
      <a href="/index.html" class="text-lg font-bold text-white">Tirgul 2</a>
      <div class="flex gap-1">${links}</div>
    </div>`;

  document.getElementById("logoutBtn")?.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "/src/login.html";
  });
}
