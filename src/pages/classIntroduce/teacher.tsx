import styled from "styled-components"
import { Header } from "../../components/header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Teacher = () => {
    const [selected, setSelected] = useState<string>('강사');
    const navigate = useNavigate();
    
    const handleSelect = (item: string) => {
        setSelected(item);

        switch (item) {
            case "인사말":
                navigate("/introduce/greeting");
                break;
            case "연혁":
                navigate("/introduce/history");
                break;
            case "강사":
                navigate("/introduce/teacher");
                break;
            default:
                break;
        }
    }
    return (
        <>
            <Header />
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
`;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 100px;
    margin-top: 70px;
    height: 100%;
`;

const ListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 35px;
    align-items: center;
`;

const Circle = styled.div<{ $isSelected: boolean }>`
    width: ${({ $isSelected }) => ($isSelected ? "104px" : "90px")};
    height: ${({ $isSelected }) => ($isSelected ? "104px" : "90px")};
    background-color: ${({ $isSelected }) =>
        $isSelected ? "#588DFF" : "#355599"};
    border-radius: 50%;
    font-size: ${({ $isSelected }) => ($isSelected ? "20px" : "15px")};
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 35px;
    height: 100%;
    > p {
        font-size: 25px;
        font-weight: 600;
    }
`;

const ContentBox = styled.div`
    display: flex;
    margin-top: 25px;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    padding-top: 30px;
    padding-bottom: 30px;
    min-height: 70%;
    justify-content: space-between;
`;

const BoxWrapper = styled.div`
    display: flex;
    flex-direction: column;
    > p {
        font-size: 20px;
        font-weight: 600;
    }
`;

const Box = styled.div`
    padding: 20px 25px 20px 25px;
    border-radius: 20px;
    border: 1px solid rgba(255,255,255,0.5);
    margin-top: 30px;
`;