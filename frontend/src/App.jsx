import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProfileSetup from './pages/ProfileSetup';

import BodyScan from './pages/BodyScan';
import ScanResults from './pages/ScanResults';
import Recommendations from './pages/Recommendations';
import ARTryOn from './pages/ARTryOn';
import SavedOutfits from './pages/SavedOutfits';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import About from './pages/About';
import Trends from './pages/Trends';
import ArticleDetail from './pages/ArticleDetail';
import Security from './pages/Security';

// Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Toaster position="top-right" />

      {/* Navbar - show on all pages except AR Try-On */}
      <Routes>
        <Route path="/ar-tryon" element={null} />
        <Route path="/" element={null} />
        <Route path="*" element={<Navbar />} />
      </Routes>

      {/* Main Content */}
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={isAuthenticated ? <Navigate to="/" /> : <Signup />}
          />


          {/* Public Routes - Collection is visible to all */}
          {/* Demo Routes (Public - No Auth Required) */}
          <Route path="/recommendations" element={<Recommendations />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile-setup" element={<ProfileSetup />} />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route path="/profile" element={<Profile />} />

            {/* Feature Routes - Require Login */}
            <Route path="/body-scan" element={<BodyScan />} />
            <Route path="/body scan" element={<Navigate to="/body-scan" replace />} />
            <Route path="/scan-results" element={<ScanResults />} />
            <Route path="/ar-tryon" element={<ARTryOn />} />
            <Route path="/ar tryon" element={<Navigate to="/ar-tryon" replace />} />
          </Route>

          {/* Public Route - Wardrobe is visible to all (but content is gated) */}
          <Route path="/saved-outfits" element={<SavedOutfits />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/trends" element={<Trends />} />
          <Route path="/trends/:slug" element={<ArticleDetail />} />
          <Route path="/security" element={<Security />} />

          {/* 404 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {/* Footer - show on all pages except AR Try-On and auth pages */}
      <Routes>
        <Route path="/ar-tryon" element={null} />
        <Route path="/login" element={null} />
        <Route path="/signup" element={null} />
        <Route path="*" element={<Footer />} />
      </Routes>
    </div>
  );
}

export default App;
