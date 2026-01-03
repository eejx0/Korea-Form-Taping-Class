import styled from "styled-components"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
                <Container>
                    <ListWrapper>
                        {["인사말", "연혁", "강사"].map((item) => (
                            <Circle
                                key={item}
                                onClick={() => handleSelect(item)}
                                $isSelected={selected === item}
                            >
                                {item}
                            </Circle>
                        ))}
                    </ListWrapper>
                    <ContentWrapper>
                        <p>강사 프로필</p>
                        <ContentBox>
                            <BoxWrapper>
                                <p>강사 프로필</p>
                                <Box>
                                    <p>강사 : 이대희 물리치료학 박사</p>
                                    <br/>
                                    <p>전) 임상발란스테이핑물리치료학회 강사</p>
                                    <p>전) 대한스파이랄테이핑협회 연수강사</p>
                                    <p>현) KFTC 강사</p>
                                    <p>현) ROCKTAPE FMT Basic 국제강사</p>
                                </Box>
                            </BoxWrapper>
                            <BoxWrapper>
                                <p>강의 경력</p>
                                <Box>
                                    <p>영산대학교 물리치료학과 시간강사</p>
                                    <p>동의대학교 물리치료학과 시간강사</p>
                                    <p>동서대학교 체육학과 시간강사</p>
                                    <p>경성대학교 물리치료학과 시간강사</p>
                                    <p>그외 다수 대학 출강</p>
                                </Box>
                            </BoxWrapper>
                        </ContentBox>
                    </ContentWrapper>
                </Container>
            </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
    display: flex;
    padding-left: 270px;
    padding-right: 270px;
    flex-direction: column;
    height: calc(100vh - 90px - 84px);
    @media (max-width: 1300px) {
        padding-left: 200px;
        padding-right: 200px;
    }
    @media (max-width: 1175px) {
        padding-left: 50px;
        padding-right: 50px;
    }
    @media (max-width: 875px) {
        padding-left: 30px;
        padding-right: 30px;
    }
    @media (max-width: 768px) {
        height: auto;
        min-height: calc(100vh - 60px);
        padding-bottom: 40px;
    }
`;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 100px;
    margin-top: 70px;
    height: 100%;
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 30px;
        margin-top: 40px;
    }
`;

const ListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 35px;
    align-items: center;
    @media (max-width: 768px) {
        flex-direction: row;
        justify-content: center;
        gap: 20px;
    }
`;

const Circle = styled.div<{ $isSelected: boolean }>`
    width: 90px;
    height: 90px;
    background-color: #355599;
    font-size: 15px;
    color: white;

    ${({ $isSelected }) =>
        $isSelected &&
        `
        width: 104px;
        height: 104px;
        background-color: #588DFF;
        font-size: 20px;
    `}

    &:hover {
        width: 104px;
        height: 104px;
        background-color: #588DFF;
        font-size: 20px;
    }

    border-radius: 50%;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;

    @media (max-width: 768px) {
        width: 70px;
        height: 70px;
        font-size: 13px;
        ${({ $isSelected }) =>
            $isSelected &&
            `
            width: 80px;
            height: 80px;
            font-size: 15px;
        `}
        &:hover {
            width: 80px;
            height: 80px;
            font-size: 15px;
        }
    }
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 50px;
    height: 100%;
    > p {
        font-size: 25px;
        font-weight: 600;
    }
    @media (max-width: 768px) {
        margin-top: 0;
        > p {
            font-size: 20px;
        }
    }
`;

const ContentBox = styled.div`
    display: flex;
    margin-top: 25px;
    border-top: 1px solid ${({theme}) => theme.border};
    border-bottom: 1px solid ${({theme}) => theme.border};
    padding-top: 30px;
    padding-bottom: 30px;
    min-height: 70%;
    justify-content: space-between;
    gap: 30px;
    @media (max-width: 768px) {
        flex-direction: column;
        min-height: auto;
        padding-top: 20px;
        padding-bottom: 20px;
    }
`;

const BoxWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    > p {
        font-size: 20px;
        font-weight: 600;
    }
    @media (max-width: 768px) {
        > p {
            font-size: 16px;
        }
    }
`;

const Box = styled.div`
    padding: 20px 25px 20px 25px;
    border-radius: 20px;
    border: 1px solid ${({theme}) => theme.border};
    margin-top: 30px;
    > p {
        font-size: 14px;
        line-height: 1.6;
    }
    @media (max-width: 768px) {
        padding: 15px 20px;
        margin-top: 15px;
        > p {
            font-size: 13px;
        }
    }
`;