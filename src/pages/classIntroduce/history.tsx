import styled from "styled-components"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const TABS = ["인사말", "연혁", "강사"] as const;

export const History = () => {
    const [selected, setSelected] = useState<string>('연혁');
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
                        <TimelineItem>
                            <TimelineDot />
                            <TimelineContent>
                                <TimelineYear>2018</TimelineYear>
                                <TimelineText>Korea Form-Taping Class 개설 (2018년 10월 1일)</TimelineText>
                            </TimelineContent>
                        </TimelineItem>
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
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    @media (max-width: 768px) {
        margin-top: 30px;
    }
`;

const TimelineItem = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 20px;
`;

const TimelineDot = styled.div`
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #588DFF;
    flex-shrink: 0;
    margin-top: 5px;
    box-shadow: 0 0 12px rgba(88, 141, 255, 0.4);
`;

const TimelineContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const TimelineYear = styled.span`
    font-size: 14px;
    font-weight: 600;
    color: #588DFF;
`;

const TimelineText = styled.p`
    font-size: 17px;
    font-weight: 500;
    line-height: 1.6;
    @media (max-width: 768px) {
        font-size: 15px;
    }
`;
