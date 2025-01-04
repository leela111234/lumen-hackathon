import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Staff_dashboard from './Components/Staff_dashboard';
import LoginPage from './Components/LoginPage';
import SignUpPage from './Components/SignUpPage';

const Home = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold">Welcome to the Dashboard App</h1>
    <p className="mt-4">Navigate to the Staff Dashboard to manage stocks.</p>
  </div>
);

const NotFound = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold text-red-500">404 - Page Not Found</h1>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Staff_dashboard />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
