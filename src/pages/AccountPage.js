import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  FaBox,
  FaPlusCircle,
  FaCheckCircle,
  FaListAlt,
  FaShieldAlt,
  FaUser,
  FaQuestionCircle,
  FaSignOutAlt,
  FaGoogle,
} from "react-icons/fa";

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  if (!user) {
    return (
      <PageContainer>
        <LoginCard>
          <h2>Hesabım</h2>
          <p>Devam etmek için giriş yapmanız gerekiyor.</p>
          <LoginButton onClick={handleLogin}>
            <FaGoogle /> Google ile Giriş Yap
          </LoginButton>
        </LoginCard>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header>Hesabım</Header>
      <UserCard>
        <Avatar>
          <FaUser />
        </Avatar>
        <UserInfo>
          <p className="email">{user.email}</p>
          <p className="welcome">Hoş geldin 💛</p>
        </UserInfo>
      </UserCard>
      <MenuGrid>
        <MenuBox onClick={() => navigate("/my-products")}>
          <IconWrapper>
            <FaBox />
          </IconWrapper>
          <p>Eklediğim Ürünler</p>
        </MenuBox>

        <MenuBox onClick={() => navigate("/add-donation")}>
          <IconWrapper>
            <FaPlusCircle />
          </IconWrapper>
          <p>Ürün Ekle</p>
        </MenuBox>

        <MenuBox onClick={() => navigate("/incoming-orders")}>
          <IconWrapper>
            <FaCheckCircle />
          </IconWrapper>
          <p>Gelen Siparişler</p>
        </MenuBox>

        <MenuBox onClick={() => navigate("/my-orders")}>
          <IconWrapper>
            <FaListAlt />
          </IconWrapper>
          <p>Tüm Siparişlerim</p>
        </MenuBox>

        <MenuBox onClick={() => navigate("/security")}>
          <IconWrapper>
            <FaShieldAlt />
          </IconWrapper>
          <p>Güvenlik</p>
        </MenuBox>

        <MenuBox onClick={() => navigate("/profile")}>
          <IconWrapper>
            <FaUser />
          </IconWrapper>
          <p>Kullanıcı Bilgileri</p>
        </MenuBox>

        <MenuBox onClick={() => navigate("/help")}>
          <IconWrapper>
            <FaQuestionCircle />
          </IconWrapper>
          <p>Yardım</p>
        </MenuBox>
      </MenuGrid>

      <LogoutButton onClick={handleLogout}>
        <FaSignOutAlt /> Çıkış Yap
      </LogoutButton>
    </PageContainer>
  );
}


const PageContainer = styled.div`
  padding: 40px 20px;
  max-width: 800px;
  margin: 0 auto;
  color: #fff;
`;

const Header = styled.h2`
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 30px;
  text-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

const LoginCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  padding: 40px;
  border-radius: 24px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 50px;

  p {
    opacity: 0.7;
    margin-bottom: 20px;
  }
`;

const LoginButton = styled.button`
  background: #fff;
  color: #333;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const UserCard = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 25px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

const Avatar = styled.div`
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #fff;
`;

const UserInfo = styled.div`
  .email {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  }
  .welcome {
    font-size: 14px;
    opacity: 0.7;
    margin: 5px 0 0;
  }
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 20px;
`;

const MenuBox = styled.div`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 25px 15px;
  border-radius: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  p {
    margin: 15px 0 0;
    font-weight: 500;
    font-size: 14px;
    opacity: 0.9;
  }

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
`;

const IconWrapper = styled.div`
  font-size: 28px;
  color: #ffddb0;
  margin-bottom: 10px;
  filter: drop-shadow(0 0 10px rgba(255, 221, 176, 0.3));
`;

const LogoutButton = styled.button`
  width: 100%;
  margin-top: 40px;
  padding: 16px;
  background: rgba(255, 71, 87, 0.1);
  border: 1px solid rgba(255, 71, 87, 0.3);
  color: #ff4757;
  font-size: 16px;
  font-weight: 700;
  border-radius: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: 0.3s;

  &:hover {
    background: rgba(255, 71, 87, 0.2);
    transform: translateY(-2px);
  }
`;
