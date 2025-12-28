import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaHeart, FaBars } from "react-icons/fa";

function HomePage() {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCategories, setShowCategories] = useState(false);

  // Dummy data
  const products = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Ürün ${i + 1}`,
    description: `Geleceğin tasarımı #${i + 1}`,
    category: ["Giyim", "Ayakkabı", "Teknoloji", "Ev"][i % 4],
    price: Math.floor(Math.random() * 500) + 100,
    img: `https://picsum.photos/300/300?random=${i + 10}`,
  }));

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const addToCart = (id) => {
    if (!cart.includes(id)) setCart((prev) => [...prev, id]);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <HomeContainer>
      {/* Ultra-Glass Header */}
      <Header>
        <LogoSection>
          <h1>İyilik Dolabı</h1>
          <MenuButton onClick={() => setShowCategories(!showCategories)}>
            <FaBars />
          </MenuButton>

          {showCategories && (
            <DropdownMenu>
              <MenuItem>Kıyafet</MenuItem>
              <MenuItem>Ayakkabı</MenuItem>
              <MenuItem>Teknoloji</MenuItem>
              <MenuItem>Ev Eşyası</MenuItem>
            </DropdownMenu>
          )}
        </LogoSection>

        <NavSection>
          <SearchInput
            type="text"
            placeholder="Ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <NavLinks>
            <StyledLink to="/">Ana Sayfa</StyledLink>
            <StyledLink to="/cart">Sepet ({cart.length})</StyledLink>
            <StyledLink to="/favorites">
              Favoriler ({favorites.length})
            </StyledLink>
            <StyledLink to="/account">Hesabım</StyledLink>
          </NavLinks>
        </NavSection>
      </Header>

      {/* Hero Glass Banner */}
      <Banner>
        <BannerContent>
          <h2>Geleceği Paylaş 🚀</h2>
          <p>En yeni teknoloji, en temiz tasarım.</p>
        </BannerContent>
      </Banner>

      {/* The iOS 26 Product Grid */}
      <ProductGrid>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id}>
            <ImageContainer>
              <ProductImage src={product.img} alt={product.name} />
              <HeartIcon
                $active={favorites.includes(product.id)}
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
    </HomeContainer>
  );
}

export default HomePage;

/* 🔮 ULTRA-GLASS STYLES (iOS 26 Vibe) 🔮 */

const HomeContainer = styled.div`
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

/* Common Glass Mixin for consistency */
const glassEffect = `
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
`;

const Header = styled.header`
  ${glassEffect}
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 30px;
  border-radius: 24px;
  margin-bottom: 40px;
  /* Top lighting effect */
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(255, 255, 255, 0.01) 100%
  );
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  h1 {
    font-size: 26px;
    font-weight: 700;
    letter-spacing: -0.5px;
    margin: 0;
  }
`;

const MenuButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  padding: 10px;
  border-radius: 12px;
  display: flex;
  transition: 0.2s;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 70px;
  left: 30px;
  background: rgba(20, 20, 20, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 8px;
  z-index: 100;
  width: 220px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
`;

const MenuItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  border-radius: 10px;
  font-weight: 500;
  transition: 0.2s;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
  }
`;

const NavSection = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
`;

const SearchInput = styled.input`
  padding: 12px 24px;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.2);
  color: #fff;
  outline: none;
  font-size: 14px;
  transition: 0.3s;
  width: 200px;

  &:focus {
    background: rgba(0, 0, 0, 0.4);
    border-color: rgba(255, 255, 255, 0.3);
    width: 240px;
  }
  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 20px;
`;

const StyledLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-weight: 500;
  font-size: 15px;
  transition: 0.2s;
  &:hover {
    color: #fff;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  }
`;

const Banner = styled.section`
  ${glassEffect}
  text-align: center;
  padding: 80px 40px;
  margin-bottom: 50px;
  border-radius: 32px;
  position: relative;
  overflow: hidden;

  /* Subtle sheen animation across banner */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.05),
      transparent
    );
    transform: skewX(-20deg);
    transition: 0.5s;
  }

  &:hover::before {
    left: 150%;
    transition: 1s;
  }
`;

const BannerContent = styled.div`
  position: relative;
  z-index: 2;
  h2 {
    font-size: 48px;
    margin-bottom: 10px;
    font-weight: 800;
    letter-spacing: -1px;
  }
  p {
    font-size: 20px;
    opacity: 0.8;
    font-weight: 300;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
`;

/* 💎 THE PRODUCT CARD */
const ProductCard = styled.div`
  /* The Secret Sauce for iOS 26 Look */
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(255, 255, 255, 0.01) 100%
  );
  backdrop-filter: blur(30px); /* Heavy Blur */
  -webkit-backdrop-filter: blur(30px);

  /* Double border trick for 'cut glass' edge */
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-top: 1px solid rgba(255, 255, 255, 0.15); /* Top edge is brighter */

  border-radius: 28px;
  padding: 15px;
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s;

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
  color: ${(props) => (props.$active ? "#ff4757" : "rgba(255,255,255,0.8)")};
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

  /* Glassy Button Gradient */
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
;
