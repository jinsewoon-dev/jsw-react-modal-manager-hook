module.exports = {
  plugins: {
    "postcss-preset-env": {
      stage: 1, // 최신 CSS 기능 지원
    },
    "postcss-modules": {
      generateScopedName: "[local]", // 클래스 이름 난독화
      getJSON: () => {
        // JSON 파일 생성 비활성화
        return;
      },
    },
  },
};
