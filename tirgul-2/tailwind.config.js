/** @type {import('tailwindcss').Config} */
module.exports = {
  // Files Tailwind scans for class names - only classes found here end up in dist/output.css
  content: ["./*.html", "./js/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [],
};
