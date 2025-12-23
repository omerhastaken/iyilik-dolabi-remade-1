import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase";
import styled from "styled-components";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const ref = doc(db, "products", id);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setProduct({ id: snap.id, ...snap.data() });
        }
      } catch (err) {
        alert("Ürün yüklenemedi");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleRequest = async () => {
    if (!auth.currentUser) {
      alert("Lütfen giriş yapın");
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        productId: product.id,
        productName: product.name,
        productImage: product.images?.[0] || "",
        ownerUid: product.ownerUid,
        buyerUid: auth.currentUser.uid,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      alert("Talep gönderildi");
    } catch (err) {
      alert("Talep gönderilemedi");
    }
  };

  if (loading) return <p>Yükleniyor...</p>;
  if (!product) return <p>Ürün bulunamadı</p>;

  return (
    <Container>
      {product.images?.[0] && (
        <ProductImage src={product.images[0]} alt={product.name} />
      )}

      <ProductTitle>{product.name}</ProductTitle>
      <ProductInfo>Kategori: {product.category}</ProductInfo>
      <ProductInfo>Durum: {product.condition}</ProductInfo>
      <ProductInfo>Beden: {product.size}</ProductInfo>

      <RequestButton onClick={handleRequest}>
        Ürünü Talep Et
      </RequestButton>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
`;

const ProductImage = styled.img`
  width: 100%;
  border-radius: 12px;
  object-fit: cover;
`;

const ProductTitle = styled.h2`
  margin-top: 15px;
  color: #333;
`;

const ProductInfo = styled.p`
  color: #666;
  margin: 5px 0;
`;

const RequestButton = styled.button`
  margin-top: 20px;
  padding: 14px;
  border-radius: 12px;
  border: none;
  background: #ff8a65;
  color: #fff;
  width: 100%;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #e67a5b;
  }
`;