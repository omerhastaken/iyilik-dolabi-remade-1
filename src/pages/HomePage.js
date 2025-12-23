import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaHeart, FaShoppingCart, FaUser, FaBars } from "react-icons/fa";

function HomePage() {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCategories, setShowCategories] = useState(false); // Menü durumu

  const products = Array.from({ length: 300 }, (_, i) => ({
    id: i + 1,
    name: `Ürün ${i + 1}`,
    description: `Bu ürün sevgiyi paylaşır #${i + 1}`,
    category: ["Giyim", "Ayakkabı", "Okul Malzemeleri", "Ev Eşyası"][i % 4],
    price: Math.floor(Math.random() * 51) + 50,
    img: `https://picsum.photos/300/200?random=${i + 1}`
  }));

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const addToCart = (id) => {
    if (!cart.includes(id)) setCart(prev => [...prev, id]);
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      {/* Header */}
      <header className="home-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
        {/* Logo + Hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, position: "relative" }}>
          <h1 style={{ margin: 0 }}>İyilik Dolabı</h1>
          <button
            onClick={() => setShowCategories(!showCategories)}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, zIndex: 9999 }}
          >
            <FaBars />
          </button>

          {/* Kategori Menüsü */}
          {showCategories && (
            <div style={{
              position: "absolute",
              top: "100%",
              left: "0",
              background: "#fff",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
              zIndex: 9998
            }}>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                <li style={{ padding: "8px 12px", cursor: "pointer" }}>Kıyafet</li>
                <li style={{ padding: "8px 12px", cursor: "pointer" }}>Ayakkabı</li>
                <li style={{ padding: "8px 12px", cursor: "pointer" }}>Okul Malzemeleri</li>
                <li style={{ padding: "8px 12px", cursor: "pointer" }}>Ev Eşyası</li>
              </ul>
            </div>
          )}
        </div>

        {/* Arama ve Navigasyon */}
        <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
          <input type="text" placeholder="Ürün ara..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <nav style={{ display: "flex", gap: 15 }}>
            <Link to="/">Ana Sayfa</Link>
            <Link to="/cart">Sepet ({cart.length})</Link>
            <Link to="/favorites">Favoriler ({favorites.length})</Link>
            <Link to="/account">Hesabım</Link>
          </nav>
        </div>
      </header>

      {/* Banner */}
      <section className="home-banner">
        <h2>Bir eşya paylaş, bir kalbi ısıt 💛</h2>
        <p className="home-banner-sub">İyilik Dolabı — Paylaşmanın en güzel hali</p>
      </section>

      {/* Ürünler */}
      <section className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.img} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="price">{product.price} TL</p>
            <div className="product-actions">
              <button onClick={() => addToCart(product.id)}>Sepete Ekle</button>
              <FaHeart
                className={`favorite-icon ${favorites.includes(product.id) ? "active" : ""}`}
                onClick={() => toggleFavorite(product.id)}
              />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default HomePage;
