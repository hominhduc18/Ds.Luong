import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { storage } from './utils/storage';

// Layouts
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import AdminLayout from './components/Admin/AdminLayout';

// User Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Blog from './pages/Blog';
import PostDetail from './pages/PostDetail';
import Contact from './pages/Contact';
import About from './pages/About';
import Policies from './pages/Policies';
import ZaloButton from './components/ZaloButton';

// Admin Pages
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminPosts from './pages/AdminPosts';
import AdminReviews from './pages/AdminReviews';
import AdminContacts from './pages/AdminContacts';
import AdminSettings from './pages/AdminSettings';
import WarehousePage from './pages/WarehousePage';
import CategoryManager from './pages/CategoryManager';

const Layout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow">{children}</main>
    <Footer />
    <ZaloButton />
  </div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  useEffect(() => {
    storage.init();

    // Cập nhật document title theo siteName
    const updateTitle = () => {
      const s = storage.get('beauty_settings') || {};
      const name = s.siteName || 'Ds Lương';
      document.title = s.seoTitle || `Ds Lương - phân phối dược mỹ phẩm`;
    };
    updateTitle();
    window.addEventListener('beauty_data_changed', updateTitle);
    return () => window.removeEventListener('beauty_data_changed', updateTitle);
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/shop" element={<Layout><Shop /></Layout>} />
          <Route path="/san-pham/:slug" element={<Layout><ProductDetail /></Layout>} />
          <Route path="/blog" element={<Layout><Blog /></Layout>} />
          <Route path="/blog/:slug" element={<Layout><PostDetail /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/policies" element={<Layout><Policies /></Layout>} />

          {/* Admin Auth Route */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
          <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
          <Route path="/admin/products" element={<AdminLayout><AdminProducts /></AdminLayout>} />
          <Route path="/admin/posts" element={<AdminLayout><AdminPosts /></AdminLayout>} />
          <Route path="/admin/reviews" element={<AdminLayout><AdminReviews /></AdminLayout>} />
          <Route path="/admin/contacts" element={<AdminLayout><AdminContacts /></AdminLayout>} />
          <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />
          <Route path="/admin/warehouse" element={<AdminLayout><WarehousePage /></AdminLayout>} />
          <Route path="/admin/categories" element={<AdminLayout><CategoryManager /></AdminLayout>} />

          {/* Legacy Redirects or Fallback */}
          <Route path="/product/:id" element={<Layout><ProductDetail /></Layout>} />
          <Route path="/post/:id" element={<Layout><PostDetail /></Layout>} />
          <Route path="/kien-thuc/:slug" element={<Layout><PostDetail /></Layout>} />
          
          {/* Fallback */}
          <Route path="*" element={<Layout><Home /></Layout>} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
