import styled from "styled-components"
import { Header } from "../../components/header";
import SaveIcon from "../../assets/img/svg/save.svg";

export const TapingManagerDetail = () => {
    return (
        <>
            <Header />
            <Wrapper>
                <TitleWrapper>
                    <p>2025년 경북 김천 5월 11일 KFT-1st class</p>
                    <Button>
                        <img src={SaveIcon} alt="저장" />
                    </Button>
                </TitleWrapper>
            </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
    display: flex;
    padding-left: 270px;
    padding-right: 270px;
    flex-direction: column;
    margin-top: 70px;
    @media (max-width: 1300px) {
        padding-left: 200px;
        padding-right: 200px;
    }
    @media (max-width: 1175px) {
        padding-left: 100px;
        padding-right: 100px;
    }
    @media (max-width: 875px) {
        padding-left: 30px;
        padding-right: 30px;
    }
`;

const TitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    > p {
        font-size: 30px;
        font-weight: 600;
    }
`;

const Button = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: 100px;
    border: none;
    background-color: #588DFF;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
        background-color: #355599;
    }
`;