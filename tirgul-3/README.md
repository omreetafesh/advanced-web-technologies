# Tirgul 3 – JSON files, dynamic User Management, CAPTCHA

A copy of tirgul-2, changed to work with a JSON file instead of local storage.

## Run
```
npm install
npm run dev
```
Open the address Vite prints.

Test users in `src/db.json`:
- `lala` / `1234` – admin
- `dana` / `5678` – regular user

## 1. Working with JSON files
- `src/db.json` – the users data.
- `src/users.js` – `initUsers()` reads the file (synchronous `XMLHttpRequest`), `find()` finds a user by
  username or email, `add()` adds a user and `updateData()` saves the file.
- A browser cannot write to files on your computer, so `updateData()` **downloads** a new `db.json`.
  Save it over `src/db.json` to keep the change.
- **Why a synchronous request?** `find()` has to return the user right away, so the file must be read
  before the function continues. An asynchronous request would return before the data arrived.

## 2. Dynamic User Management
- `src/userManagement.js` loads the users with `fetch('db.json')` and builds the table from the JSON keys
  (the password column is skipped). The title shows `Welcome <username>` from `currentUser` in local storage.
- Double-click a cell to edit it: Enter saves, Escape cancels.
- **Exercise – save to file:** after a change the users array is updated and `updateData()` saves the file.

## 3. CAPTCHA
- `src/captcha.js` replaces `register.js` and shows a random arithmetic question.
  After 3 wrong answers the form is locked.
- **Exercise – multiply and divide:** the question uses `+`, `-`, `×` or `÷`. Division questions always
  have a whole-number answer.
- **Exercise – external CAPTCHA:** Google reCAPTCHA v2 ("I'm not a robot") on the register page.
  It uses Google's public test key; replace `data-sitekey` in `register.html` with your own key from
  https://www.google.com/recaptcha/admin.
