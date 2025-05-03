# React Home Budget

A comprehensive personal finance tracking application built with React, TypeScript, and Redux that helps users manage their expenses and income, visualize spending patterns, and maintain control over their financial life.

## Features

- **Transaction Management**: Add, edit, and delete financial transactions
- **Categorization**: Organize transactions by categories
- **Filtering**: Filter transactions by date range, category, and search term
- **Data Visualization**: View your spending patterns with interactive charts
- **Dashboard**: Get a summary of your financial status at a glance
- **Responsive Design**: Works on desktop and mobile devices
- **Local Storage**: Your data is stored locally in your browser

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **State Management**: Redux Toolkit
- **Routing**: React Router v7
- **Styling**: TailwindCSS
- **Charts**: Recharts
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository

   ```
   git clone https://github.com/mfilejecki/react-home-budget.git
   cd react-home-budget
   ```

2. Install dependencies

   ```
   npm install
   # or
   yarn
   ```

3. Start the development server

   ```
   npm run dev
   # or
   yarn dev
   ```

4. The application will be available at `http://localhost:5173`

## Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run lint` - Run ESLint to check for code quality issues
- `npm run preview` - Preview the production build locally

## Application Structure

```
src/
  ├── assets/           # Static assets
  ├── components/       # Reusable UI components
  │   ├── Chart/        # Chart visualization components
  │   ├── Filter/       # Transaction filtering components
  │   ├── Modal/        # Modal dialog components
  │   ├── TransactionForm/  # Forms for adding/editing transactions
  │   ├── TransactionItem/  # Individual transaction display
  │   └── TransactionList/  # List of transactions
  ├── pages/            # Application pages
  ├── redux/            # Redux store and slices
  ├── services/         # Service functions (localStorage, API, etc.)
  ├── types/            # TypeScript type definitions
  └── utils/            # Utility functions
```

## Usage

### Adding a Transaction

1. Click the "Add Transaction" button
2. Fill in the transaction details (title, amount, category, date)
3. Select whether it's an income or expense
4. Click "Save"

### Filtering Transactions

1. Use the search box to find transactions by title or category
2. Select a specific category from the dropdown
3. Set a date range to view transactions within that period

### Viewing Charts

1. Click the "Charts & Analytics" tab on the dashboard
2. View your expenses by category in the pie chart
3. Track your monthly income/expenses in the bar chart

## Data Storage

All transaction data is stored in your browser's local storage. This means:

- Your data stays on your device and is not sent to any server
- Data will persist between browser sessions
- Clearing browser data will remove all stored transactions

## License

This project is licensed under the MIT License - see the LICENSE file for details.
