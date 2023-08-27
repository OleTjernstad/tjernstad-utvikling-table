import { babel } from "@rollup/plugin-babel";
import dts from "rollup-plugin-dts";
import external from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default [
  {
    external: [
      "@adobe/react-spectrum",
      // "@radix-ui/react-checkbox",
      // "@radix-ui/react-slot",
      // "@radix-ui/react-tooltip",
      // "class-variance-authority",
      // "clsx",
      // "tailwind-merge",
      // "@tanstack/match-sorter-utils",
      // "@tanstack/react-table",
      "react",
    ],
    input: "./src/table.tsx",
    output: [
      {
        file: "./dist/esm/tu-table.esm.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      babel({
        exclude: "node_modules/**",
        presets: ["@babel/preset-react"],
        babelHelpers: "bundled",
      }),
      external(),
      resolve(),
      typescript(),
    ],
  },
  // {
  //   input: "./dist/esm/types/index.d.ts",
  //   output: [
  //     {
  //       file: "./dist/index.d.ts",
  //       format: "esm",
  //       hoistTransitiveImports: false,
  //     },
  //   ],
  //   plugins: [dts()],
  // },
];
