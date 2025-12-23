import React, { useState, useEffect } from "react";
import { FaSearch, FaHeart, FaShoppingCart, FaHome, FaUser } from "react-icons/fa";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

// Components
import CategoryMenu from "./components/CategoryMenu";
import LoginPage from "./pages/LoginPage";
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
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
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
        item.id === id ? { ...item, quantity: quantity > 0 ? quantity : 1 } : item
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
        <Navbar>
          <HeaderLeft>
            <Logo>İyilik Dolabı</Logo>
            <CategoryMenu onSelectCategory={(cat) => setSearchTerm(cat === "Tümü" ? "" : cat)} />
          </HeaderLeft>

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
            <Link to="/"><FaHome /> Ana Sayfa</Link>
            <Link to="/cart"><FaShoppingCart /> Sepet ({cart.length})</Link>
            <Link to="/favorites"><FaHeart /> Favoriler ({favorites.length})</Link>
            <Link to="/account"><FaUser /> Hesabım</Link>
          </NavLinks>
        </Navbar>

        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Banner>
                  <h2>Bir eşya paylaş, bir kalbi ısıt 💛</h2>
                  <p>İyilik Dolabı — Paylaşmanın en güzel hali</p>
                </Banner>

                <section>
                  <ProductGrid>
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id}>
                        <img
                          src={product.images?.[0]}
                          alt={product.name}
                          onClick={() => navigate(`/product/${product.id}`)}
                        />
                        <h3>{product.name}</h3>
                        <p>{product.category} - {product.size}</p>
                        <p>Durum: {product.condition}</p>

                        <ProductActions>
                          <button onClick={() => addToCart(product.id)}>Sepete Ekle</button>
                          <HeartIcon
                            $active={favorites.includes(product.id)}
                            onClick={() => toggleFavorite(product.id)}
                          />
                        </ProductActions>
                      </ProductCard>
                    ))}
                  </ProductGrid>
                </section>
              </div>
            }
          />
          
          <Route path="/favorites" element={<FavoritesPage favorites={favorites} products={products} toggleFavorite={toggleFavorite} addToCart={addToCart} />} />
          <Route path="/cart" element={<CartPage cart={cart} products={products} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/add-donation" element={<AddProductPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/my-products" element={<MyProductsPage />} />
          <Route path="/incoming-orders" element={<IncomingOrdersPage />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/login" element={<LoginPage />} />
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

// 🌍 Global Styles (replaces body styles in App.css)
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Arial', sans-serif;
    background-color: #fff8f0;
  }
`;

// 💅 Styled Components
const AppContainer = styled.div`
  /* Main container styles if needed */
`;

const Navbar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px; 
  background: linear-gradient(to right, #5b433c, #2f2e2e);
`;

const Logo = styled.h1`
  font-size: 28px;
  color: #fff;
  font-weight: bold;
  margin: 0;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;
  margin: 0 20px;

  input {
    width: 100%;
    padding: 8px 35px 8px 10px;
    border-radius: 25px;
    border: none;
    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    outline: none;
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #5d4037;
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;

  a {
    margin-left: 20px;
    text-decoration: none;
    color: #fff;
    font-weight: bold;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    
    &:hover {
      opacity: 0.8;
    }
  }
`;

const Banner = styled.section`
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(to right, #efebe9, #5d5943);
  margin: 20px;
  border-radius: 20px;
  
  h2 {
    font-size: 36px;
    color: #3f2f2a;
    margin-bottom: 10px;
  }

  p {
    font-size: 18px;
    color: #6d4c41;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const ProductCard = styled.div`
  background: #443c3a;
  border-radius: 15px;
  padding: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 10px;
    cursor: pointer;
  }

  h3 {
    color: #fff;
    margin: 10px 0 5px;
  }

  p {
    color: #d7ccc8;
    font-size: 14px;
    margin: 0 0 5px;
  }
`;

const ProductActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;

  button {
    padding: 8px 12px;
    border: none;
    border-radius: 20px;
    background-color: #2b2929;
    color: #fff;
    cursor: pointer;
    font-weight: bold;

    &:hover {
      background-color: #1a1919;
    }
  }
`;

const HeartIcon = styled(FaHeart)`
  font-size: 22px;
  cursor: pointer;
  color: ${props => props.$active ? "#63615e" : "#fff"};
  transition: color 0.2s;
`;