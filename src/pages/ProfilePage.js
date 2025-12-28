import React, { useState } from "react";
import { auth } from "../firebase";
import { FaUser, FaEnvelope, FaHome, FaPhone, FaCalendar } from "react-icons/fa";

export default function ProfilePage() {
  const user = auth.currentUser;
  const [form, setForm] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    phone: "",
    address: "",
    birthday: "",
  });

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));
  const fields = [
    { label: "Ad Soyad", icon: <FaUser />, key: "name", type: "text" },
    { label: "E-posta", icon: <FaEnvelope />, key: "email", type: "text", disabled: true },
    { label: "Telefon", icon: <FaPhone />, key: "phone", type: "text" },
    { label: "Adres", icon: <FaHome />, key: "address", type: "textarea" },
    { label: "Doğum Tarihi", icon: <FaCalendar />, key: "birthday", type: "date" },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Kullanıcı Bilgilerim</h2>
      <div style={styles.formBox}>
        {fields.map(({ label, icon, key, type, disabled }) => (
          <div key={key}>
            <label style={styles.label}>{icon} {label}</label>
            {type === "textarea" ? (
              <textarea 
                style={styles.textarea} 
                value={form[key]} 
                onChange={(e) => handleChange(key, e.target.value)} 
              />
            ) : (
              <input 
                type={type} 
                style={styles.input} 
                value={form[key]} 
                disabled={disabled}
                onChange={(e) => handleChange(key, e.target.value)} 
              />
            )}
          </div>
        ))}
        <button style={styles.saveBtn}>Bilgileri Güncelle</button>
      </div>
    </div>
  );
}

// 🎨 STYLES

const styles = {
  container: { padding: "30px", maxWidth: "600px", margin: "0 auto", background: "#fdf9f5", borderRadius: "18px" },
  formBox: { display: "flex", flexDirection: "column", gap: "14px" },
  label: { fontWeight: "bold", display: "flex", alignItems: "center", gap: "8px", color: "#6e4f33" },
  input: { padding: "12px", borderRadius: "10px", border: "1px solid #c7b299", width: "100%" },
  textarea: { padding: "12px", borderRadius: "10px", border: "1px solid #c7b299", width: "100%", height: "80px", resize: "none" },
  saveBtn: { marginTop: "15px", padding: "14px", borderRadius: "12px", background: "#6b4f3b", color: "white", border: "none", cursor: "pointer" },
  title: { textAlign: "center", color: "#4b3621" }
};

const container = {
  padding: "30px",
  maxWidth: "600px",
  margin: "0 auto",
  background: "#fdf9f5",
  borderRadius: "18px",
  boxShadow: "0 0 25px rgba(0,0,0,0.13)",
};

const title = {
  fontSize: "28px",
  color: "#4b3621",
  textAlign: "center",
  marginBottom: "25px",
  fontWeight: "900",
};

const formBox = {
  display: "flex",
  flexDirection: "column",
  gap: "14px",
};

const label = {
  fontSize: "16px",
  color: "#6e4f33",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const input = {
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #c7b299",
  background: "#fff",
  fontSize: "15px",
  outline: "none",
};

const textarea = {
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #c7b299",
  background: "#fff",
  fontSize: "15px",
  height: "80px",
  resize: "none",
};

const saveBtn = {
  marginTop: "15px",
  padding: "14px",
  borderRadius: "12px",
  background: "#6b4f3b",
  color: "white",
  fontSize: "16px",
  fontWeight: "bold",
  border: "none",
  cursor: "pointer",
  transition: "0.2s",
};
