const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

// Only a logged-in admin may view this page
if (!loggedInUser) {
  window.location.href = '/src/login.html';
} else if (loggedInUser.role !== 'admin') {
  window.location.href = '/index.html';
} else {
  // (ג) Welcome + the username of the logged-in user
  document.getElementById('welcome').textContent = `Welcome ${loggedInUser.username}`;

  // (ג) Table with the details of all existing users - without the password
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const tbody = document.getElementById('usersTableBody');

  users.forEach((user, index) => {
    const row = document.createElement('tr');
    row.className = 'border-b hover:bg-gray-50';

    [index + 1, user.username, user.email, user.dob, user.role].forEach(value => {
      const cell = document.createElement('td');
      cell.className = 'px-4 py-2';
      cell.textContent = value ?? '';
      row.appendChild(cell);
    });

    tbody.appendChild(row);
  });
}
