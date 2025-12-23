import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, query, where, onSnapshot, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "orders"),
      where("buyerUid", "==", auth.currentUser.uid)
    );

    const unsub = onSnapshot(q, async (snapshot) => {
      const list = [];

      for (let docItem of snapshot.docs) {
        const orderData = docItem.data();

        // ÜRÜN BİLGİSİNİ ÇEK
        const productRef = doc(db, "products", orderData.productId);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          list.push({
            id: docItem.id,
            ...orderData,
            product: productSnap.data()
          });
        }
      }

      setOrders(list);
    });

    return () => unsub();
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.glow}></div>

      <h2 style={styles.title}>Siparişlerim</h2>

      {orders.length === 0 && (
        <p style={styles.empty}>Henüz bir sipariş vermediniz.</p>
      )}

      <div style={styles.list}>
        {orders.map(order => (
          <div
            key={order.id}
            style={styles.card}
            onClick={() => navigate(`/product/${order.productId}`)}
          >
            <img
              src={order.product?.images?.[0] || "https://via.placeholder.com/150"}
              alt=""
              style={styles.image}
            />

            <div style={{ flex: 1 }}>
              <h3 style={styles.name}>{order.product?.name}</h3>
              <p style={styles.category}>{order.product?.category}</p>

              <p style={styles.status}>
                Durum:
                <span style={{
                  color:
                    order.status === "pending" ? "#ffdd99" :
                    order.status === "approved" ? "#7CFC00" :
                    "#ff6b6b"
                }}>
                  {" "}{order.status === "pending" && "Bekliyor"}
                  {order.status === "approved" && "Onaylandı"}
                  {order.status === "rejected" && "Reddedildi"}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

/* ----------- STYLES ----------- */
const styles = {
  page: {
    padding: 20,
    minHeight: "100vh",
    background: "linear-gradient(145deg, #3c2f28, #1e1a17)",
    color: "#fff",
    fontFamily: "Poppins",
    position: "relative",
    overflow: "hidden"
  },
  glow: {
    position: "absolute",
    width: 250,
    height: 250,
    background: "#ff8a6550",
    borderRadius: "50%",
    top: "-40px",
    right: "-40px",
    filter: "blur(90px)",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center"
  },
  empty: {
    textAlign: "center",
    opacity: 0.7,
    marginTop: 40
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 16
  },
  card: {
    display: "flex",
    gap: 14,
    background: "rgba(255,255,255,0.08)",
    padding: 14,
    borderRadius: 16,
    cursor: "pointer",
    transition: "0.2s"
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 12,
    objectFit: "cover"
  },
  name: {
    margin: 0,
    fontSize: 20
  },
  category: {
    margin: "4px 0",
    opacity: 0.8
  },
  status: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "600"
  }
};
