const file = "db.json"

let users = []

// Read the users from the JSON file into the users array
function initUsers() {
    let rawFile = new XMLHttpRequest(); // create a new request object
    rawFile.open("GET", file, false); // open a synchronous request for the file
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            // check the status is OK (200 - success, 0 - sometimes for a local file)
            if (rawFile.status === 200 || rawFile.status == 0) {
                let allText = rawFile.responseText; // read the text from the response
                let data = JSON.parse(allText) // convert the text to an object
                users = data.users // save the users array in the global variable
            }
        }
    }
    rawFile.send(null); // send the request
}

// Find and return a user by username or email
function find(nameOrMail) {
    if (users.length == 0) // if the array is empty
        initUsers() // initialize the array
    // return the user whose username or email matches the parameter
    return users.find(u => u.username === nameOrMail || u.email === nameOrMail);
}

// Update the data file - the browser downloads the new db.json
function updateData() {
    // convert the users array to a string with the structure defined in db.json
    let data = '{ "users": ' + JSON.stringify(users, null, 4) + '}'
    // create a binary object of the data
    const blob = new Blob([data], { type: 'application/json' });
    // create a temporary URL for the object
    const url = URL.createObjectURL(blob);
    // create a link element for downloading the file
    const a = document.createElement('a');
    a.download = file; // the name of the saved file
    a.href = url; // attach the object's URL to the element
    a.click(); // simulate a click to start the download
    URL.revokeObjectURL(url); // free the resource from memory
}

// Add a new user to the users array and save the file
function add(username, email, password, dob, isAdmin) {
    // init users (only once, so users added on this page are kept)
    if (users.length == 0)
        initUsers()
    // create new user and add to array
    let user = { "username": username, "email": email, "password": password, "dob": dob, "isAdmin": isAdmin }
    users.push(user)
    // update json file
    updateData()
}
