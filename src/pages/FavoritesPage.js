// ❤️ Gerekli modüller
import React from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

// 💾 FavoritesPage Bileşeni
// props olarak: favorites (favori ürün ID'leri), toggleFavorite, addToCart, products alıyor
export default function FavoritesPage({ favorites, toggleFavorite, addToCart, products }) {
  // 📋 Favori ürünleri filtrele
  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  return (
    <div className="favorites-page">
      {/* Başlık */}
      <h2>Favorilerim</h2>

      {/* Ürünler alanı */}
      <div className="product-grid">
        {/* Eğer hiç favori yoksa mesaj göster */}
        {favoriteProducts.length === 0 ? (
          <p>Henüz favori eklenmiş ürün yok.</p>
        ) : (
          /* Favori ürünleri listele */
          favoriteProducts.map(product => (
            <div key={product.id} className="product-card">
              {/* Ürün kategorisi etiketi */}
              <div className="category-tag">{product.category}</div>

              {/* Ürün görseli */}
              <img src={product.img} alt={product.name} />

              {/* Ürün bilgileri */}
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="price">{product.price} TL</p>

              {/* 🛒 Ürün işlemleri (Sepete ekle / Favoriden çıkar) */}
              <div className="product-actions">
                {/* Sepete ekle butonu */}
                <button onClick={() => addToCart(product.id)}>Sepete Ekle</button>

                {/* Favoriden çıkarma ikonu */}
                <FaHeart
                  className={`favorite-icon active`}
                  onClick={() => toggleFavorite(product.id)}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
