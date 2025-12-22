import React from "react";
import { FaLock, FaKey } from "react-icons/fa";

export default function SecurityPage() {
  return (
    <div style={styles.page}>
      <div style={styles.glow}></div>

      <h2 style={styles.title}><FaLock /> Güvenlik</h2>

      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Şifre Değiştir</h3>
        <p style={styles.text}>Şifre değişikliği şu anda Google hesabınız üzerinden yapılmaktadır.</p>
        <button style={styles.button}>Google Şifre Ayarlarını Aç</button>
      </div>

      <div style={styles.card}>
        <h3 style={styles.cardTitle}><FaKey /> İki Adımlı Doğrulama</h3>
        <p style={styles.text}>2FA doğrulama yakında kullanılabilir olacak.</p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: 30,
    minHeight: "100vh",
    background: "linear-gradient(145deg,#3c2f28,#1e1a17)",
    color: "#fff",
    position: "relative",
    overflow: "hidden",
    fontFamily: "Poppins"
  },
  glow: {
    position: "absolute",
    width: 250,
    height: 250,
    background: "#ff8a6550",
    borderRadius: "50%",
    top: "-30px",
    right: "-40px",
    filter: "blur(90px)",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 20,
    display: "flex",
    alignItems: "center",
    gap: 10
  },
  card: {
    background: "rgba(255,255,255,0.07)",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20
  },
  cardTitle: {
    fontSize: 20,
    marginBottom: 10
  },
  text: {
    opacity: 0.8,
    marginBottom: 10
  },
  button: {
    background: "#ff8a65",
    color: "#fff",
    padding: "10px 16px",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    fontWeight: 600
  }
};
