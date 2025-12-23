// 🌟 Trendyol Tarzı Hesabım Sayfası
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import {
  FaBox,
  FaPlusCircle,
  FaCheckCircle,
  FaListAlt,
  FaShieldAlt,
  FaUser,
  FaQuestionCircle,
  FaSignOutAlt
} from "react-icons/fa";

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  if (!user) {
    return (
      <div style={styles.centerBox}>
        <h2 style={styles.title}>Hesabım</h2>
        <p style={{ color: "#fff" }}>Devam etmek için giriş yapmanız gerekiyor.</p>

        <Link to="/login" style={styles.loginButton}>
          Google ile Giriş Yap
        </Link>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* Glow Arka Plan */}
      <div style={styles.glow1}></div>
      <div style={styles.glow2}></div>

      <h2 style={styles.header}>Hesabım</h2>

      {/* Kullanıcı Kartı */}
      <div style={styles.userCard}>
        <FaUser size={40} color="#fff" />
        <div>
          <p style={styles.userEmail}>{user.email}</p>
          <p style={styles.userText}>Hoş geldin 💛</p>
        </div>
      </div>

      {/* Menü Kutuları */}
      <div style={styles.menuGrid}>

        {/* Eklediğim Ürünler */}
        <div style={styles.menuBox} onClick={() => navigate("/my-products")}>
          <FaBox size={28} color="#ffddb0" />
          <p>Eklediğim Ürünler</p>
        </div>

        {/* Ürün Ekle */}
        <div style={styles.menuBox} onClick={() => navigate("/add-donation")}>
          <FaPlusCircle size={28} color="#ffddb0" />
          <p>Ürün Ekle</p>
        </div>

        {/* Gelen Siparişler */}
        <div style={styles.menuBox} onClick={() => navigate("/incoming-orders")}>
          <FaCheckCircle size={28} color="#ffddb0" />
          <p>Gelen Siparişler</p>
        </div>

        {/* Siparişlerim */}
        <div style={styles.menuBox} onClick={() => navigate("/my-orders")}>
          <FaListAlt size={28} color="#ffddb0" />
          <p>Tüm Siparişlerim</p>
        </div>

        {/* Güvenlik */}
        <div style={styles.menuBox} onClick={() => navigate("/security")}>
          <FaShieldAlt size={28} color="#ffddb0" />
          <p>Güvenlik</p>
        </div>

        {/* Kullanıcı Bilgileri */}
        <div style={styles.menuBox} onClick={() => navigate("/profile")}>
          <FaUser size={28} color="#ffddb0" />
          <p>Kullanıcı Bilgileri</p>
        </div>

        {/* Yardım */}
        <div style={styles.menuBox} onClick={() => navigate("/help")}>
          <FaQuestionCircle size={28} color="#ffddb0" />
          <p>Yardım</p>
        </div>
      </div>

      {/* Çıkış yap */}
      <button style={styles.logoutButton} onClick={handleLogout}>
        <FaSignOutAlt size={18} /> Çıkış Yap
      </button>
    </div>
  );
}

/* 🎨 STYLES */
const styles = {
  page: {
    padding: 24,
    minHeight: "100vh",
    background: "linear-gradient(145deg, #3c2f28, #1e1a17)",
    position: "relative",
    overflow: "hidden",
    color: "#fff",
    fontFamily: "Poppins, sans-serif"
  },

  glow1: {
    position: "absolute",
    width: 250,
    height: 250,
    background: "#ffb47d50",
    borderRadius: "50%",
    top: "-40px",
    left: "-40px",
    filter: "blur(80px)"
  },

  glow2: {
    position: "absolute",
    width: 300,
    height: 300,
    background: "#ff8a6550",
    borderRadius: "50%",
    bottom: "-50px",
    right: "-40px",
    filter: "blur(90px)"
  },

  header: {
    fontSize: 32,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "700",
  },

  centerBox: {
    padding: 40,
    textAlign: "center",
    background: "#3c2f28",
    minHeight: "100vh",
    color: "#fff",
  },

  loginButton: {
    marginTop: 20,
    display: "inline-block",
    padding: "12px 24px",
    borderRadius: 12,
    background: "#ff8a65",
    color: "#fff",
    textDecoration: "none",
    fontSize: 18,
    fontWeight: 600
  },

  userCard: {
    display: "flex",
    alignItems: "center",
    gap: 15,
    padding: 16,
    background: "rgba(255,255,255,0.08)",
    borderRadius: 16,
    marginBottom: 20
  },

  userEmail: {
    margin: 0,
    fontSize: 18,
    fontWeight: "600"
  },

  userText: {
    margin: 0,
    fontSize: 14,
    opacity: 0.8
  },

  menuGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
    marginTop: 10
  },

  menuBox: {
    background: "rgba(255,255,255,0.07)",
    padding: 20,
    borderRadius: 16,
    textAlign: "center",
    cursor: "pointer",
    transition: "0.25s",
    fontWeight: "600"
  },

  logoutButton: {
    marginTop: 30,
    width: "100%",
    padding: 14,
    background: "#b34747",
    borderRadius: 12,
    border: "none",
    color: "#fff",
    fontSize: 18,
    cursor: "pointer",
    fontWeight: 700
  }
};
