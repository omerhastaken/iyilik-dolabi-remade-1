import React from "react";
import styled from "styled-components";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function FavoritesPage({
  favorites,
  toggleFavorite,
  addToCart,
  products,
}) {
  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <PageContainer>
      <Header>
        <h1>Favorilerim ❤️</h1>
        <p>{favoriteProducts.length} ürün sakladın</p>
      </Header>

      {favoriteProducts.length === 0 ? (
        <EmptyState>
          <h3>Henüz favori yok 🥺</h3>
          <p>
            Beğendiğin ürünleri kalp ikonuna tıklayarak buraya ekleyebilirsin.
          </p>
          <StyledLink to="/">Alışverişe Dön</StyledLink>
        </EmptyState>
      ) : (
        <ProductGrid>
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id}>
              <ImageContainer>
                <ProductImage
                  src={
                    product.images?.[0] ||
                    product.img ||
                    "https://via.placeholder.com/300"
                  }
                  alt={product.name}
                />
                <HeartIcon
                  $active={true}
                  onClick={() => toggleFavorite(product.id)}
                />
              </ImageContainer>

              <CardContent>
                <CardHeader>
                  <h3>{product.name}</h3>
                  <PriceTag>{product.price} TL</PriceTag>
                </CardHeader>

                <p>{product.description}</p>

                <AddButton onClick={() => addToCart(product.id)}>
                  Sepete Ekle
                </AddButton>
              </CardContent>
            </ProductCard>
          ))}
        </ProductGrid>
      )}
    </PageContainer>
  );
}

const PageContainer = styled.div`
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const glassEffect = `
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  ${glassEffect}
  padding: 30px;
  border-radius: 24px;
  margin-bottom: 40px;
  text-align: center;
  h1 {
    font-size: 32px;
    margin: 0 0 10px 0;
    font-weight: 800;
  }
  p {
    margin: 0;
    opacity: 0.7;
    font-size: 16px;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
`;

const ProductCard = styled.div`
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(255, 255, 255, 0.01) 100%
  );
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 28px;
  padding: 15px;
  transition: transform 0.4s, box-shadow 0.4s;
  display: flex;
  flex-direction: column;
  gap: 15px;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  height: 220px;
  width: 100%;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s;
  ${ProductCard}:hover & {
    transform: scale(1.1);
  }
`;

const HeartIcon = styled(FaHeart)`
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 22px;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  padding: 8px;
  border-radius: 50%;
  width: 38px;
  height: 38px;
  box-sizing: border-box;
  cursor: pointer;
  color: #ff4757;
  transition: 0.3s;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  p {
    font-size: 13px;
    opacity: 0.6;
    margin: 0;
    line-height: 1.4;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
  }
`;

const PriceTag = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #ffddb0;
  text-shadow: 0 0 10px rgba(255, 221, 176, 0.3);
`;

const AddButton = styled.button`
  margin-top: 10px;
  width: 100%;
  padding: 14px;
  border-radius: 18px;
  border: none;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.05)
  );
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: #fff;
    color: #000;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
  }
`;

const EmptyState = styled.div`
  ${glassEffect}
  text-align: center;
  padding: 60px;
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  h3 {
    font-size: 24px;
    margin: 0;
  }
`;

const StyledLink = styled(Link)`
  margin-top: 20px;
  text-decoration: none;
  color: #000;
  background: #fff;
  padding: 12px 30px;
  border-radius: 20px;
  font-weight: bold;
  transition: 0.3s;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
  }
`;
