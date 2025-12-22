// src/AccountCenter.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  FaBoxOpen,
  FaPlusCircle,
  FaList,
  FaShoppingBag,
  FaShieldAlt,
  FaUserCircle,
  FaQuestionCircle
} from "react-icons/fa";

export default function AccountCenter() {
  const cardStyle = {
    background: "rgba(60,45,38,0.6)",
    backdropFilter: "blur(8px)",
    borderRadius: 16,
    padding: "18px 20px",
    marginBottom: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#fff",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    transition: "transform 0.2s"
  };

  const iconStyle = { fontSize: 22, color: "#ffcc99" };

  return (
    <div style={{ padding: 24 }}>
      <h2
        style={{
          textAlign: "center",
          color: "#3b2f28",
          fontSize: 28,
          marginBottom: 20,
          fontWeight: "bold"
        }}
      >
        Hesap Merkezim
      </h2>

      {/* Kullanıcı Bilgilerim */}
      <Link to="/account/info" style={{ textDecoration: "none" }}>
        <div style={cardStyle}>
          <span>🧑 Kullanıcı Bilgilerim</span>
          <FaUserCircle style={iconStyle} />
        </div>
      </Link>

      {/* Ürün Ekle */}
      <Link to="/account/add-product" style={{ textDecoration: "none" }}>
        <div style={cardStyle}>
          <span>🎁 Ürün Bağışla</span>
          <FaPlusCircle style={iconStyle} />
        </div>
      </Link>

      {/* Eklediğim Ürünler */}
      <Link to="/account/my-products" style={{ textDecoration: "none" }}>
        <div style={cardStyle}>
          <span>📦 Eklediğim Ürünler</span>
          <FaBoxOpen style={iconStyle} />
        </div>
      </Link>

      {/* Gelen Siparişler */}
      <Link to="/account/incoming-orders" style={{ textDecoration: "none" }}>
        <div style={cardStyle}>
          <span>📬 Gelen Sipariş Talepleri</span>
          <FaList style={iconStyle} />
        </div>
      </Link>

      {/* Tüm Siparişlerim */}
      <Link to="/account/my-orders" style={{ textDecoration: "none" }}>
        <div style={cardStyle}>
          <span>🛍 Tüm Siparişlerim</span>
          <FaShoppingBag style={iconStyle} />
        </div>
      </Link>

      {/* Güvenlik */}
      <Link to="/account/security" style={{ textDecoration: "none" }}>
        <div style={cardStyle}>
          <span>🔐 Güvenlik</span>
          <FaShieldAlt style={iconStyle} />
        </div>
      </Link>

      {/* Yardım */}
      <Link to="/account/support" style={{ textDecoration: "none" }}>
        <div style={cardStyle}>
          <span>❓ Yardım</span>
          <FaQuestionCircle style={iconStyle} />
        </div>
      </Link>
    </div>
  );
}
