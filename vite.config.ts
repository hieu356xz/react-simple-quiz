import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "github-pages-redirect",
      transformIndexHtml(html) {
        const buildMode = process.env.VITE_MODE || "default";

        if (buildMode === "github-pages") {
          return html.replace(
            "<title>Ôn tập</title>",
            `<title>Redirecting to new site...</title>
    <meta http-equiv="refresh" content="0; URL=https://react-simple-quiz-delta.vercel.app/" />
    <link rel="canonical" href="https://react-simple-quiz-delta.vercel.app/" />`
          );
        }
        return html;
      },
    },
  ],
  base: "./",
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor"; // Split vendor libraries
          }
          if (id.includes("src/components/")) {
            return "components"; // Split components into their own chunk
          }
        },
      },
    },
  },
});
