# Tirgul 2 – Tailwind + Vite

## Run
```
npm install
npm run dev
```
Open the address Vite prints (http://localhost:5173).

## package.json
Describes the project: its name/version, `"type": "module"` (use `import`/`export`),
the **scripts** you run with `npm run <name>` (`dev` starts the Vite dev server, `build` creates
a production version in `dist/`, `preview` serves that build), and the **devDependencies** –
packages needed only for development (`vite`, `tailwindcss`, `postcss`, `autoprefixer`).
`npm install` reads this file and downloads them into `node_modules`.

## tailwind.config.js
Tailwind's configuration. `content` lists the files Tailwind scans for class names –
only classes found there are generated into the CSS. `theme.extend` is where you add custom
colors/fonts/sizes, and `plugins` adds Tailwind plugins.

## Features
- **Register** (`src/register.html`, `src/register.js`) – username, email, password, confirm password,
  date of birth. Users are saved in local storage under `users`.
  The **first** user to register is `admin`, all the others are `user`.
- **Login** (`src/login.html`, `src/login.js`) – by username or email. On success the user's details
  (without the password) are saved in local storage under `loggedInUser`.
  Admin → `userManagement.html`, regular user → home page.
- **User Management** (`src/userManagement.html`, `src/userManagement.js`) – shows `Welcome <username>`
  and a table of all users (no passwords). Admin only.
