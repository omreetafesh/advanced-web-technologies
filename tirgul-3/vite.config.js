import { resolve } from "path";
import { defineConfig } from "vite";

// Multi-page site: every html page must be listed so `npm run build` includes it
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        login: resolve(__dirname, "src/login.html"),
        register: resolve(__dirname, "src/register.html"),
        userManagement: resolve(__dirname, "src/userManagement.html"),
      },
    },
  },
});
