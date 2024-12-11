/**
 * 주어진 값(`value`)이 정의되어 있으면 해당 값을 반환하고,
 * 그렇지 않으면 기본값(`defaultValue`)을 반환합니다.
 *
 * @template T - 반환값의 타입.
 * @param {object} params - 함수에 전달되는 매개변수 객체.
 * @param {T} params.defaultValue - `value`가 정의되지 않았을 경우 반환할 기본값.
 * @param {T | undefined} params.value - 확인할 값. `undefined`인 경우 기본값이 반환됩니다.
 * @returns {T} 주어진 값(`value`)이 정의되어 있으면 해당 값, 아니면 기본값(`defaultValue`).
 *
 * @example
 * // 기본값 사용
 * const result1 = getOrDefault({ defaultValue: true, value: undefined });
 * console.log(result1); // 출력: true
 *
 * // 주어진 값 사용
 * const result2 = getOrDefault({ defaultValue: true, value: false });
 * console.log(result2); // 출력: false
 */
export const getOrDefault = <T>({
  defaultValue,
  value,
}: {
  defaultValue: T;
  value: T | undefined;
}): T => {
  return value !== undefined ? value : defaultValue;
};
