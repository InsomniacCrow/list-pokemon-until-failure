import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import * as path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@assets": path.resolve(import.meta.dirname, "src/assets"),
      "@components": path.resolve(import.meta.dirname, "src/components"),
      "@data": path.resolve(import.meta.dirname, "src/data"),
    },
  },
});
