import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist", // Explicitly set to match Render's publish directory
  },
  preview: {
    host: true, // Allows external access, required for Render
    allowedHosts: ["labtasker-frontend.onrender.com", "localhost"], // Allow Render domain and localhost
  },
});