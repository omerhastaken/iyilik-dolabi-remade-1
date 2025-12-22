import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "./firebase";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const ref = doc(db, "products", id);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setProduct({ id: snap.id, ...snap.data() });
        }
      } catch (err) {
        alert("Ürün yüklenemedi");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleRequest = async () => {
    if (!auth.currentUser) {
      alert("Lütfen giriş yapın");
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        productId: product.id,
        productName: product.name,
        productImage: product.images?.[0] || "",
        ownerUid: product.ownerUid,
        buyerUid: auth.currentUser.uid,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      alert("Talep gönderildi");
    } catch (err) {
      alert("Talep gönderilemedi");
    }
  };

  if (loading) return <p>Yükleniyor...</p>;
  if (!product) return <p>Ürün bulunamadı</p>;

  return (
    <div style={{ padding: 20 }}>
      {product.images?.[0] && (
        <img
          src={product.images[0]}
          alt={product.name}
          style={{ width: "100%", borderRadius: 12 }}
        />
      )}

      <h2>{product.name}</h2>
      <p>Kategori: {product.category}</p>
      <p>Durum: {product.condition}</p>
      <p>Beden: {product.size}</p>

      <button
        onClick={handleRequest}
        style={{
          marginTop: 20,
          padding: 14,
          borderRadius: 12,
          border: "none",
          background: "#ff8a65",
          color: "#fff",
          width: "100%",
          fontSize: 18,
          cursor: "pointer",
        }}
      >
        Ürünü Talep Et
      </button>
    </div>
  );
}
