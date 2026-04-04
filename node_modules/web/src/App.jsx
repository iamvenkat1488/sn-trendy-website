
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from '@/contexts/AuthContext.jsx';
import { CartProvider } from '@/contexts/CartContext.jsx';
import ProtectedRoute from '@/components/ProtectedRoute.jsx';
import HomePage from '@/pages/HomePage.jsx';
import LoginPage from '@/pages/LoginPage.jsx';
import SignupPage from '@/pages/SignupPage.jsx';
import ProductListingPage from '@/pages/ProductListingPage.jsx';
import ProductDetailPage from '@/pages/ProductDetailPage.jsx';
import CartPage from '@/pages/CartPage.jsx';
import CheckoutPage from '@/pages/CheckoutPage.jsx';
import OrderConfirmationPage from '@/pages/OrderConfirmationPage.jsx';
import UserProfilePage from '@/pages/UserProfilePage.jsx';
import WishlistPage from '@/pages/WishlistPage.jsx';
import AdminDashboard from '@/pages/AdminDashboard.jsx';
import SimpleUploadPage from '@/pages/SimpleUploadPage.jsx';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/products" element={<ProductListingPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/confirmation/:id"
              element={
                <ProtectedRoute>
                  <OrderConfirmationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <WishlistPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/upload"
              element={
                <ProtectedRoute adminOnly>
                  <SimpleUploadPage />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Toaster />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
