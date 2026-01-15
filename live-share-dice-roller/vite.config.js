import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        outDir: "../dist",
    },
    define: {
        // Fix for @microsoft/teams-js which references Node.js global
        global: "globalThis",
    },
    resolve: {
        preserveSymlinks: true,
    },
    root: "./src",
    server: {
        port: 3000,
        host: true,
    },
    optimizeDeps: {
        force: true,
    },
});
