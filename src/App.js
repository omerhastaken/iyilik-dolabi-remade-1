// 🌸 Gerekli kütüphaneler
import React, { useState, useEffect } from "react";
import "./App.css";
import { FaSearch, FaHeart, FaShoppingCart, FaHome, FaUser } from "react-icons/fa";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

import CategoryMenu from "./components/CategoryMenu";
import "./firebase";
import LoginPage from "./LoginPage";

// Sayfalar
import FavoritesPage from "./FavoritesPage";
import CartPage from "./CartPage";
import AccountPage from "./AccountPage";
import AddProductPage from "./AddProductPage";
import ProductDetailPage from "./ProductDetailPage";
import MyProductsPage from "./MyProductsPage";
import IncomingOrdersPage from "./IncomingOrdersPage";

import MyOrdersPage from "./MyOrdersPage";
import SecurityPage from "./SecurityPage";
import ProfilePage from "./ProfilePage";
import HelpPage from "./HelpPage";

function App() {
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // 🔥 Firestore’dan ürünleri çek
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), (snapshot) => {
      let list = [];
      snapshot.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));
      setProducts(list);
    });

    return () => unsub();
  }, []);

  // Favori
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  // Sepete ekle
  const addToCart = (id) => {
    if (!cart.some((c) => c.id === id))
      setCart((prev) => [...prev, { id, quantity: 1 }]);
  };

  // Miktar güncelle
  const updateQuantity = (id, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: quantity > 0 ? quantity : 1 } : item
      )
    );
  };

  // Sepetten sil
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Filtreleme (boş ürün adı/kat. olursa hata vermesin diye güvenli)
  const filteredProducts = products.filter((p) => {
    const name = p.name?.toString().toLowerCase() || "";
    const cat = p.category?.toString().toLowerCase() || "";
    const term = searchTerm.toLowerCase();
    return name.includes(term) || cat.includes(term);
  });

  return (
    <div className="app">
      {/* Üst Menü */}
      <header className="navbar">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h1 className="logo">İyilik Dolabı</h1>
          <CategoryMenu onSelectCategory={(cat) => setSearchTerm(cat === "Tümü" ? "" : cat)} />
        </div>

        {/* Arama */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Ürün ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="search-icon" />
        </div>

        {/* Navigasyon */}
        <nav className="nav-links">
          <Link to="/"><FaHome /> Ana Sayfa</Link>
          <Link to="/cart"><FaShoppingCart /> Sepet ({cart.length})</Link>
          <Link to="/favorites"><FaHeart /> Favoriler ({favorites.length})</Link>
          <Link to="/account"><FaUser /> Hesabım</Link>
        </nav>
      </header>

      {/* Route’lar */}
      <Routes>

        {/* Ana Sayfa */}
        <Route
          path="/"
          element={
            <div>
              <section className="banner">
                <h2>Bir eşya paylaş, bir kalbi ısıt 💛</h2>
                <p>İyilik Dolabı — Paylaşmanın en güzel hali</p>
              </section>

              <section className="products">
                <div className="product-grid">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="product-card">
                      <img
                        src={product.images?.[0]}
                        alt={product.name}
                        onClick={() => navigate(`/product/${product.id}`)}
                        style={{ cursor: "pointer" }}
                      />
                      <h3>{product.name}</h3>
                      <p>{product.category} - {product.size}</p>
                      <p>Durum: {product.condition}</p>

                      <div className="product-actions">
                        <button onClick={() => addToCart(product.id)}>Sepete Ekle</button>
                        <FaHeart
                          className={`favorite-icon ${favorites.includes(product.id) ? "active" : ""}`}
                          onClick={() => toggleFavorite(product.id)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          }
        />

        {/* Favoriler */}
        <Route path="/favorites" element={
          <FavoritesPage
            favorites={favorites}
            products={products}
            toggleFavorite={toggleFavorite}
            addToCart={addToCart}
          />
        } />

        {/* Sepet */}
        <Route path="/cart" element={
          <CartPage
            cart={cart}
            products={products}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
          />
        } />

        {/* Hesabım */}
        <Route path="/account" element={<AccountPage />} />

        {/* Ürün ekleme */}
        <Route path="/add-donation" element={<AddProductPage />} />

        {/* Ürün detay */}
        <Route path="/product/:id" element={<ProductDetailPage />} />

        {/* Eklediğim ürünler */}
        <Route path="/my-products" element={<MyProductsPage />} />

        {/* Gelen siparişler */}
        <Route path="/incoming-orders" element={<IncomingOrdersPage />} />

        {/* Siparişlerim */}
        <Route path="/my-orders" element={<MyOrdersPage />} />

        {/* Güvenlik */}
        <Route path="/security" element={<SecurityPage />} />

        {/* Profil */}
        <Route path="/profile" element={<ProfilePage />} />

        {/* Yardım */}
        <Route path="/help" element={<HelpPage />} />

        {/* Giriş */}
        <Route path="/login" element={<LoginPage />} />

      </Routes>
    </div>
  );
}

// Router ile sarma
export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
