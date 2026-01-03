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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const [isMobileEducationOpen, setIsMobileEducationOpen] = useState<boolean>(false);
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

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        if (isMobileMenuOpen) {
            setIsMobileEducationOpen(false);
        }
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        setIsMobileEducationOpen(false);
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
                </RightWrapper>
                <MobileMenuButton onClick={toggleMobileMenu} $isOpen={isMobileMenuOpen}>
                    <span></span>
                    <span></span>
                    <span></span>
                </MobileMenuButton>
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
            {isMobileMenuOpen && <MobileMenuOverlay onClick={closeMobileMenu} />}
            <MobileMenuDrawer $isOpen={isMobileMenuOpen}>
                <MobileMenuHeader>
                    <MobileMenuTitle>메뉴</MobileMenuTitle>
                    <MobileCloseButton onClick={closeMobileMenu}>✕</MobileCloseButton>
                </MobileMenuHeader>
                <MobileNavList>
                    <MobileNavItem to={'/main/introduce/greeting'} onClick={closeMobileMenu}>
                        클래스 소개
                    </MobileNavItem>
                    <MobileNavDivider />
                    <MobileEducationWrapper>
                        <MobileEducationHeader onClick={() => setIsMobileEducationOpen(!isMobileEducationOpen)}>
                            <span>교육</span>
                            <MobileArrow $isOpen={isMobileEducationOpen} />
                        </MobileEducationHeader>
                        <MobileEducationDropdown $isOpen={isMobileEducationOpen}>
                            <MobileSubNavItem to={'/main/education/process'} onClick={closeMobileMenu}>
                                교육 과정
                            </MobileSubNavItem>
                            <MobileSubNavItem to={'/main/education/schedule'} onClick={closeMobileMenu}>
                                교육 일정
                            </MobileSubNavItem>
                            <MobileSubNavItem to={'/main/education/registration'} onClick={closeMobileMenu}>
                                교육 등록 및 결제방법
                            </MobileSubNavItem>
                        </MobileEducationDropdown>
                    </MobileEducationWrapper>
                    <MobileNavDivider />
                    <MobileNavItem to={'/main/formTaping'} onClick={closeMobileMenu}>
                        Form Taping 자료실
                    </MobileNavItem>
                    <MobileNavDivider />
                    <MobileNavItem to={'/main/tapingManager'} onClick={closeMobileMenu}>
                        한국전문테이핑관리사
                    </MobileNavItem>
                    <MobileNavDivider />
                    <MobileNavItem to={'/main/classAlbum'} onClick={closeMobileMenu}>
                        클래스 앨범
                    </MobileNavItem>
                    <MobileNavDivider />
                    <MobileNavItem to={'/main/sns'} onClick={closeMobileMenu}>
                        관련 SNS
                    </MobileNavItem>
                </MobileNavList>
                <MobileVisitCount>오늘 {visitCount}명이 방문했어요</MobileVisitCount>
            </MobileMenuDrawer>
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
    @media (max-width: 768px) {
        height: 60px;
    }
`;

const LogoImg = styled.img`
    padding-left: 70px;
    @media (max-width: 768px) {
        padding-left: 20px;
        height: 30px;
    }
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
    @media (max-width: 1100px) {
        display: none;
    }
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
    @media (max-width: 1100px) {
        display: none;
    }
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

const MobileMenuButton = styled.button<{$isOpen: boolean}>`
    display: none;
    flex-direction: column;
    justify-content: space-around;
    width: 24px;
    height: 20px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    margin-right: 20px;
    z-index: 1001;

    @media (max-width: 1100px) {
        display: flex;
    }

    span {
        width: 100%;
        height: 2px;
        background-color: ${({theme}) => theme.text};
        transition: all 0.3s ease;
        transform-origin: center;

        &:nth-child(1) {
            transform: ${({$isOpen}) => $isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'rotate(0)'};
        }
        &:nth-child(2) {
            opacity: ${({$isOpen}) => $isOpen ? 0 : 1};
        }
        &:nth-child(3) {
            transform: ${({$isOpen}) => $isOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'rotate(0)'};
        }
    }
`;

const MobileMenuOverlay = styled.div`
    display: none;
    @media (max-width: 1100px) {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 999;
    }
`;

const MobileMenuDrawer = styled.div<{$isOpen: boolean}>`
    display: none;
    @media (max-width: 1100px) {
        display: flex;
        flex-direction: column;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: ${({theme}) => theme.background};
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        padding: 20px;
        z-index: 1000;
        transform: ${({$isOpen}) => $isOpen ? 'translateY(0)' : 'translateY(100%)'};
        transition: transform 0.3s ease-in-out;
        max-height: 80vh;
        overflow-y: auto;
        // border-top: 1px solid ${({theme}) => theme.border};
    }
`;

const MobileMenuHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid ${({theme}) => theme.border};
`;

const MobileMenuTitle = styled.p`
    font-size: 18px;
    font-weight: 700;
`;

const MobileCloseButton = styled.button`
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: ${({theme}) => theme.text};
    padding: 5px;
`;

const MobileNavList = styled.div`
    display: flex;
    flex-direction: column;
`;

const MobileNavItem = styled(Link)`
    padding: 15px 10px;
    font-size: 16px;
    font-weight: 600;
    color: ${({theme}) => theme.text};
    text-decoration: none;
    transition: 0.2s;

    &:hover {
        color: #588DFF;
    }
`;

const MobileNavDivider = styled.div`
    // height: 1px;
    // background-color: ${({theme}) => theme.border};
`;

const MobileEducationWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const MobileEducationHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 10px;
    cursor: pointer;

    span {
        font-size: 16px;
        font-weight: 600;
        color: ${({theme}) => theme.text};
    }
`;

const MobileArrow = styled.span<{$isOpen: boolean}>`
    font-size: 12px !important;
    transition: transform 0.3s ease;
    transform: ${({$isOpen}) => $isOpen ? 'rotate(180deg)' : 'rotate(0)'};
`;

const MobileEducationDropdown = styled.div<{$isOpen: boolean}>`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    max-height: ${({$isOpen}) => $isOpen ? '200px' : '0'};
    transition: max-height 0.3s ease;
    // padding-left: 20px;
    background-color: ${({theme}) => theme.inputBackground};
`;

const MobileSubNavItem = styled(Link)`
    padding: 12px 10px;
    font-size: 14px;
    font-weight: 500;
    color: ${({theme}) => theme.headerDropDownText};
    text-decoration: none;

    &:hover {
        color: ${({theme}) => theme.text};
    }
`;

const MobileVisitCount = styled.p`
    text-align: center;
    padding-top: 20px;
    margin-top: 10px;
    // border-top: 1px solid ${({theme}) => theme.border};
    font-size: 13px;
    color: rgba(255, 255, 255, 0.5);
`;