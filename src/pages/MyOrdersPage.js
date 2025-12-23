// 📦 Siparişlerim Sayfası
import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState({});

  useEffect(() => {
    if (!auth.currentUser) return;

    // Kullanıcının verdiği siparişleri çek
    const q = query(
      collection(db, "orders"),
      where("buyerUid", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      let list = [];
      let prodData = {};

      for (let docSnap of snapshot.docs) {
        const order = { id: docSnap.id, ...docSnap.data() };
        list.push(order);

        // Ürünü çek
        if (!prodData[order.productId]) {
          const productRef = doc(db, "products", order.productId);
          const productSnap = await getDoc(productRef);
          if (productSnap.exists()) {
            prodData[order.productId] = { id: productSnap.id, ...productSnap.data() };
          }
        }
      }

      setOrders(list);
      setProducts(prodData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ marginBottom: 20 }}>Siparişlerim</h2>

      {orders.length === 0 && (
        <p>Henüz sipariş vermediniz.</p>
      )}

      <div style={{ display: "grid", gap: 15 }}>
        {orders.map(order => {
          const product = products[order.productId];
          if (!product) return null;

          return (
            <div key={order.id} style={{
              padding: 15,
              borderRadius: 12,
              border: "1px solid #ccc",
              background: "#fff5ed"
            }}>
              <div style={{ display: "flex", gap: 15 }}>
                <img 
                  src={product.images?.[0]} 
                  alt={product.name}
                  style={{ width: 120, height: 100, objectFit: "cover", borderRadius: 10 }}
                />

                <div>
                  <h3>{product.name}</h3>
                  <p>Kategori: {product.category}</p>
                  <p>Durum: {product.condition}</p>

                  <p>
                    <strong>Sipariş Durumu:</strong>{" "}
                    {order.status === "pending" && "Onay Bekliyor"}
                    {order.status === "approved" && "Onaylandı"}
                    {order.status === "rejected" && "Reddedildi"}
                  </p>

                  <p style={{ fontSize: 12, color: "#888" }}>
                    Sipariş Tarihi: {order.createdAt?.toDate().toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
