import React from "react";
import { FaQuestionCircle, FaEnvelope } from "react-icons/fa";

export default function HelpPage() {
  return (
    <div style={styles.page}>
      <h2 style={styles.title}><FaQuestionCircle /> Yardım Merkezi</h2>

      <div style={styles.card}>
        <h3>Sık Sorulan Sorular</h3>
        <p>• Ürün nasıl eklerim?</p>
        <p>• Siparişim nerede?</p>
        <p>• Bir kullanıcıyı nasıl şikayet ederim?</p>
      </div>

      <div style={styles.card}>
        <h3><FaEnvelope /> Destek</h3>
        <p>Bize ulaş: iyilik-dolabi@destek.com</p>
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
    fontFamily: "Poppins"
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
  }
};
