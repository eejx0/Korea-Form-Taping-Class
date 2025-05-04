import styled from "styled-components"
import { Header } from "../../components/header";
import { useState } from "react";
import Profile from "../../assets/img/svg/profile.svg";
import { GreetingSection } from "../../components/greetingSection";
import { useNavigate } from "react-router-dom";

export const Greeting = () => {
    const [selected, setSelected] = useState<string>('인사말');
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
                        <p>인사말</p>
                        <ContentBox>
                            <ProfileImg src={Profile} alt="이대희" />
                            <GreetingSection/>
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
`;

const ProfileImg = styled.img`
    aspect-ratio: 0.85/1;
    width: 150px;
    margin-bottom: auto;
    border-radius: 10px;
`;