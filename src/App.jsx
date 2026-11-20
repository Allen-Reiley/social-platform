import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './views/Home';
import About from './views/About';
import SignUp from './views/SignUp';
import Profile from './views/Profile';
import Feed from './views/Feed';

/**
 * Root Application Component
 * 1. Wraps the entire component hierarchy in AppProvider for global state.
 * 2. Establishes React Router v6 client-side routing.
 * 3. Renders persistent Navbar and Footer on all views.
 * 4. Defines the five required client-side views.
 */
function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        {/* Persistent Navigation Header */}
        <Navbar />

        {/* Dynamic Route Container */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/feed" element={<Feed />} />
            {/* Catch-all fallback redirecting to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Persistent Institutional Footer */}
        <Footer />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
