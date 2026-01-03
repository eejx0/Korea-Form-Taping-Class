import styled from "styled-components"
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
    min-height: fit-content;
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 20px;
        padding-top: 20px;
        padding-bottom: 20px;
    }
`;

const ProfileImg = styled.img`
    aspect-ratio: 0.85/1;
    width: 150px;
    margin-bottom: auto;
    border-radius: 10px;
    @media (max-width: 768px) {
        width: 120px;
        align-self: center;
    }
`;