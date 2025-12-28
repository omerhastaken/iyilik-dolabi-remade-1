import React, { useState } from "react";
import styled from "styled-components";
import {
  FaTrash,
  FaPlus,
  FaMinus,
  FaCreditCard,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { db, auth } from "./firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function CartPage({
  cart,
  products,
  removeFromCart = () => {},
  updateQuantity = () => {},
}) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    postal: "",
    note: "",
  });

  // Filter products that are in the cart
  const cartProducts = products.filter((p) => cart.some((c) => c.id === p.id));

  // Calculate Total Price (if you have prices)
  const totalPrice = cartProducts.reduce((total, product) => {
    const item = cart.find((c) => c.id === product.id);
    return total + (product.price || 0) * (item.quantity || 1);
  }, 0);

  const handlePlaceOrder = async () => {
    if (!auth.currentUser) {
      alert("Sipariş verebilmek için giriş yapmalısınız!");
      return;
    }

    if (!address.name || !address.phone || !address.city || !address.postal) {
      alert("Lütfen tüm zorunlu alanları doldurun!");
      return;
    }

    try {
      for (const product of cartProducts) {
        await addDoc(collection(db, "orders"), {
          productId: product.id,
          productName: product.name,
          productImage: product.images?.[0] || product.img,
          sellerUid: product.ownerUid || null,
          buyerUid: auth.currentUser.uid,
          buyerEmail: auth.currentUser.email,
          ...address,
          createdAt: serverTimestamp(),
        });
      }

      setOrderPlaced(true);
      setShowCheckout(false);
    } catch (err) {
      console.error(err);
      alert("Sipariş oluşturulurken bir hata oluştu!");
    }
  };

  if (orderPlaced) {
    return (
      <PageContainer>
        <SuccessCard>
          <h1>Siparişin Alındı! 🎉</h1>
          <p>Ürün sahibi bilgilendirildi. Teşekkürler!</p>
          <StyledLink to="/">Alışverişe Dön</StyledLink>
        </SuccessCard>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header>
        <h1>Sepetim 🛒</h1>
        <p>{cartProducts.length} ürün var</p>
      </Header>

      <ContentWrapper>
        {/* LEFT COLUMN: Cart Items */}
        <CartItemsSection>
          {cartProducts.length === 0 ? (
            <EmptyState>
              <h3>Sepetin boş görünüyor 💨</h3>
              <StyledLink to="/">Ürünlere Göz At</StyledLink>
            </EmptyState>
          ) : (
            cartProducts.map((product) => {
              const cartItem = cart.find((c) => c.id === product.id);
              return (
                <GlassCartItem key={product.id}>
                  <ProductImage
                    src={
                      product.images?.[0] ||
                      product.img ||
                      "https://via.placeholder.com/150"
                    }
                    alt={product.name}
                  />

                  <ItemDetails>
                    <h3>{product.name}</h3>
                    <Price>
                      {product.price ? `${product.price} TL` : "Ücretsiz"}
                    </Price>

                    <ControlsRow>
                      <QuantityControl>
                        <QtyButton
                          onClick={() =>
                            updateQuantity(
                              product.id,
                              (cartItem.quantity || 1) - 1
                            )
                          }
                        >
                          <FaMinus size={10} />
                        </QtyButton>
                        <span>{cartItem.quantity || 1}</span>
                        <QtyButton
                          onClick={() =>
                            updateQuantity(
                              product.id,
                              (cartItem.quantity || 1) + 1
                            )
                          }
                        >
                          <FaPlus size={10} />
                        </QtyButton>
                      </QuantityControl>

                      <RemoveButton onClick={() => removeFromCart(product.id)}>
                        <FaTrash />
                      </RemoveButton>
                    </ControlsRow>
                  </ItemDetails>
                </GlassCartItem>
              );
            })
          )}
        </CartItemsSection>

        {/* RIGHT COLUMN: Summary & Checkout */}
        {cartProducts.length > 0 && (
          <CheckoutSection>
            <SummaryCard>
              <h3>Özet</h3>
              <SummaryRow>
                <span>Ara Toplam</span>
                <span>{totalPrice} TL</span>
              </SummaryRow>
              <SummaryRow>
                <span>Kargo</span>
                <span>Bedava</span>
              </SummaryRow>
              <Divider />
              <SummaryRow
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "#ffddb0",
                }}
              >
                <span>Toplam</span>
                <span>{totalPrice} TL</span>
              </SummaryRow>

              {!showCheckout ? (
                <CheckoutButton onClick={() => setShowCheckout(true)}>
                  Sepeti Onayla <FaArrowRight />
                </CheckoutButton>
              ) : (
                <CheckoutForm>
                  <h4>Teslimat Bilgileri</h4>
                  <GlassInput
                    placeholder="Ad Soyad"
                    value={address.name}
                    onChange={(e) =>
                      setAddress({ ...address, name: e.target.value })
                    }
                  />
                  <GlassInput
                    placeholder="Telefon"
                    value={address.phone}
                    onChange={(e) =>
                      setAddress({ ...address, phone: e.target.value })
                    }
                  />
                  <GlassInput
                    placeholder="Şehir"
                    value={address.city}
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                  />
                  <GlassInput
                    placeholder="Adres / Posta Kodu"
                    value={address.postal}
                    onChange={(e) =>
                      setAddress({ ...address, postal: e.target.value })
                    }
                  />

                  <CheckoutButton
                    onClick={handlePlaceOrder}
                    style={{ background: "#ff4757", marginTop: "10px" }}
                  >
                    Siparişi Tamamla <FaCreditCard />
                  </CheckoutButton>

                  <CancelButton onClick={() => setShowCheckout(false)}>
                    İptal
                  </CancelButton>
                </CheckoutForm>
              )}
            </SummaryCard>
          </CheckoutSection>
        )}
      </ContentWrapper>
    </PageContainer>
  );
}

