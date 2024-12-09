import { useState } from "react";

export const useModal = () => {
  const [state, setState] = useState<number>(1);
  const [string, setString] = useState<string>("");
  return { state, setState, string, setString };
};
