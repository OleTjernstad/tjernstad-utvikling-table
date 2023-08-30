import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";

// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "tu-table",
      fileName: "tu-table",
      formats: ["es"],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        "@radix-ui/react-checkbox",
        "@radix-ui/react-select",
        "@radix-ui/react-switch",
        "@radix-ui/react-dropdown-menu",
        "@radix-ui/react-slot",
        "@radix-ui/react-tooltip",
        "class-variance-authority",
        "clsx",
        "tailwind-merge",
        "@tanstack/match-sorter-utils",
        "@tanstack/react-table",
        "react",
      ],
      output: {
        format: "esm",
        sourcemap: true,
      },
    },
  },
  plugins: [dts()],
});
