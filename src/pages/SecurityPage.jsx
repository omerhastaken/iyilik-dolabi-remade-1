import React from "react";
import styled from "styled-components";
import {
  FaLock,
  FaKey,
  FaShieldAlt,
  FaGoogle,
  FaUserShield,
} from "react-icons/fa";

export default function SecurityPage() {
  return (
    <PageContainer>
      <Header>
        <h1>Güvenlik Merkezi 🛡️</h1>
        <p>Hesabının güvenliğini buradan yönetebilirsin.</p>
      </Header>

      <ContentGrid>
        {/* Main Status Card */}
        <StatusCard>
          <IconWrapper $color="#4caf50">
            <FaUserShield />
          </IconWrapper>
          <StatusInfo>
            <h3>Hesap Durumu: Güvenli</h3>
            <p>Son güvenlik taraması: Bugün 14:30</p>
          </StatusInfo>
        </StatusCard>

        {/* Password Card */}
        <GlassCard>
          <CardHeader>
            <IconBox>
              <FaLock />
            </IconBox>
            <h3>Şifre İşlemleri</h3>
          </CardHeader>

          <CardBody>
            <p>
              Hesabın Google ile bağlantılı olduğu için şifre işlemlerini Google
              üzerinden yönetmen gerekir.
            </p>
            <ActionBtn
              onClick={() =>
                window.open("https://myaccount.google.com/security", "_blank")
              }
            >
              <FaGoogle /> Google Güvenlik Ayarları
            </ActionBtn>
          </CardBody>
        </GlassCard>

        {/* 2FA Card */}
        <GlassCard>
          <CardHeader>
            <IconBox>
              <FaKey />
            </IconBox>
            <h3>İki Adımlı Doğrulama (2FA)</h3>
          </CardHeader>

          <CardBody>
            <p>
              Ekstra güvenlik katmanı yakında aktif olacak. Şu an için Google
              2FA korumasını kullanıyorsun.
            </p>
            <DisabledBtn disabled>Çok Yakında 🚧</DisabledBtn>
          </CardBody>
        </GlassCard>
      </ContentGrid>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  padding: 40px 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.div`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 30px;
  border-radius: 24px;
  margin-bottom: 30px;
  text-align: center;

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

const ContentGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StatusCard = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  background: linear-gradient(
    90deg,
    rgba(76, 175, 80, 0.1),
    rgba(76, 175, 80, 0.05)
  );
  border: 1px solid rgba(76, 175, 80, 0.3);
  backdrop-filter: blur(20px);
  padding: 20px;
  border-radius: 24px;
  margin-bottom: 10px;
`;

const StatusInfo = styled.div`
  h3 {
    margin: 0;
    font-size: 18px;
    color: #a5d6a7;
  }
  p {
    margin: 5px 0 0;
    font-size: 13px;
    opacity: 0.8;
  }
`;

const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  background: ${(props) => props.$color || "#fff"};
  color: #000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: 0 0 20px ${(props) => props.$color}60;
`;

const GlassCard = styled.div`
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0.01)
  );
  backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 24px;
  transition: transform 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;

  h3 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
  }
`;

const IconBox = styled.div`
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #ffddb0;
`;

const CardBody = styled.div`
  padding-left: 55px;

  p {
    margin: 0 0 15px 0;
    opacity: 0.7;
    line-height: 1.5;
    font-size: 14px;
  }

  @media (max-width: 600px) {
    padding-left: 0;
  }
`;

const ActionBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  background: white;
  color: black;
  border: none;
  border-radius: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 255, 255, 0.2);
  }
`;

const DisabledBtn = styled(ActionBtn)`
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.4);
  cursor: not-allowed;
  &:hover {
    transform: none;
    box-shadow: none;
  }
`;
