import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import semua komponen yang diperlukan
import Navbar from './components/Navbar';
import Home from './components/Home';
import FullMenu from './components/FullMenu';
import Footer from './components/Footer';
import CartButton from './components/CartButton';
import CartModal from './components/CartModal';
import AdminDashboard from './components/AdminDashboard';
import PaymentPage from './components/PaymentPage'; // Import halaman pembayaran
import PaymentSuccessPage from './components/PaymentSuccessPage'; // Import halaman konfirmasi pembayaran

function App() {
  const [cart, setCart] = useState([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      return [...prevCart, item];
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* User Routes */}
            <Route path="/" element={<Home addToCart={addToCart} />} />
            <Route path="/menu" element={<FullMenu addToCart={addToCart} />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/payment-success" element={<PaymentSuccessPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            {/* Add routes for other admin functionalities */}
          </Routes>
        </main>
        <Footer />
        <CartButton 
          itemCount={cartItemCount}
          onClick={() => setIsCartModalOpen(true)}
        />
        <CartModal 
          isOpen={isCartModalOpen}
          onClose={() => setIsCartModalOpen(false)}
          cartItems={cart}
          removeFromCart={removeFromCart}
        />
      </div>
    </Router>
  );
}

export default App;