/* 🎨 SCIFI GLASS STYLES */

const PageContainer = styled.div`
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Header = styled.div`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 30px;
  border-radius: 24px;
  margin-bottom: 40px;
  text-align: center;
  color: white;
  h1 {
    margin: 0;
    font-size: 28px;
    font-weight: 800;
  }
  p {
    margin: 5px 0 0;
    opacity: 0.6;
  }
`;

const CartItemsSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 300px;
`;

const CheckoutSection = styled.div`
  flex: 1;
  min-width: 300px;
  position: sticky;
  top: 100px;
`;

/* 💎 The Glass Item Card */
const GlassCartItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0.01)
  );
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 15px;
  transition: transform 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;

const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 16px;
  object-fit: cover;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;

  h3 {
    margin: 0;
    font-size: 18px;
    color: #fff;
  }
`;

const Price = styled.span`
  color: #ffddb0;
  font-weight: bold;
  font-size: 16px;
`;

const ControlsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(0, 0, 0, 0.3);
  padding: 5px 10px;
  border-radius: 12px;
  span {
    font-weight: bold;
    min-width: 20px;
    text-align: center;
  }
`;

const QtyButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const RemoveButton = styled.button`
  background: transparent;
  border: 1px solid rgba(255, 71, 87, 0.5);
  color: #ff4757;
  padding: 8px 12px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: 0.2s;

  &:hover {
    background: #ff4757;
    color: white;
  }
`;

/* 🧾 Checkout Card Styles */
const SummaryCard = styled.div`
  background: rgba(20, 20, 20, 0.6);
  backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 28px;
  padding: 25px;
  color: white;

  h3 {
    margin-top: 0;
    font-size: 22px;
  }
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 15px;
  opacity: 0.8;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin: 15px 0;
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 16px;
  background: white;
  color: black;
  border: none;
  border-radius: 18px;
  font-weight: 800;
  font-size: 16px;
  margin-top: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(255, 255, 255, 0.2);
  }
`;

const CancelButton = styled.button`
  width: 100%;
  padding: 12px;
  background: transparent;
  color: rgba(255, 255, 255, 0.6);
  border: none;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    color: white;
  }
`;

const CheckoutForm = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: fadeIn 0.3s ease;

  h4 {
    margin: 0 0 10px 0;
    font-size: 16px;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const GlassInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  outline: none;
  box-sizing: border-box; /* Fixes padding width issues */

  &:focus {
    border-color: rgba(255, 255, 255, 0.4);
    background: rgba(0, 0, 0, 0.5);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 24px;
`;

const SuccessCard = styled.div`
  text-align: center;
  padding: 60px;
  background: rgba(76, 175, 80, 0.1);
  border: 1px solid rgba(76, 175, 80, 0.3);
  backdrop-filter: blur(20px);
  border-radius: 32px;

  h1 {
    font-size: 36px;
  }
`;

const StyledLink = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  text-decoration: none;
  color: black;
  background: white;
  padding: 12px 30px;
  border-radius: 20px;
  font-weight: bold;
`;
