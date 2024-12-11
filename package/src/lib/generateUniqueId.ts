/**
 * 고유한 ID(UUID)를 생성합니다.
 *
 * @returns {string} 생성된 고유 ID(UUID).
 *
 * @example
 * // 고유 ID 생성
 * const uniqueId = generateUniqueId();
 * console.log(uniqueId); // 출력: "550e8400-e29b-41d4-a716-446655440000" (예시)
 */
export const generateUniqueId = () => {
  return crypto.randomUUID();
};
