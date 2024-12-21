import { describe, it, expect, vi } from "vitest";
import { generateUniqueId } from "./generateUniqueId";

describe("generateUniqueId 함수", () => {
  it("문자열(String)을 반환해야 한다", () => {
    const id = generateUniqueId();
    expect(typeof id).toBe("string");
  });

  //정규식
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  it("올바른 UUID 형식인지 확인한다", () => {
    const id = generateUniqueId();
    expect(uuidRegex.test(id)).toBe(true);
  });

  it("여러 번 호출해도 고유한 값을 반환해야 한다", () => {
    const ids = new Set();
    for (let i = 0; i < 100; i++) {
      ids.add(generateUniqueId());
    }
    expect(ids.size).toBe(100); // 100번 호출 시 중복 없이 100개의 고유 값 생성
  });

  it("crypto.randomUUID 메서드를 호출하고 UUID 형식 값을 반환해야 한다", () => {
    // UUID 형식으로 모킹된 값
    const mockedUUID = "12345678-1234-4abc-89ab-123456789abc";

    const mockRandomUUID = vi
      .spyOn(global.crypto, "randomUUID")
      .mockReturnValue(mockedUUID);

    const id = generateUniqueId();

    // crypto.randomUUID가 호출되었는지 확인
    expect(mockRandomUUID).toHaveBeenCalled();

    // 반환된 값이 모킹된 값인지 확인
    expect(id).toBe(mockedUUID);

    // 모킹된 값이 UUID 형식인지 확인
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(uuidRegex.test(id)).toBe(true);

    // 모킹 복원
    mockRandomUUID.mockRestore();
  });
});
