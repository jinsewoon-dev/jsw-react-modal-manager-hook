import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom", // 브라우저와 유사한 환경 제공
    globals: true, // describe, it 등 글로벌 사용 가능
    setupFiles: "./setupTests.ts", // setup 파일 등록
  },
});
