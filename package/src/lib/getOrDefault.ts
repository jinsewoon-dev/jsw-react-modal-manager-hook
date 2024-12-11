/**
 * 주어진 값이 정의되어 있으면 해당 값을 반환하고, 그렇지 않으면 기본값을 반환합니다.
 *
 * @template T - 값과 기본값의 타입.
 * @param {T | undefined} value - 확인하거나 가져올 값. 만약 `undefined`라면 기본값을 반환합니다.
 * @param {T} defaultValue - 값이 `undefined`일 경우 반환할 기본값.
 * @returns {T} 제공된 값이 정의되어 있으면 해당 값, 아니면 기본값.
 *
 * @example
 * // 정의된 값을 사용하는 경우
 * const result1 = getOrDefault("안녕하세요", "기본값");
 * console.log(result1); // 출력: "안녕하세요"
 *
 * // 값이 undefined인 경우
 * const result2 = getOrDefault(undefined, "기본값");
 * console.log(result2); // 출력: "기본값"
 */
export const getOrDefault = <T>(value: T | undefined, defaltValue: T) => {
  return value !== undefined ? value : defaltValue;
};
