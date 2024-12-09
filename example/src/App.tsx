import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useModal } from "@jsw/react-modal-manager-hook";
function App() {
  const [count, setCount] = useState(0);
  const { state, setState, string, setString } = useModal();

  return (
    <>
      <div>
        {state}
        <button onClick={() => setState((prev: number) => prev + 1)}>
          라이브러리 테스트 버튼
        </button>
        {string}
        <button onClick={() => setString(String(new Date()))}>
          라이브러리 테스트 버튼
        </button>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
