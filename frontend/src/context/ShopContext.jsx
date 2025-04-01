import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 450;
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
  
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  // ✅ Function to fetch products from backend
  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      console.log("Fetched Products:", response.data);

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products.");
    }
  };

  // ✅ Fetch products when component mounts
  useEffect(() => {
    getProductsData();
  }, []);

  // ✅ Restore token from local storage
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);

  // ✅ Add item to cart
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    try {
      let cartData = structuredClone(cartItems);
      if (!cartData[itemId]) cartData[itemId] = {};
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

      setCartItems(cartData);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  // ✅ Get total number of items in cart
  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        totalCount += cartItems[itemId][size] || 0;
      }
    }
    return totalCount;
  };

  // ✅ Update cart item quantity
  const updateQuantity = async (itemId, size, quantity) => {
    try {
      let cartData = structuredClone(cartItems);
      if (cartData[itemId] && cartData[itemId][size] !== undefined) {
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // ✅ Calculate total cart amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      let itemInfo = products.find((product) => product._id === itemId);
      if (itemInfo) {
        for (const size in cartItems[itemId]) {
          totalAmount += (itemInfo.price || 0) * (cartItems[itemId][size] || 0);
        }
      }
    }
    return totalAmount;
  };

  // ✅ Context value to provide
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
    addToCart, // Include addToCart function
  };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
