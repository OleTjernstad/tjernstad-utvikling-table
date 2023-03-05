import { babel } from "@rollup/plugin-babel";
import dts from "rollup-plugin-dts";
import external from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default [
  {
    external: [
      "@mui/icons-material",
      "@mui/material",
      "@tanstack/match-sorter-utils",
      "@tanstack/react-table",
      "@tanstack/react-virtual",
      "react",
    ],
    input: "./src/index.ts",
    output: [
      {
        file: "./dist/tu-table.esm.js",
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
  {
    input: "./dist/types/index.d.ts",
    output: [{ file: "./dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },
];
