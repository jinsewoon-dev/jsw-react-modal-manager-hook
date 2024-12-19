import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts"],
  format: ["esm", "cjs"], // ESM 및 CJS 출력
  dts: true, // 타입 정의 파일 생성
  clean: true, // 기존 빌드 파일 삭제
  sourcemap: true, // 소스맵 생성
  minify: true, // 코드 최소화
  external: ["react"], // React를 외부 의존성으로 처리
  outDir: "dist", // 출력 디렉토리 설정
  loader: {
    // ".css": "file", // CSS 파일을 개별적으로 처리
    ".css": "copy",
  },
  esbuildOptions(options) {
    options.outdir = "dist"; // 출력 디렉토리 명시
    // options.entryNames = "[name]".replace(/\.module$/, ""); // 파일 이름 유지
    options.assetNames = "[name]";
  },
  outExtension: ({ format }) => ({
    js: format === "esm" ? ".mjs" : ".cjs",
  }),
});
