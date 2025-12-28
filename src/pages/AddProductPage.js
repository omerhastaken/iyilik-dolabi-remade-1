import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaSave, FaTshirt, FaCamera, FaTag } from "react-icons/fa";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase";

export default function AddProductPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "Giyim",
    size: "",
    price: "",
    condition: "Sıfır",
  });
  const [images, setImages] = useState([null, null, null, null]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    // Simple size check (2MB limit warning)
    if (file.size > 2 * 1024 * 1024) {
      alert("Fotoğraf çok büyük! Lütfen 2MB'dan küçük bir fotoğraf seç.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const newImgs = [...images];
      newImgs[index] = reader.result;
      setImages(newImgs);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.price) {
      alert("Lütfen ürün adı ve fiyatını gir!");
      return;
    }
    if (!auth.currentUser) {
      alert("Önce giriş yapmalısın!");
      return;
    }

    setLoading(true);

    try {
      const newProduct = {
        ...formData,
        price: Number(formData.price), // Ensure price is a number
        images: images.filter((img) => img !== null), // Remove empty slots
        createdAt: serverTimestamp(),
        ownerUid: auth.currentUser.uid,
        ownerEmail: auth.currentUser.email,
      };

      await addDoc(collection(db, "products"), newProduct);

      alert("Ürün başarıyla vitrine eklendi! 🚀");
      navigate("/my-products");
    } catch (error) {
      console.error("Error adding document: ", error);
      if (
        error.code === "resource-exhausted" ||
        error.message.includes("exceeds")
      ) {
        alert(
          "Hata: Fotoğraflar çok büyük! Firestore limitini aşıyor. Daha az veya daha küçük fotoğraf yükle."
        );
      } else {
        alert("Bir hata oluştu: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <Header>
        <h1>Yeni İyilik Ekle ✨</h1>
        <p>Dolabındaki fazlalıkları iyiliğe dönüştür.</p>
      </Header>

      <GlassForm>
        {/* Image Upload Section */}
        <ImageSection>
          <SectionTitle>
            <FaCamera /> Fotoğraflar
          </SectionTitle>
          <ImageGrid>
            {images.map((img, i) => (
              <ImageUploadBox key={i}>
                <input
                  type="file"
                  accept="image/*"
                  id={`img-${i}`}
                  style={{ display: "none" }}
                  onChange={(e) => handleImageChange(e, i)}
                />
                <label htmlFor={`img-${i}`}>
                  {img ? <PreviewImg src={img} /> : <FaPlus />}
                </label>
                {img && (
                  <RemoveBtn
                    onClick={() => {
                      const newImgs = [...images];
                      newImgs[i] = null;
                      setImages(newImgs);
                    }}
                  >
                    x
                  </RemoveBtn>
                )}
              </ImageUploadBox>
            ))}
          </ImageGrid>
          <InfoNote>
            ℹ️ İpucu: Yatay çekilmiş aydınlık fotoğraflar daha hızlı satılır.
          </InfoNote>
        </ImageSection>

        {/* Details Section */}
        <DetailsSection>
          <SectionTitle>
            <FaTag /> Detaylar
          </SectionTitle>

          <InputGroup>
            <Label>Ürün Başlığı</Label>
            <GlassInput
              name="name"
              placeholder="Örn: Zara Kot Ceket"
              value={formData.name}
              onChange={handleChange}
            />
          </InputGroup>

          <Row>
            <InputGroup>
              <Label>Fiyat (TL)</Label>
              <GlassInput
                name="price"
                type="number"
                placeholder="0"
                value={formData.price}
                onChange={handleChange}
              />
            </InputGroup>

            <InputGroup>
              <Label>Kategori</Label>
              <GlassSelect
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option>Giyim</option>
                <option>Ayakkabı</option>
                <option>Teknoloji</option>
                <option>Ev Eşyası</option>
                <option>Kitap</option>
              </GlassSelect>
            </InputGroup>
          </Row>

          <Row>
            <InputGroup>
              <Label>Beden / Ölçü</Label>
              <GlassInput
                name="size"
                placeholder="Örn: M, 38, Standart"
                value={formData.size}
                onChange={handleChange}
              />
            </InputGroup>

            <InputGroup>
              <Label>Kullanım Durumu</Label>
              <GlassSelect
                name="condition"
                value={formData.condition}
                onChange={handleChange}
              >
                <option>Sıfır (Etiketli)</option>
                <option>Az Kullanılmış</option>
                <option>İyi Durumda</option>
                <option>Yıpranmış</option>
              </GlassSelect>
            </InputGroup>
          </Row>

          <SaveButton onClick={handleSave} disabled={loading}>
            {loading ? (
              "Yükleniyor..."
            ) : (
              <>
                <FaSave /> Vitrine Koy
              </>
            )}
          </SaveButton>
        </DetailsSection>
      </GlassForm>
    </PageContainer>
  );
}

/* 🎨 SCIFI GLASS STYLES */

const PageContainer = styled.div`
  padding: 40px 20px;
  max-width: 900px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
  h1 {
    font-size: 32px;
    font-weight: 800;
    margin: 0;
  }
  p {
    opacity: 0.7;
    margin-top: 10px;
  }
`;

const GlassForm = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SectionTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 20px 0;
  font-size: 18px;
  color: #ffddb0;
`;

const ImageSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 24px;
  height: fit-content;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
`;

const ImageUploadBox = styled.div`
  aspect-ratio: 1;
  border: 2px dashed rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: 0.2s;

  &:hover {
    border-color: #ffddb0;
    background: rgba(255, 255, 255, 0.05);
  }

  label {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 24px;
    color: rgba(255, 255, 255, 0.5);
  }
`;

const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RemoveBtn = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoNote = styled.p`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 15px;
  text-align: center;
`;

const DetailsSection = styled.div`
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0.01)
  );
  backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 30px;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 8px;
  opacity: 0.8;
  margin-left: 5px;
`;

const GlassInput = styled.input`
  width: 100%;
  padding: 14px 16px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  color: white;
  font-size: 15px;
  outline: none;
  box-sizing: border-box;
  transition: 0.3s;

  &:focus {
    border-color: rgba(255, 255, 255, 0.3);
    background: rgba(0, 0, 0, 0.4);
  }
`;

const GlassSelect = styled.select`
  width: 100%;
  padding: 14px 16px;
  background: rgba(
    30,
    30,
    30,
    0.9
  ); /* Darker bg for select dropdown visibility */
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  color: white;
  font-size: 15px;
  outline: none;
  box-sizing: border-box;
  cursor: pointer;
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0;
  }
`;

const SaveButton = styled.button`
  width: 100%;
  padding: 18px;
  background: linear-gradient(90deg, #ff8c6e, #ff6b6b);
  border: none;
  border-radius: 18px;
  color: white;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: 0.3s;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};

  &:hover {
    transform: ${(props) => (props.disabled ? "none" : "translateY(-2px)")};
    box-shadow: ${(props) =>
      props.disabled ? "none" : "0 10px 20px rgba(255, 107, 107, 0.3)"};
  }
`;
