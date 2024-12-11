type TLogErrorType = "설정 오류" | "사용자 오류" | "시스템 오류";

/**
 * 에러 로그를 출력하는 함수입니다. 에러의 종류와 메시지를 지정하여 일관된 형식으로 출력합니다.
 *
 * @param {object} params - 에러 정보를 담은 객체입니다.
 * @param {TLogErrorType} params.type - 에러의 유형을 나타냅니다.
 * @param {string} params.message - 에러의 세부 메시지를 나타냅니다.
 *
 * @example
 * logModal({ type: "설정 오류", message: "customDimColor는 hasDim이 false일 때 사용할 수 없습니다." });
 */
export const logError = ({
  type,
  message,
}: {
  type: TLogErrorType;
  message: string;
}): void => {
  console.error(`[${type}]: ${message}`);
};
