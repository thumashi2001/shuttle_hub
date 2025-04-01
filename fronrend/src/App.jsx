import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify styles
import ErrorBoundary from './components/ErrorBoundary';

// Components from app.jsx
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';

// Components from app.js
import TshirtCustomize from './pages/TshirtCustomize';
import TshirtView from './pages/TshirtView';
import DeliveryDetails from './pages/DeliveryDetails';
import PaymentDetails from './pages/PaymentDetails';
import OrderPlaced from './pages/OrderPlaced';

const App = () => {
  const location = useLocation();
  const isTshirtRoute = location.pathname.startsWith('/tshirt') || 
                        location.pathname === '/delivery-details' || 
                        location.pathname === '/payment-details' || 
                        location.pathname === '/order-placed';

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background">
        {/* Toast notifications */}
        <Toaster position="top-right" /> {/* Sonner Toaster */}
        <ToastContainer position="bottom-right" /> {/* React-Toastify ToastContainer */}

        {/* Layout components */}
        <Navbar />
        <SearchBar />

        {/* Main content with responsive padding and sidebar offset */}
        <main className={`${isTshirtRoute ? 'ml-0 md:ml-64' : 'ml-0'} pt-16 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] p-6`}>
          <Routes>
            {/* Routes from app.jsx */}
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/order" element={<Orders />} />

            {/* Routes from app.js (T-shirt customization flow) */}
            <Route path="/tshirt-customize" element={<TshirtCustomize />} />
            <Route path="/tshirt-view" element={<TshirtView />} />
            <Route path="/delivery-details" element={<DeliveryDetails />} />
            <Route path="/payment-details" element={<PaymentDetails />} />
            <Route path="/order-placed" element={<OrderPlaced />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default App;