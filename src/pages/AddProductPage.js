// src/AddProductPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaSave } from "react-icons/fa";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase"; // <<< EKLEDİK

export default function AddProductPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Giyim");
  const [size, setSize] = useState("");
  const [condition, setCondition] = useState("Sıfır");
  const [images, setImages] = useState([null, null, null, null]);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const newImgs = [...images];
      newImgs[index] = reader.result;
      setImages(newImgs);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!name) {
      alert("Lütfen ürün adını girin!");
      return;
    }
    if (!auth.currentUser) {
      alert("Önce giriş yapmalısın!");
      return;
    }

    const newProduct = {
      name,
      category,
      size: size || "-",
      condition,
      images: images.filter(img => img),
      createdAt: serverTimestamp(),
      ownerUid: auth.currentUser.uid       // <<< EKLEDİK
    };

    await addDoc(collection(db, "products"), newProduct);

    alert("Ürün başarıyla eklendi!");
    navigate("/my-products");
  };

  return (
    <div style={container}>
      <h2>Yeni Ürün Ekle</h2>
      <input style={input} placeholder="Ürün Adı" value={name} onChange={e => setName(e.target.value)} />
      <select style={input} value={category} onChange={e => setCategory(e.target.value)}>
        <option>Giyim</option>
        <option>Ayakkabı</option>
        <option>Okul Malzemeleri</option>
        <option>Ev Eşyası</option>
      </select>
      {(category === "Giyim" || category === "Ayakkabı") &&
        <input style={input} placeholder={category === "Giyim" ? "Beden" : "Numara"} value={size} onChange={e => setSize(e.target.value)} />
      }
      <select style={input} value={condition} onChange={e => setCondition(e.target.value)}>
        <option>Sıfır</option>
        <option>Az Kullanılmış</option>
        <option>Çok Kullanılmış</option>
      </select>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {images.map((img, i) => (
          <div key={i} style={imgBox}>
            <input type="file" accept="image/*" id={`img${i}`} style={{ display: "none" }} onChange={e => handleImageChange(e, i)} />
            <label htmlFor={`img${i}`} style={imgLabel}>{img ? <img src={img} alt="" style={preview} /> : <FaPlus />}</label>
          </div>
        ))}
      </div>

      <button style={btn} onClick={handleSave}><FaSave /> Kaydet</button>
    </div>
  );
}

const container = { maxWidth: 500, margin: "40px auto", padding: 20, background: "#fff7f0", borderRadius: 16 };
const input = { padding: 12, marginTop: 10, borderRadius: 8, border: "1px solid #ccc", width: "100%" };
const imgBox = { width: 70, height: 70, border: "2px dashed #ccc", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" };
const imgLabel = { width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" };
const preview = { width: "100%", height: "100%", objectFit: "cover" };
const btn = { marginTop: 20, padding: 12, borderRadius: 12, border: "none", background: "#ff8c6e", color: "#fff", cursor: "pointer", fontWeight: 700 };
