import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useLocation,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Home from "./pages/Home";
import AddTransaction from "./pages/AddTransaction";
import EditTransaction from "./pages/EditTransaction";
import "./App.css";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { formatCurrency } from "./utils/formatCurrency";

// Navigation component for better organization
const Navigation = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isStatsExpanded, setIsStatsExpanded] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const location = useLocation();

  // Get financial data from Redux store for the quick stats
  const { transactions } = useSelector(
    (state: RootState) => state.transactions
  );

  // Calculate financial summary for quick stats
  const financialSummary = {
    balance: transactions.reduce(
      (sum, t) => sum + (t.type === "income" ? t.amount : -t.amount),
      0
    ),
    income: transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0),
    expenses: transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0),
  };

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > headerHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headerHeight, lastScrollY]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        ref={headerRef}
        className={`bg-white shadow-sm border-b border-gray-200 transition-all duration-300 z-50 ${
          isSticky ? "fixed top-0 left-0 right-0 shadow-md" : ""
        }`}
      >
        {/* Upper navigation with logo and primary actions */}
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo and brand */}
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
              <span className="hidden sm:inline">Home Budget</span>
            </Link>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-500 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1"
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>

            {/* Quick Stats - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center text-sm">
                <div className="flex flex-col items-end mr-6">
                  <span className="text-gray-500">Balance:</span>
                  <span
                    className={`font-semibold ${
                      financialSummary.balance >= 0
                        ? "text-blue-600"
                        : "text-red-600"
                    }`}
                  >
                    {formatCurrency(financialSummary.balance)}
                  </span>
                </div>
                <div className="flex space-x-4">
                  <Link to="/add" className="btn btn-primary flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Add Transaction
                  </Link>
                  <Link
                    to="/"
                    className={`btn ${
                      location.pathname === "/"
                        ? "btn-secondary bg-gray-300"
                        : "btn-secondary"
                    }`}
                  >
                    <span className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                      </svg>
                      Dashboard
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`${
            isMobileMenuOpen ? "max-h-96" : "max-h-0"
          } md:hidden overflow-hidden transition-all duration-300 ease-in-out`}
        >
          <div className="px-4 pt-2 pb-4 space-y-3 bg-gray-50 border-t border-gray-200">
            {/* Quick Stats Summary - Mobile */}
            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
              <div
                className="flex justify-between items-center"
                onClick={() => setIsStatsExpanded(!isStatsExpanded)}
              >
                <span className="text-sm font-medium text-gray-700">
                  Quick Summary
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                    isStatsExpanded ? "transform rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              {isStatsExpanded && (
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div className="flex flex-col">
                    <span className="text-gray-500">Income:</span>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(financialSummary.income)}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500">Expenses:</span>
                    <span className="font-semibold text-red-600">
                      {formatCurrency(financialSummary.expenses)}
                    </span>
                  </div>
                  <div className="flex flex-col col-span-2 mt-2 pt-2 border-t border-gray-100">
                    <span className="text-gray-500">Balance:</span>
                    <span
                      className={`font-semibold ${
                        financialSummary.balance >= 0
                          ? "text-blue-600"
                          : "text-red-600"
                      }`}
                    >
                      {formatCurrency(financialSummary.balance)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Navigation Links */}
            <Link
              to="/"
              className={`block px-4 py-2 rounded-lg ${
                location.pathname === "/"
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
                Dashboard
              </span>
            </Link>
            <Link
              to="/add"
              className={`block px-4 py-2 rounded-lg ${
                location.pathname === "/add"
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Add Transaction
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Placeholder div to prevent content jump when header becomes fixed */}
      {isSticky && <div style={{ height: `${headerHeight}px` }}></div>}

      {/* Floating Action Button for Quick Add on mobile */}
      <div className="md:hidden fixed right-6 bottom-6 z-50">
        <Link
          to="/add"
          className="flex items-center justify-center h-14 w-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          aria-label="Add Transaction"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navigation />

          {/* Main content */}
          <main className="flex-grow py-4">
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
          <footer className="bg-white border-t border-gray-200 py-3">
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
