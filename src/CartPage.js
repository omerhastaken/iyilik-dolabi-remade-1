// 📦 Gerekli modüller
import React, { useState } from "react";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { db, auth } from "./firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function CartPage({
  cart,
  products,
  removeFromCart = () => {},
  updateQuantity = () => {}
}) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    postal: "",
    note: ""
  });

  // Sepetteki ürünler
  const cartProducts = products.filter((p) =>
    cart.some((c) => c.id === p.id)
  );

  // Sipariş tamamlama
  const handlePlaceOrder = async () => {
    if (!auth.currentUser) {
      alert("Sipariş verebilmek için giriş yapmalısınız!");
      return;
    }

    if (!address.name || !address.phone || !address.city || !address.postal) {
      alert("Lütfen tüm zorunlu alanları doldurun!");
      return;
    }

    try {
      for (const product of cartProducts) {
        await addDoc(collection(db, "orders"), {
          productId: product.id,
          productName: product.name,
          productImage: product.img,
          sellerUid: product.ownerUid || null, // ürün sahibine bildirim
          buyerUid: auth.currentUser.uid,
          buyerEmail: auth.currentUser.email,
          ...address,
          createdAt: serverTimestamp()
        });
      }

      setOrderPlaced(true);
      setShowCheckout(false);
    } catch (err) {
      console.error(err);
      alert("Sipariş oluşturulurken bir hata oluştu!");
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 1100, margin: "0 auto" }}>
      <h2 style={{ marginBottom: 18 }}>Sepetim</h2>

      {cartProducts.length === 0 ? (
        <p style={{ color: "#5b4437", fontSize: 16 }}>Sepetiniz boş.</p>
      ) : (
        <div style={{ display: "grid", gap: 18 }}>
          {cartProducts.map((product) => {
            const cartItem = cart.find((c) => c.id === product.id);
            return (
              <div key={product.id} style={cardStyle}>
                <img
                  src={product.img}
                  alt={product.name}
                  style={productImage}
                />

                <div style={{ flex: 1, paddingLeft: 14 }}>
                  <h3 style={{ margin: 0 }}>{product.name}</h3>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginTop: 8
                    }}
                  >
                    <button
                      onClick={() =>
                        updateQuantity(product.id, (cartItem.quantity || 1) + 1)
                      }
                      style={qtyButton}
                    >
                      <FaPlus />
                    </button>

                    <span style={{ fontWeight: 700 }}>
                      {cartItem.quantity || 1}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(product.id, (cartItem.quantity || 1) - 1)
                      }
                      style={qtyButton}
                    >
                      <FaMinus />
                    </button>

                    <button
                      onClick={() => removeFromCart(product.id)}
                      style={removeButton}
                    >
                      <FaTrash /> Kaldır
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Ödeme butonu */}
          {!orderPlaced && (
            <button
              onClick={() => setShowCheckout(!showCheckout)}
              style={checkoutButton}
            >
              {showCheckout ? "Formu Gizle" : "Ödeme ve Adres Bilgileri"}
            </button>
          )}

          {/* Adres formu */}
          {showCheckout && !orderPlaced && (
            <div style={checkoutForm}>
              <input
                type="text"
                placeholder="Ad Soyad*"
                value={address.name}
                onChange={(e) =>
                  setAddress({ ...address, name: e.target.value })
                }
                style={inputStyle}
              />

              <input
                type="text"
                placeholder="Telefon*"
                value={address.phone}
                onChange={(e) =>
                  setAddress({ ...address, phone: e.target.value })
                }
                style={inputStyle}
              />

              <input
                type="text"
                placeholder="Şehir*"
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
                style={inputStyle}
              />

              <input
                type="text"
                placeholder="Posta Kodu*"
                value={address.postal}
                onChange={(e) =>
                  setAddress({ ...address, postal: e.target.value })
                }
                style={inputStyle}
              />

              <button onClick={handlePlaceOrder} style={placeOrderButton}>
                Siparişi Ver
              </button>
            </div>
          )}

          {orderPlaced && (
            <div style={orderPlacedPanel}>
              <h3>Siparişiniz Alındı! 🎉</h3>
              <p>
                Siparişiniz iletildi. Ürün sahibine bildirim gönderildi.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ---- Tasarım Stilleri ---- */

const cardStyle = {
  display: "flex",
  background: "linear-gradient(135deg, #565452ff 0%, #ffd7c1 100%)",
  borderRadius: 14,
  padding: 14,
  alignItems: "center",
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
};

const productImage = {
  width: 120,
  height: 90,
  borderRadius: 10,
  objectFit: "cover"
};

const qtyButton = {
  padding: 6,
  borderRadius: 8,
  border: "none",
  background: "#373736ff",
  color: "#fff",
  cursor: "pointer"
};

const removeButton = {
  marginLeft: "auto",
  padding: "6px 10px",
  borderRadius: 8,
  border: "none",
  background: "#444141ff",
  color: "#fff",
  cursor: "pointer",
  display: "flex",
  alignItems: "center"
};

const checkoutButton = {
  marginTop: 12,
  padding: 10,
  borderRadius: 10,
  border: "none",
  background: "#3e3c3bff",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer"
};

const checkoutForm = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
  marginTop: 10,
  background: "#fff3e3",
  padding: 14,
  borderRadius: 10
};

const inputStyle = {
  padding: 8,
  borderRadius: 8,
  border: "1px solid #e3d9d4"
};

const placeOrderButton = {
  marginTop: 8,
  padding: 10,
  borderRadius: 10,
  border: "none",
  background: "#e05729ff",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer"
};

const orderPlacedPanel = {
  marginTop: 12,
  padding: 14,
  borderRadius: 10,
  background: "#e0f7fa",
  color: "#006064",
  fontWeight: 700
};
