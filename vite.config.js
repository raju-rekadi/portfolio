import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base must match the GitHub Pages sub-path (repo name), same idea as
// package.json "homepage" in a CRA project.
export default defineConfig({
  plugins: [react()],
  base: "/portfolio/",
});
