import React from "react";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Google giriş başarısız");
    }
  };

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h2>Google ile Giriş</h2>
      <button
        onClick={handleLogin}
        style={{
          padding: "14px 24px",
          borderRadius: 10,
          border: "none",
          background: "#ff8c6e",
          color: "#fff",
          fontSize: 18,
          cursor: "pointer"
        }}
      >
        Google ile Giriş Yap
      </button>
    </div>
  );
}
