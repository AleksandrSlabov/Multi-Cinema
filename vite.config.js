import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/Multi-Cinema/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        account: resolve(__dirname, "indexAccount.html"),
      },
    },
  },
  server: {
    open: "/index.html", // Автоматически открывает главную страницу
  },
});
