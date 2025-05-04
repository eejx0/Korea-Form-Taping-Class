import styled from "styled-components"
import Logo from "../assets/img/svg/KFTC.svg";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

export const Header = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const eduRef = useRef<HTMLParagraphElement>(null);
    const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
    
    const calculateDropdownPosition = () => {
        if (eduRef.current) {
            const rect = eduRef.current.getBoundingClientRect();
            setDropdownPos({
                top: rect.bottom + window.scrollY + 40,
                left: rect.left + window.scrollX - 68,
            });
        }
    };

    const handleMouseEnter = () => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
        }
        if (!isOpen) {
            calculateDropdownPosition();
            setIsOpen(true);
        }
    };
    
    const handleMouseLeave = () => {
        closeTimeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 200);
    };

    return (
        <Container>
            <Wrapper>
                <Link to={'/'}>
                    <LogoImg src={Logo} alt="kFTC" />
                </Link>
                <NavWrapper>
                    <NavItem to={'/introduce/greeting'}>클래스 소개</NavItem>
                    <p 
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        ref={eduRef}
                    >
                        교육
                    </p>
                    <p>Form Taping 자료실</p>
                    <p>한국전문테이핑관리사</p>
                    <p>클래스 앨범</p>
                    <p>관련 SNS</p>
                </NavWrapper>
                <GuestCount>오늘 23명이 방문했어요</GuestCount>
            </Wrapper>
            {isOpen && 
                <DropDownWrapper 
                    onMouseEnter={() => {
                        if (closeTimeoutRef.current) {
                            clearTimeout(closeTimeoutRef.current);
                        }
                        setIsOpen(true);
                    }}
                    onMouseLeave={handleMouseLeave}
                    style={{ top: dropdownPos.top, left: dropdownPos.left }}
                >
                    <EducationNavItem to={'/education/process'}>교육 과정</EducationNavItem>
                    <Line />
                    <p>교육 일정</p>
                    <Line />
                    <p>교육 등록 및 결제방법</p>
                </DropDownWrapper>
            }
        </Container>
    )
}

const Container = styled.div`
    position: relative;
`;

const Wrapper = styled.div`
    display: flex;
    height: 84px;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    z-index: 100;
`;

const LogoImg = styled.img`
    padding-left: 70px;
`;

const NavItem = styled(Link)`
  font-size: 15px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: rgba(255, 255, 255, 0.8);
    transition: 0.2s;
  }
`;

const EducationNavItem = styled(Link)`
    font-size: 13px;
    color: rgba(255,255,255,0.7);
    cursor: pointer;
        &:hover {
            color: white;
        }
`;

const NavWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 45px;
    > p {
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        &:hover {
            color: rgba(255,255,255, 0.8);
            transition: 0.2s;
        }
    }
`;

const GuestCount = styled.p`
    font-size: 13px;
    font-weight: 500;
    color: rgba(255,255,255,0.5);
    padding-right: 70px;
`;

const DropDownWrapper = styled.div`
    position: absolute;
    padding: 11px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    z-index: 10;
    border-radius: 10px;
    background-color: rgba(36, 36, 36, 0.84);
    cursor: pointer;
    border: 1px solid rgba(255,255,255,0.2);
    > p {
        font-size: 13px;
        color: rgba(255,255,255,0.7);
        &:hover {
            color: white;
        }
    }
`;

const Line = styled.div`
    width: 141px;
    height: 1px;
    background-color: rgba(255,255,255,0.2);
`;