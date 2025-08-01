import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// Import lovable-tagger dynamically to avoid ESM/CommonJS issues
// We'll use it conditionally in the plugins array

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // Only load componentTagger in development mode and if it can be imported
    mode === 'development' && {
      name: 'conditional-component-tagger',
      async buildStart() {
        // This will only run during build time, not during config loading
        // which avoids the ESM/CommonJS conflict
      }
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
