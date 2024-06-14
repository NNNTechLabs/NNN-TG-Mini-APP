import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";
import svgr from "vite-plugin-svgr";
import dotenv from "dotenv";
import { nodePolyfills } from 'vite-plugin-node-polyfills';
dotenv.config();

export default defineConfig({
  define: {
    _APP_API_URL_: `"${process.env.APP_API_URL}"`,
  },
  server: {
    port: 3000,
  },
  plugins: [
    react(),
    basicSsl(),
    svgr(),
    nodePolyfills(),
  ],
});
