// Shared helpers for reading/writing users in localStorage

const USERS_KEY = "users";
const LOGGED_IN_KEY = "loggedInUser";

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getLoggedInUser() {
  return JSON.parse(localStorage.getItem(LOGGED_IN_KEY));
}

function setLoggedInUser(user) {
  localStorage.setItem(LOGGED_IN_KEY, JSON.stringify(user));
}

function logout() {
  localStorage.removeItem(LOGGED_IN_KEY);
  window.location.href = "login.html";
}
