import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts"],
  format: ["esm"],
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
  splitting: false, // ESM 모듈을 하나의 파일로 번들
  shims: true, // Node.js 내장 모듈 폴리필 추가
});
