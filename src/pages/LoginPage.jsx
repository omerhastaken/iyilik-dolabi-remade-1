import React from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
    <LoginContainer>
      <Title>Google ile Giriş</Title>
      <LoginButton onClick={handleLogin}>
        Google ile Giriş Yap
      </LoginButton>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  padding: 40px;
  text-align: center;
`;

const Title = styled.h2`
  color: #333;
`;

const LoginButton = styled.button`
  padding: 14px 24px;
  border-radius: 10px;
  border: none;
  background: #ff8c6e;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;