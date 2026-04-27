import styled from "styled-components"
import { useState } from "react";
import Profile from "../../assets/img/svg/profile.svg";
import { GreetingSection } from "../../components/greetingSection";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const TABS = ["인사말", "연혁", "강사"] as const;

export const Greeting = () => {
    const [selected, setSelected] = useState<string>('인사말');
    const navigate = useNavigate();

    const handleSelect = (item: string) => {
        setSelected(item);

        switch (item) {
            case "인사말":
                navigate("/main/introduce/greeting");
                break;
            case "연혁":
                navigate("/main/introduce/history");
                break;
            case "강사":
                navigate("/main/introduce/teacher");
                break;
            default:
                break;
        }
    }
    return (
        <>
            <Wrapper>
                <PageTitle>클래스 소개</PageTitle>
                <TabWrapper>
                    {TABS.map((item) => (
                        <Tab
                            key={item}
                            onClick={() => handleSelect(item)}
                            $isSelected={selected === item}
                        >
                            {item}
                            {selected === item && <TabIndicator layoutId="tab-indicator" />}
                        </Tab>
                    ))}
                </TabWrapper>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <ContentWrapper>
                        <ContentCard>
                            <ProfileSection>
                                <ProfileImg src={Profile} alt="이대희" />
                                <ProfileName>이대희 박사</ProfileName>
                                <ProfileRole>Korea Form-Taping Class</ProfileRole>
                            </ProfileSection>
                            <GreetingContent>
                                <GreetingSection/>
                            </GreetingContent>
                        </ContentCard>
                    </ContentWrapper>
                </motion.div>
            </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 70px 270px 80px;
    min-height: calc(100vh - 84px);
    @media (max-width: 1300px) {
        padding: 70px 200px 80px;
    }
    @media (max-width: 1175px) {
        padding: 70px 50px 80px;
    }
    @media (max-width: 875px) {
        padding: 40px 30px 60px;
    }
    @media (max-width: 768px) {
        min-height: calc(100vh - 60px);
    }
`;

const PageTitle = styled.h1`
    font-size: 32px;
    font-weight: 700;
    @media (max-width: 768px) {
        font-size: 24px;
    }
`;

const TabWrapper = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 30px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    @media (max-width: 768px) {
        margin-top: 20px;
    }
`;

const Tab = styled.div<{ $isSelected: boolean }>`
    position: relative;
    padding: 12px 24px;
    font-size: 16px;
    font-weight: ${({ $isSelected }) => $isSelected ? '600' : '400'};
    color: ${({ $isSelected }) => $isSelected ? '#588DFF' : 'rgba(255, 255, 255, 0.5)'};
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
        color: ${({ $isSelected }) => $isSelected ? '#588DFF' : 'rgba(255, 255, 255, 0.8)'};
    }
    @media (max-width: 768px) {
        padding: 10px 16px;
        font-size: 14px;
    }
`;

const TabIndicator = styled(motion.div)`
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: #588DFF;
    border-radius: 1px;
`;

const ContentWrapper = styled.div`
    margin-top: 40px;
    @media (max-width: 768px) {
        margin-top: 25px;
    }
`;

const ContentCard = styled.div`
    display: flex;
    gap: 40px;
    padding: 40px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        padding: 25px 20px;
        gap: 25px;
    }
`;

const ProfileSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
`;

const ProfileImg = styled.img`
    width: 140px;
    aspect-ratio: 0.85/1;
    border-radius: 12px;
    @media (max-width: 768px) {
        width: 110px;
    }
`;

const ProfileName = styled.p`
    font-size: 18px;
    font-weight: 600;
    @media (max-width: 768px) {
        font-size: 16px;
    }
`;

const ProfileRole = styled.p`
    font-size: 13px;
    color: rgba(255, 255, 255, 0.5);
`;

const GreetingContent = styled.div`
    flex: 1;
`;
