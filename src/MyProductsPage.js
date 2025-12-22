import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db, auth } from "./firebase";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

export default function MyProductsPage({ addToCart, toggleFavorite, favorites = [] }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "products"),
      where("ownerUid", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let list = [];
      snapshot.forEach(doc => list.push({ id: doc.id, ...doc.data() }));
      setProducts(list);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Eklediğim Ürünler</h2>

      {products.length === 0 && <p>Henüz ürün eklemedin</p>}

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", 
        gap: 16 
      }}>
        {products.map(p => (
          <div 
            key={p.id} 
            style={{
              background: "#fff",
              borderRadius: 10,
              padding: 12,
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
            }}
          >
            <img 
              src={p.images?.[0]} 
              alt="" 
              style={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 8 }} 
            />
            <h4>{p.name}</h4>
            <p>{p.category}</p>

            {/* ⭐ Aksiyon Butonları */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>

              {/* Sepete ekle */}
              <button 
                onClick={() => addToCart(p.id)}
                style={{
                  padding: "6px 10px",
                  background: "#3e3c3b",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6
                }}
              >
                <FaShoppingCart /> Sepete Ekle
              </button>

              {/* Favori */}
              <FaHeart
                onClick={() => toggleFavorite(p.id)}
                className={favorites.includes(p.id) ? "favorite-icon active" : "favorite-icon"}
                style={{
                  fontSize: 20,
                  cursor: "pointer",
                  color: favorites.includes(p.id) ? "red" : "#aaa"
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
