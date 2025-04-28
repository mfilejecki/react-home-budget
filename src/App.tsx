import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <a
                href="https://vite.dev"
                target="_blank"
                className="hover:opacity-80"
              >
                <img src={viteLogo} className="h-12 w-12" alt="Vite logo" />
              </a>
              <a
                href="https://react.dev"
                target="_blank"
                className="hover:opacity-80"
              >
                <img
                  src={reactLogo}
                  className="h-12 w-12 motion-safe:animate-spin"
                  alt="React logo"
                />
              </a>
            </div>
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Home Budget App
            </div>
            <h1 className="mt-2 text-xl font-bold text-gray-900">
              Vite + React + Tailwind CSS
            </h1>
            <div className="mt-6">
              <button
                onClick={() => setCount((count) => count + 1)}
                className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                count is {count}
              </button>
              <p className="mt-4 text-gray-600">
                Edit{" "}
                <code className="bg-gray-100 p-1 rounded">src/App.tsx</code> and
                save to test HMR
              </p>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              Click on the Vite and React logos to learn more
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
