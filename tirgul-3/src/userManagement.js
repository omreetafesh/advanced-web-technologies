const html = document.documentElement;
const userName = document.getElementById('userName');

window.onload = function () {
    // load the details of the logged-in user
    let user = JSON.parse(localStorage.getItem('currentUser'))

    // only a logged-in admin may view this page
    if (!user) {
        window.location.href = '/src/login.html';
        return;
    }
    if (!user.isAdmin) {
        window.location.href = '/index.html';
        return;
    }

    // update the title to show the logged-in username
    userName.innerHTML = "Welcome " + user.username

    // send a request to get the data from the file
    fetch('db.json')
        .then(response => response.json()) // save the response object
        .then(jsonData => { // save the file data
            users = jsonData.users // keep the users in users.js so updateData() can save them
            // send to the function that loads the table
            populateTable('usersData', jsonData);
        });
};

function populateTable(tableId, jsonData) {
    // variables for the table's tags
    const table = document.getElementById(tableId);
    const thead = table.querySelector('thead tr');
    const tbody = table.querySelector('tbody');
    // reset the content of the table
    thead.innerHTML = '';
    tbody.innerHTML = '';
    // if there are users in the file
    if (jsonData.users.length > 0) {
        // take all the keys from the file
        const headers = Object.keys(jsonData.users[0]);
        // for every key
        headers.forEach(header => {
            if (header != "password") { // if it is not the password
                // create a header cell for the key
                const th = document.createElement('th');
                th.textContent = header;
                th.classList.add('px-4', 'py-2', 'text-left');
                // add it to the table's header row
                thead.appendChild(th);
            }
        });
        // for every object in the array
        jsonData.users.forEach((item, index) => {
            // create a row in the table
            const tr = document.createElement('tr');
            // for every key that is not the password
            headers.forEach(header => {
                if (header != "password") {
                    // create a cell with content
                    const td = document.createElement('td');
                    td.textContent = item[header];
                    td.classList.add('border', 'px-4', 'py-2');
                    // remember which user and field the cell belongs to, for saving
                    td.dataset.index = index;
                    td.dataset.key = header;
                    // add a listener to the cell so it can be edited
                    td.addEventListener("dblclick", () => editable.edit(td))
                    // add the cell to the row
                    tr.appendChild(td);
                }
            });
            // add the row to the table body
            tbody.appendChild(tr);
        });
    }
    // if there are no users in the file
    else {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.textContent = "No data found in JSON.";
        td.classList.add('px-4', 'py-2');
        tr.appendChild(td);
        tbody.appendChild(tr);
    }
}

// Save an edited cell into the users array and update the file
function saveCell(cell) {
    const user = users[cell.dataset.index];
    const key = cell.dataset.key;
    let value = cell.textContent.trim();

    // keep isAdmin as a boolean in the file
    if (key === "isAdmin") {
        value = value.toLowerCase() === "true";
        cell.textContent = value;
    }

    user[key] = value;
    updateData();
}

let editable = {
    ccell: null, // the cell
    cval: null, // the cell's content
    edit: cell => { // on double click
        editable.ccell = cell; // save the clicked cell
        editable.cval = cell.innerHTML; // save the clicked cell's content
        cell.classList.add("edit"); // show the cell is being edited
        cell.contentEditable = true; // put the cell in edit mode
        cell.focus();
        cell.onblur = editable.done; // clicking outside the cell finishes editing
        cell.onkeydown = e => { // Enter or Escape finishes editing
            if (e.key == "Enter") { e.preventDefault(); editable.done(); }
            if (e.key == "Escape") { editable.done(1); }
        }
    },
    done: discard => { // finish editing
        // release the listeners
        editable.ccell.onblur = "";
        editable.ccell.onkeydown = "";
        // remove the edit visualization
        editable.ccell.classList.remove("edit");
        // the cell is no longer in edit mode
        editable.ccell.contentEditable = false;
        if (discard === 1) { // if escape
            editable.ccell.innerHTML = editable.cval; // restore the previous value
        }
        // if the value changed, update the file
        if (editable.ccell.innerHTML != editable.cval) {
            console.log("change");
            saveCell(editable.ccell);
        }
    }
}
