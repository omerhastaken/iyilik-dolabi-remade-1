import React, { useState } from "react";
import { auth } from "../firebase";
import { FaUser, FaCalendar, FaEnvelope, FaHome, FaPhone } from "react-icons/fa";

export default function ProfilePage() {
  const user = auth.currentUser;

  const [form, setForm] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    phone: "",
    address: "",
    birthday: "",
  });

  return (
    <div style={container}>
      <h2 style={title}>Kullanıcı Bilgilerim</h2>

      {/* FORM */}
      <div style={formBox}>

        {/* AD SOYAD */}
        <label style={label}><FaUser /> Ad Soyad</label>
        <input
          style={input}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Adınızı girin"
        />

        {/* E-POSTA */}
        <label style={label}><FaEnvelope /> E-posta</label>
        <input
          style={input}
          value={form.email}
          disabled
        />

        {/* TELEFON */}
        <label style={label}><FaPhone /> Telefon</label>
        <input
          style={input}
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="Telefon numaranız"
        />

        {/* ADRES */}
        <label style={label}><FaHome /> Adres</label>
        <textarea
          style={textarea}
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          placeholder="Adresinizi girin"
        />

        {/* DOĞUM TARİHİ */}
        <label style={label}><FaCalendar /> Doğum Tarihi</label>
        <input
          type="date"
          style={input}
          value={form.birthday}
          onChange={(e) => setForm({ ...form, birthday: e.target.value })}
        />

        {/* KAYDET BUTONU */}
        <button style={saveBtn}>Bilgileri Güncelle</button>
      </div>
    </div>
  );
}

// 🎨 STYLES

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
