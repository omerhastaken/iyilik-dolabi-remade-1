import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  FaBars,
  FaChevronDown,
  FaChevronUp,
  FaTshirt,
  FaShoePrints,
  FaHome,
  FaSchool,
  FaFemale,
  FaMale,
  FaChild
} from "react-icons/fa";

export default function CategoryMenu({ onSelectCategory }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const categories = [
    {
      name: "Giyim",
      icon: <FaTshirt />,
      subcategories: [
        { name: "Kadın", icon: <FaFemale /> },
        { name: "Erkek", icon: <FaMale /> },
        { name: "Çocuk", icon: <FaChild /> }
      ],
    },
    {
      name: "Ayakkabı",
      icon: <FaShoePrints />,
      subcategories: [
        { name: "Kadın", icon: <FaFemale /> },
        { name: "Erkek", icon: <FaMale /> },
        { name: "Çocuk", icon: <FaChild /> }
      ],
    },
    { name: "Okul Malzemeleri", icon: <FaSchool /> },
    { name: "Ev Eşyası", icon: <FaHome /> },
  ];
  const animationProps = {
      '--x': '0%',
      '--y': '0%'
  };

  return (
    <MenuContainer>
      <MenuIcon onClick={() => setMenuOpen(!menuOpen)} />

      {menuOpen && (
        <DropdownMenu>
          <AnimatedBackground style={animationProps} />

          {categories.map((cat, index) => (
            <div key={index}>
              <MenuItem
                $isOpen={openSubmenu === cat.name}
                onClick={() => {
                  if (cat.subcategories) {
                    setOpenSubmenu(openSubmenu === cat.name ? null : cat.name);
                  } else {
                    onSelectCategory(cat.name);
                    setMenuOpen(false);
                  }
                }}
              >
                <ItemContent>
                  <IconWrapper>{cat.icon}</IconWrapper>
                  <span>{cat.name}</span>
                </ItemContent>
                {cat.subcategories &&
                  (openSubmenu === cat.name ? (
                    <FaChevronUp size={12} />
                  ) : (
                    <FaChevronDown size={12} />
                  ))}
              </MenuItem>

              {openSubmenu === cat.name && cat.subcategories && (
                <SubMenu>
                  {cat.subcategories.map((sub, subIndex) => (
                    <SubMenuItem
                      key={subIndex}
                      onClick={() => {
                        onSelectCategory(sub.name);
                        setMenuOpen(false);
                      }}
                    >
                      <IconWrapper style={{ color: "#ffc9a9" }}>{sub.icon}</IconWrapper>
                      {sub.name}
                    </SubMenuItem>
                  ))}
                </SubMenu>
              )}
            </div>
          ))}
        </DropdownMenu>
      )}
    </MenuContainer>
  );
}
const lightMove = keyframes`
  0% { --x: 0%; --y: 0%; }
  25% { --x: 100%; --y: 0%; }
  50% { --x: 100%; --y: 100%; }
  75% { --x: 0%; --y: 100%; }
  100% { --x: 0%; --y: 0%; }
`;

const MenuContainer = styled.div`
  position: relative;
  margin-left: 15px;
`;

const MenuIcon = styled(FaBars)`
  font-size: 26px;
  color: #fff;
  cursor: pointer;
  margin-left: 10px;
  z-index: 1000;
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  background: linear-gradient(145deg, #3b2a26, #6b4a3f);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.6);
  padding: 12px 0;
  z-index: 999;
  width: 240px;
  color: #fff;
  font-family: "Poppins", sans-serif;
  overflow: hidden;
`;

const AnimatedBackground = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at var(--x, 0%) var(--y, 0%), rgba(255,255,255,0.15), transparent 50%);
  animation: ${lightMove} 6s infinite linear;
  z-index: 0;
  pointer-events: none;
`;

const MenuItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  background: ${props => props.$isOpen ? "rgba(255,255,255,0.12)" : "transparent"};
  position: relative;
  z-index: 1;

  &:hover {
    background: rgba(255,255,255,0.05);
  }
`;

const ItemContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const IconWrapper = styled.span`
  color: #ffd9b3;
`;

const SubMenu = styled.div`
  background: rgba(255,255,255,0.08);
  padding-left: 22px;
  padding-bottom: 6px;
  transition: max-height 0.3s ease;
  position: relative;
  z-index: 1;
`;

const SubMenuItem = styled.div`
  padding: 8px 0;
  cursor: pointer;
  font-size: 14px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  gap: 8px;
  color: #f5f5f5;

  &:hover {
    color: #ffc9a9;
  }
`;
