import styled from "styled-components"
import Example from "../../assets/img/svg/example.svg";
import Example2 from "../../assets/img/svg/example2.svg";

export const ClassAlbumDetail = () => {
    return (
        <>
            <Wrapper>
                <p>2025년 경북 김천 5월 11일 KFT-1st class</p>
                <ContentWrapper>
                    <Line />
                    <ImagesWrapper>
                        <img src={Example} alt="" />
                        <img src={Example2} alt="" />
                    </ImagesWrapper>
                </ContentWrapper>
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
    margin-bottom: 100px;
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
    > p {
        font-size: 30px;
        font-weight: 600;
    }
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 35px;
    gap: 35px;
`;

const Line = styled.div`
    width: 100%;
    height: 1px;
    background-color: #414142;
`;

const ImagesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 30px;
`;