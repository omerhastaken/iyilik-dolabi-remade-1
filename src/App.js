import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaHome,
  FaUser,
} from "react-icons/fa";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import FavoritesPage from "./pages/FavoritesPage";
import CartPage from "./CartPage";
import AccountPage from "./pages/AccountPage";
import AddProductPage from "./pages/AddProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import MyProductsPage from "./pages/MyProductsPage";
import IncomingOrdersPage from "./pages/IncomingOrdersPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import SecurityPage from "./pages/SecurityPage";
import ProfilePage from "./pages/ProfilePage";
import HelpPage from "./pages/HelpPage";

function App() {
  const navigate = useNavigate();
  // 💾 State with LocalStorage Persistence
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), (snapshot) => {
      let list = [];
      snapshot.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));
      setProducts(list);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const addToCart = (id) => {
    if (!cart.some((c) => c.id === id))
      setCart((prev) => [...prev, { id, quantity: 1 }]);
  };

  const updateQuantity = (id, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: quantity > 0 ? quantity : 1 }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredProducts = products.filter((p) => {
    const name = p.name?.toString().toLowerCase() || "";
    const cat = p.category?.toString().toLowerCase() || "";
    const term = searchTerm.toLowerCase();
    return name.includes(term) || cat.includes(term);
  });

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <HeaderWrapper>
          <Navbar>
            <LogoContainer>
              <Logo>İyilik Dolabı</Logo>
            </LogoContainer>

            {/* Search Bar Integration */}
            <SearchContainer>
              <input
                type="text"
                placeholder="Ürün ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchIcon />
            </SearchContainer>

            <NavLinks>
              <StyledLink to="/">
                <FaHome /> <span>Ana Sayfa</span>
              </StyledLink>
              <StyledLink to="/cart">
                <FaShoppingCart />
                <span>Sepet</span>
                {cart.length > 0 && <Badge>{cart.length}</Badge>}
              </StyledLink>
              <StyledLink to="/favorites">
                <FaHeart />
                <span>Favoriler</span>
                {favorites.length > 0 && <Badge>{favorites.length}</Badge>}
              </StyledLink>
              <StyledLink to="/account">
                <FaUser /> <span>Hesabım</span>
              </StyledLink>
            </NavLinks>
          </Navbar>
        </HeaderWrapper>

        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Banner>
                  <h2>Bir eşya paylaş, bir kalbi ısıt ♥️</h2>
                  <p>İyilik Dolabı — Paylaşmanın en güzel hali</p>
                </Banner>

                <Section>
                  <ProductGrid>
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id}>
                        <ImageContainer>
                          <ProductImage
                            src={
                              product.images?.[0] ||
                              "https://via.placeholder.com/300"
                            }
                            alt={product.name}
                            onClick={() => navigate(`/product/${product.id}`)}
                          />
                          <HeartIcon
                            $active={favorites.includes(product.id)}
                            onClick={() => toggleFavorite(product.id)}
                          />
                        </ImageContainer>

                        <CardContent>
                          <CardHeader>
                            <h3
                              onClick={() => navigate(`/product/${product.id}`)}
                              style={{ cursor: "pointer" }}
                            >
                              {product.name}
                            </h3>
                            <PriceTag>
                              {product.price
                                ? `${product.price} TL`
                                : "Ücretsiz"}
                            </PriceTag>
                          </CardHeader>

                          <ProductMeta>
                            {product.category} • {product.size}
                            <br />
                            <span style={{ opacity: 0.7 }}>
                              Durum: {product.condition}
                            </span>
                          </ProductMeta>

                          <AddButton onClick={() => addToCart(product.id)}>
                            Sepete Ekle
                          </AddButton>
                        </CardContent>
                      </ProductCard>
                    ))}
                  </ProductGrid>
                </Section>
              </div>
            }
          />

          <Route
            path="/favorites"
            element={
              <FavoritesPage
                favorites={favorites}
                products={products}
                toggleFavorite={toggleFavorite}
                addToCart={addToCart}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <CartPage
                cart={cart}
                products={products}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            }
          />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/add-donation" element={<AddProductPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/my-products" element={<MyProductsPage />} />
          <Route path="/incoming-orders" element={<IncomingOrdersPage />} />
          <Route
            path="/my-orders"
            element={<MyOrdersPage products={products} />}
          />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/help" element={<HelpPage />} />
        </Routes>
      </AppContainer>
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

/* 🎨 GLOBAL & LAYOUT STYLES */

const GlobalStyle = createGlobalStyle`
  @keyframes gradientBG {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #fff;
    background: linear-gradient(-45deg, #000000, #1a0b0b, #2c1e1e, #0f0f0f);
    background-size: 400% 400%;
    animation: gradientBG 15s ease infinite;
    min-height: 100vh;
  }
`;

const AppContainer = styled.div``;
const Section = styled.section`
  padding: 20px;
`;

const HeaderWrapper = styled.div`
  position: sticky;
  top: 10px;
  z-index: 1000;
  display: flex;
  justify-content: center;
  padding: 0 20px;
  margin-bottom: 20px;
`;

/* 💎 GLASS NAVBAR */
const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1000px;
  padding: 12px 30px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border-radius: 50px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Logo = styled.h1`
  font-size: 24px;
  color: #fff;
  font-weight: bold;
  margin: 0;
  white-space: nowrap;
  margin-right: 20px;
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  a {
    margin-left: 20px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  transition: all 0.3s;
  &:hover {
    color: #fff;
    transform: translateY(-2px);
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
  }
  svg {
    font-size: 18px;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 300px;
  margin: 0 20px;
  input {
    width: 100%;
    padding: 10px 40px 10px 15px;
    border-radius: 25px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.2);
    color: #fff;
    outline: none;
    transition: 0.3s;
    &:focus {
      background: rgba(0, 0, 0, 0.4);
      border-color: rgba(255, 255, 255, 0.3);
    }
  }
`;
const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.5);
  pointer-events: none;
`;

const Banner = styled.section`
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(
    to right,
    rgba(123, 3, 35, 0.4),
    rgba(139, 0, 0, 0.4)
  );
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin: 20px auto;
  max-width: 1000px;
  border-radius: 32px;
  h2 {
    font-size: 36px;
    font-weight: 900;
    color: #fff;
    margin-bottom: 10px;
  }
  p {
    font-size: 18px;
    color: rgba(255, 255, 255, 0.8);
  }
`;

/* 🔮 THE UNIFIED GLASS CARD STYLES */

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
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
  cursor: pointer;
  ${ProductCard}:hover & {
    transform: scale(1.1);
  }
`;

const HeartIcon = styled(FaHeart)`
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 20px;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
  padding: 8px;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  box-sizing: border-box;
  cursor: pointer;
  color: ${(props) => (props.$active ? "#ff4757" : "rgba(255,255,255,0.7)")};
  transition: 0.3s;
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
    color: #ff4757;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    line-height: 1.3;
  }
`;

const PriceTag = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #ffddb0;
  white-space: nowrap;
  text-shadow: 0 0 10px rgba(255, 221, 176, 0.3);
`;

const ProductMeta = styled.p`
  font-size: 13px;
  opacity: 0.6;
  margin: 0;
  line-height: 1.4;
`;

const AddButton = styled.button`
  margin-top: auto;
  width: 100%;
  padding: 12px;
  border-radius: 16px;
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

const Badge = styled.span`
  background: #ff4757;
  color: white;
  font-size: 10px;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: -5px;
  box-shadow: 0 2px 5px rgba(255, 71, 87, 0.4);
`;
