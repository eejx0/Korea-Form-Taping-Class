import styled from "styled-components"
import Logo from "../assets/img/svg/KFTC.svg";
// import DarkLogo from "../assets/img/svg/DarkKFTC.svg";
// import Dark from "../assets/img/svg/dark.svg";
// import Light from "../assets/img/svg/light.svg";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserCount } from "../apis";

type HeaderProps = {
    isDarkMode: boolean;
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};
  

export const Header = ({ isDarkMode, setIsDarkMode }: HeaderProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [visitCount, setVisitCount] = useState<number>(0);
    const eduRef = useRef<HTMLParagraphElement>(null);
    const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });

    useEffect(() => {
        const fetchVisitCount = async () => {
            try {
                const res = await getUserCount();
                setVisitCount(res.data.today_visit_count);
            } catch (error) {
                console.error('방문자 수 조회 에러: ', error);
            }
        };
        fetchVisitCount();
    }, []);

    // 다크모드 고정으로 인해 주석처리
    // const toggleMode = () => {
    //     setIsDarkMode((prev) => !prev);
    // }
    
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
                <Link to={'/main/'}>
                    <LogoImg src={Logo} alt="KFTC" />
                </Link>
                <NavWrapper>
                    <NavItem $isDarkMode={isDarkMode} to={'/main/introduce/greeting'}>클래스 소개</NavItem>
                    <EducationNav
                        $isDarkMode={isDarkMode}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        ref={eduRef}
                    >
                        교육
                    </EducationNav>
                    <NavItem $isDarkMode={isDarkMode} to={'/main/formTaping'}>Form Taping 자료실</NavItem>
                    <NavItem $isDarkMode={isDarkMode} to={'/main/tapingManager'}>한국전문테이핑관리사</NavItem>
                    <NavItem $isDarkMode={isDarkMode} to={'/main/classAlbum'}>클래스 앨범</NavItem>
                    <NavItem $isDarkMode={isDarkMode} to={'/main/sns'}>관련 SNS</NavItem>
                </NavWrapper>
                <RightWrapper>
                    <GuestCount $isDarkMode={isDarkMode}>오늘 {visitCount}명이 방문했어요</GuestCount>
                    {/* 다크모드 고정으로 인해 주석처리
                    <ModeButton $isDarkMode={isDarkMode} onClick={toggleMode}>
                        <img src={isDarkMode ? Dark : Light} alt={isDarkMode ? Dark : Light}></img>
                    </ModeButton>
                    */}
                </RightWrapper>
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
                    <EducationNavItem to={'/main/education/process'}>교육 과정</EducationNavItem>
                    <Line />
                    <EducationNavItem to={'/main/education/schedule'}>교육 일정</EducationNavItem>
                    <Line />
                    <EducationNavItem to={'/main/education/registration'}>교육 등록 및 결제방법</EducationNavItem>
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

const NavItem = styled(Link)<{$isDarkMode: boolean}>`
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: ${({$isDarkMode}) => $isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(36,36,36,0.5)'};
    transition: 0.2s;
  }
`;

const RightWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    padding-right: 70px;
`;

const EducationNavItem = styled(Link)`
    font-size: 13px;
    color: ${({theme}) => theme.headerDropDownText};
    background: none;
    cursor: pointer;
        &:hover {
            color: ${({theme}) => theme.text};
        }
`;

const NavWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 45px;
`;

const EducationNav = styled.p<{$isDarkMode: boolean}>`
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    &:hover {
        color: ${({$isDarkMode}) => $isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(36,36,36,0.5)'};
        transition: 0.2s;
    }
`;

const GuestCount = styled.p<{$isDarkMode: boolean}>`
    font-size: 13px;
    font-weight: 500;
    color: ${({$isDarkMode}) => ($isDarkMode ? 'rgba(255,255,255,0.5)' : 'rgba(36,36,36,0.5)')};
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
    background-color: ${({theme}) => theme.background};
    cursor: pointer;
    border: 1px solid ${({theme}) => theme.headerDropDownBorder};
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
    background-color: ${({theme}) => theme.headerDropDownBorder};
`;

const ModeButton = styled.div<{$isDarkMode: boolean}>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 100px;
    border: 1px solid ${({$isDarkMode}) => ($isDarkMode ? 'white' : '#242424')};
    background-color: ${({$isDarkMode}) => ($isDarkMode ? '#242424' : 'white')};
    cursor: pointer;
`;