import React, { useState } from "react";
import {
  FaBars,
  FaChevronDown,
  FaChevronUp,
  FaTshirt,
  FaShoePrints,
  FaHome,
  FaSchool,
  FaFemale,
  FaMale,
  FaChild
} from "react-icons/fa";

export default function CategoryMenu({ onSelectCategory }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const categories = [
    {
      name: "Giyim",
      icon: <FaTshirt />,
      subcategories: [
        { name: "Kadın", icon: <FaFemale /> },
        { name: "Erkek", icon: <FaMale /> },
        { name: "Çocuk", icon: <FaChild /> }
      ],
    },
    {
      name: "Ayakkabı",
      icon: <FaShoePrints />,
      subcategories: [
        { name: "Kadın", icon: <FaFemale /> },
        { name: "Erkek", icon: <FaMale /> },
        { name: "Çocuk", icon: <FaChild /> }
      ],
    },
    { name: "Okul Malzemeleri", icon: <FaSchool /> },
    { name: "Ev Eşyası", icon: <FaHome /> },
  ];

  return (
    <div style={{ position: "relative", marginLeft: 15 }}>
      {/* 🍔 Menü Butonu */}
      <FaBars
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          fontSize: 26,
          color: "#fff",
          cursor: "pointer",
          marginLeft: 10,
          zIndex: 1000,
          position: "relative",
        }}
      />

      {/* 🌙 Menü Alanı */}
      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: 0,
            background: "linear-gradient(145deg, #3b2a26, #6b4a3f)",
            borderRadius: 12,
            boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
            padding: "12px 0",
            zIndex: 999,
            width: 240,
            color: "#fff",
            fontFamily: "Poppins, sans-serif",
            overflow: "hidden",
          }}
        >
          {/* 🌟 Parlayan Arka Plan Animasyonu */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at var(--x, 0%) var(--y, 0%), rgba(255,255,255,0.15), transparent 50%)",
              animation: "lightMove 6s infinite linear",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />

          {/* 🌟 Stil Animasyonu */}
          <style>
            {`
              @keyframes lightMove {
                0% { --x: 0%; --y: 0%; }
                25% { --x: 100%; --y: 0%; }
                50% { --x: 100%; --y: 100%; }
                75% { --x: 0%; --y: 100%; }
                100% { --x: 0%; --y: 0%; }
              }
            `}
          </style>

          {/* 🔽 Menü İçeriği */}
          <div style={{ position: "relative", zIndex: 1 }}>
            {categories.map((cat, index) => (
              <div key={index}>
                <div
                  onClick={() => {
                    if (cat.subcategories) {
                      setOpenSubmenu(openSubmenu === cat.name ? null : cat.name);
                    } else {
                      onSelectCategory(cat.name);
                      setMenuOpen(false);
                    }
                  }}
                  style={{
                    padding: "12px 16px",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "all 0.3s ease",
                    background:
                      openSubmenu === cat.name ? "rgba(255,255,255,0.12)" : "transparent",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ color: "#ffd9b3" }}>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </div>
                  {cat.subcategories &&
                    (openSubmenu === cat.name ? (
                      <FaChevronUp size={12} />
                    ) : (
                      <FaChevronDown size={12} />
                    ))}
                </div>

                {/* 🧒 Alt Başlıklar */}
                {openSubmenu === cat.name && cat.subcategories && (
                  <div
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      paddingLeft: 22,
                      paddingBottom: 6,
                      transition: "max-height 0.3s ease",
                    }}
                  >
                    {cat.subcategories.map((sub, subIndex) => (
                      <div
                        key={subIndex}
                        onClick={() => {
                          onSelectCategory(sub.name);
                          setMenuOpen(false);
                        }}
                        style={{
                          padding: "8px 0",
                          cursor: "pointer",
                          fontSize: 14,
                          borderBottom: "1px solid rgba(255,255,255,0.1)",
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          color: "#f5f5f5",
                        }}
                      >
                        <span style={{ color: "#ffc9a9" }}>{sub.icon}</span>
                        {sub.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
