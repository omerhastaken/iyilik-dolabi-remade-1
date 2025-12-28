import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebase";

export default function MyOrdersPage({ products }) { // Accept products as prop
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!auth.currentUser) return;
    const q = query(collection(db, "orders"), where("buyerUid", "==", auth.currentUser.uid));
    const unsub = onSnapshot(q, (snapshot) => {
      setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Siparişlerim</h2>
      {orders.length === 0 ? <p>Henüz sipariş vermediniz.</p> : (
        <div style={{ display: "grid", gap: 15 }}>
          {orders.map(order => {
            const product = products.find(p => p.id === order.productId) || {};
            
            return (
              <div key={order.id} style={styles.orderCard}>
                <img src={product.images?.[0]} alt={product.name} style={styles.img} />
                <div>
                  <h3>{product.name || "Bilinmeyen Ürün"}</h3>
                  <p>Durum: {order.status === "pending" ? "Onay Bekliyor" : 
                             order.status === "approved" ? "Onaylandı" : "Reddedildi"}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const styles = {
  orderCard: { padding: 15, borderRadius: 12, border: "1px solid #ccc", background: "#fff5ed", display: "flex", gap: 15 },
  img: { width: 120, height: 100, objectFit: "cover", borderRadius: 10 }
};