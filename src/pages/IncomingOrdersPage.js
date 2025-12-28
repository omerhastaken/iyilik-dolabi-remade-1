import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function IncomingOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "orders"),
      where("ownerUid", "==", auth.currentUser.uid)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      let list = [];
      snapshot.forEach(docu => list.push({ id: docu.id, ...docu.data() }));
      setOrders(list);
    });

    return () => unsub();
  }, []);

  const approveOrder = async (order) => {
    await updateDoc(doc(db, "orders", order.id), {
      status: "approved"
    });
    await updateDoc(doc(db, "products", order.productId), {
      status: "given"
    });

    alert("Sipariş onaylandı ve ürün kilitlendi ✔️");
  };

  const rejectOrder = async (id) => {
    await updateDoc(doc(db, "orders", id), { status: "rejected" });
    alert("Sipariş reddedildi ❌");
  };

  if (!auth.currentUser) return <p>Giriş yapmalısınız.</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Gelen Siparişler</h2>

      {orders.length === 0 && <p>Henüz sipariş yok.</p>}

      {orders.map(o => (
        <div
          key={o.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 16,
            borderRadius: 12,
            background: "#eee",
            marginBottom: 10
          }}
        >
          <div>
            <strong>{o.productName || "Ürün"}</strong>
            <p>Durum: {o.status}</p>
          </div>

          {o.status === "pending" && (
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => approveOrder(o)}
                style={{ background: "green", color: "#fff", border: "none", padding: 8, borderRadius: 8 }}
              >
                <FaCheckCircle /> Onayla
              </button>

              <button
                onClick={() => rejectOrder(o.id)}
                style={{ background: "red", color: "#fff", border: "none", padding: 8, borderRadius: 8 }}
              >
                <FaTimesCircle /> Reddet
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
