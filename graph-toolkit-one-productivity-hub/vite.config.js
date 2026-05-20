import fs from "node:fs";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const useHttps = env.HTTPS === "true";
  const certFile = env.SSL_CRT_FILE;
  const keyFile = env.SSL_KEY_FILE;

  let https = false;
  if (useHttps) {
    if (certFile && keyFile && fs.existsSync(certFile) && fs.existsSync(keyFile)) {
      https = {
        cert: fs.readFileSync(certFile),
        key: fs.readFileSync(keyFile),
      };
    } else {
      https = true;
    }
  }

  return {
    plugins: [react()],
    envPrefix: ["VITE_", "REACT_APP_"],
    server: {
      host: env.HOST || "localhost",
      port: Number(env.PORT || 53000),
      strictPort: true,
      https,
    },
    build: {
      outDir: "build",
    },
  };
});
