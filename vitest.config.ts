// https://stereobooster.com/posts/react-native-web-with-vite/#final-config
import { configDefaults, defineConfig } from 'vitest/config';
import react from "@vitejs/plugin-react";
import path from 'path';

// https://tamagui.dev/docs/intro/installation
const extensions = [
  ".web.tsx",
  ".tsx",
  ".web.ts",
  ".ts",
  ".web.jsx",
  ".jsx",
  ".web.js",
  ".js",
  ".css",
  ".json",
  ".mjs",
];

const development = process.env.NODE_ENV === "development";

// https://vitejs.dev/config/
export default defineConfig({
  clearScreen: true,
  plugins: [react()],
  test: {
    setupFiles: ['./test/setup.ts'],
    exclude: [...configDefaults.exclude, './maestro/*'],
    watch: false,
    globals: true,
    environmentMatchGlobs: [
      ['app/**', 'happy-dom'],
      ['test/**', 'happy-dom'],
    ],
  },
  define: {
    // https://github.com/bevacqua/dragula/issues/602#issuecomment-1296313369
    global: "window",
    __DEV__: JSON.stringify(development),
    // https://tamagui.dev/docs/intro/installation
    DEV: JSON.stringify(development),
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
  },
  resolve: {
    extensions: extensions,
    alias: {
      "react-native": "react-native-web",
      'app': path.resolve(__dirname, './app'),
      'assets': path.resolve(__dirname, './assets'),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      resolveExtensions: extensions,
      // https://github.com/vitejs/vite-plugin-react/issues/192#issuecomment-1627384670
      jsx: "automatic",
      // need either this or the plugin below
      loader: { ".js": "jsx" },
    },
  },
});