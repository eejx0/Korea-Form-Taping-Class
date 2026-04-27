import styled from "styled-components"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const TABS = ["인사말", "연혁", "강사"] as const;

export const Teacher = () => {
    const [selected, setSelected] = useState<string>('강사');
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
                        <Card>
                            <CardTitle>강사 프로필</CardTitle>
                            <CardBody>
                                <p>강사 : 이대희 물리치료학 박사</p>
                                <br/>
                                <p>전) 임상발란스테이핑물리치료학회 강사</p>
                                <p>전) 대한스파이랄테이핑협회 연수강사</p>
                                <p>현) KFTC 강사</p>
                                <p>현) ROCKTAPE FMT Basic 국제강사</p>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardTitle>강의 경력</CardTitle>
                            <CardBody>
                                <p>영산대학교 물리치료학과 시간강사</p>
                                <p>동의대학교 물리치료학과 시간강사</p>
                                <p>동서대학교 체육학과 시간강사</p>
                                <p>경성대학교 물리치료학과 시간강사</p>
                                <p>그외 다수 대학 출강</p>
                            </CardBody>
                        </Card>
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
    display: flex;
    gap: 25px;
    margin-top: 40px;
    @media (max-width: 768px) {
        flex-direction: column;
        margin-top: 25px;
    }
`;

const Card = styled.div`
    flex: 1;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 30px;
    transition: 0.3s;
    &:hover {
        border-color: rgba(88, 141, 255, 0.3);
        box-shadow: 0 4px 20px rgba(88, 141, 255, 0.08);
    }
    @media (max-width: 768px) {
        padding: 20px;
    }
`;

const CardTitle = styled.p`
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
    color: #588DFF;
    @media (max-width: 768px) {
        font-size: 17px;
        margin-bottom: 15px;
    }
`;

const CardBody = styled.div`
    > p {
        font-size: 15px;
        line-height: 1.8;
    }
    @media (max-width: 768px) {
        > p {
            font-size: 14px;
        }
    }
`;
