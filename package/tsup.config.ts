import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  sourcemap: true,
  minify: true,
  external: ["react"],
  esbuildOptions(options) {
    options.outExtension = {
      ".js": ".mjs", // ESM 파일 확장자를 .mjs로 변경
    };
  },
});
