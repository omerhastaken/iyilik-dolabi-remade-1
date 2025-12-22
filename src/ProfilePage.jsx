import React, { useState } from "react";
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaCalendar } from "react-icons/fa";
import { auth } from "./firebase";

export default function ProfilePage() {
  const user = auth.currentUser;

  const [info, setInfo] = useState({
    fullname: "",
    birthday: "",
    address: "",
  });

  return (
    <div style={styles.page}>
      <h2 style={styles.title}><FaUser /> Kullanıcı Bilgileri</h2>

      <div style={styles.card}>
        <label style={styles.label}><FaEnvelope /> Email:</label>
        <p style={styles.value}>{user?.email}</p>
      </div>

      <div style={styles.card}>
        <label style={styles.label}><FaUser /> Ad Soyad</label>
        <input
          type="text"
          style={styles.input}
          value={info.fullname}
          onChange={(e) => setInfo({ ...info, fullname: e.target.value })}
        />

        <label style={styles.label}><FaCalendar /> Doğum Tarihi</label>
        <input
          type="date"
          style={styles.input}
          value={info.birthday}
          onChange={(e) => setInfo({ ...info, birthday: e.target.value })}
        />

        <label style={styles.label}><FaMapMarkerAlt /> Adres</label>
        <input
          type="text"
          style={styles.input}
          value={info.address}
          onChange={(e) => setInfo({ ...info, address: e.target.value })}
        />

        <button style={styles.button}>Kaydet</button>
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
  },
  label: {
    marginTop: 10,
    display: "flex",
    alignItems: "center",
    gap: 8
  },
  input: {
    width: "100%",
    padding: 12,
    marginTop: 6,
    borderRadius: 10,
    border: "1px solid #999",
    background: "#ffffff20",
    color: "#fff"
  },
  value: {
    opacity: 0.8
  },
  button: {
    marginTop: 20,
    background: "#ff8a65",
    padding: "12px 18px",
    borderRadius: 10,
    border: "none",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 600
  }
};
