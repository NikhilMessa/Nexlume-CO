import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    react(),
    viteCompression({ algorithm: "gzip", ext: ".gz", threshold: 10240, deleteOriginFile: false }),
    viteCompression({ algorithm: "brotliCompress", ext: ".br", threshold: 10240, deleteOriginFile: false }),
  ],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  build: {
    rollupOptions: {
      output: {
                    manualChunks: {
                react: ["react", "react-dom", "react-router-dom"],
                three: ["three", "@react-three/fiber", "@react-three/drei"],
                spline: ["@splinetool/react-spline", "@splinetool/runtime"],
                animation: ["gsap", "framer-motion"],
                ui: ["bootstrap", "lucide-react", "react-icons"],
              },
      },
    },
    chunkSizeWarningLimit: 500,
    cssCodeSplit: true,
    cssMinify: true,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        // ✅ ADD: removes dead code branches like if(false){...}
        dead_code: true,
        passes: 2, // two-pass compression — smaller output, worth ~5% extra
      },
    },
    assetsInlineLimit: 4096,
    // ✅ ADD: pre-load key chunks so browser fetches them before they're needed
    modulePreload: { polyfill: true },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: false,
    allowedHosts: ["nexlume-xyxr.onrender.com", "localhost", ".onrender.com"],
    // ✅ ADD: speeds up local dev — pre-bundles deps on first run
    warmup: {
      clientFiles: ["./src/main.jsx", "./src/App.jsx"],
    },
  },
});