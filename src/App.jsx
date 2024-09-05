import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import useStore from "./Hooks/ZustandHook";

function App() {
  const bears = useStore((state) => state.bears);
  const increasePopulation = useStore((state) => state.increasePopulation);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>{bears} around here...</h1>
      <div className="card">
        <button onClick={increasePopulation}>one up</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more{bears}
      </p>
    </>
  );
}

export default App;
