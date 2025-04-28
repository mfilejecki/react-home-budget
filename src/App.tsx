import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Home from "./pages/Home";
import AddTransaction from "./pages/AddTransaction";
import EditTransaction from "./pages/EditTransaction";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          {/* Header/Navigation bar */}
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <Link
                to="/"
                className="text-xl font-bold text-blue-600 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path
                    fillRule="evenodd"
                    d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                    clipRule="evenodd"
                  />
                </svg>
                Home Budget
              </Link>
              <nav>
                <Link to="/" className="btn btn-secondary mr-2">
                  Dashboard
                </Link>
                <Link to="/add" className="btn btn-primary">
                  Add Transaction
                </Link>
              </nav>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-grow py-6">
            <div className="container mx-auto px-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add" element={<AddTransaction />} />
                <Route path="/edit/:id" element={<EditTransaction />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 py-4">
            <div className="container mx-auto px-4 text-center text-sm text-gray-500">
              <p>
                &copy; {new Date().getFullYear()} Home Budget App. All rights
                reserved.
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
