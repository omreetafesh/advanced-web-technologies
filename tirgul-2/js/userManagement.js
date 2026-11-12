const currentUser = getLoggedInUser();

// Only a logged-in admin may view this page
if (!currentUser) {
  window.location.href = "login.html";
} else if (currentUser.role !== "admin") {
  window.location.href = "index.html";
} else {
  // (ג) Welcome + the logged-in username
  document.getElementById("welcome").textContent = `Welcome ${currentUser.username}`;

  // (ג) Table of all registered users - password is not shown
  const tbody = document.getElementById("usersTableBody");
  getUsers().forEach((user, index) => {
    const row = document.createElement("tr");
    row.className = "border-b hover:bg-gray-50";
    row.innerHTML = `
      <td class="px-4 py-2">${index + 1}</td>
      <td class="px-4 py-2"></td>
      <td class="px-4 py-2"></td>
      <td class="px-4 py-2"><span class="rounded-full px-2 py-1 text-xs font-semibold ${
        user.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-700"
      }">${user.role}</span></td>`;
    // textContent prevents HTML injection from user-entered values
    row.children[1].textContent = user.username;
    row.children[2].textContent = user.email;
    tbody.appendChild(row);
  });
}

document.getElementById("logoutBtn").addEventListener("click", logout);
