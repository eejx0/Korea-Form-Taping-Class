import styled from "styled-components";
import Facebook from "../assets/img/svg/sns/facebook.svg";
import Internet from "../assets/img/svg/sns/internet.svg";
import Instagram from "../assets/img/svg/sns/instagram.svg";
import BodyChart from "../assets/img/svg/sns/bodyChart.svg";
import RockTape from "../assets/img/svg/sns/rockTape.svg";
import BBTape from "../assets/img/svg/sns/bb.svg";

export const Sns = () => {
    return (
        <>
            <Wrapper>
                <p>관련 SNS</p>
                <ContentWrapper>
                    <SnsWrapper target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/profile.php?id=100001033585925">
                        <img className="icon" src={Facebook} alt="facebook" />
                        <TextWrapper>
                            <p>이대희 박사 페이스북</p>
                        </TextWrapper>
                    </SnsWrapper>
                    <SnsWrapper target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/daehyi7507/?hl=ko">
                        <img className="icon" src={Instagram} alt="instagram" />
                        <TextWrapper>
                            <p>이대희 박사 인스타그램</p>
                        </TextWrapper>
                    </SnsWrapper>
                    <SnsWrapper target="_blank" rel="noopener noreferrer" href="https://www.arikawaseikei.jp/">
                        <img className="icon" src={Internet} alt="site" />
                        <TextWrapper>
                            <p>Isao Arikawa</p>
                        </TextWrapper>
                    </SnsWrapper>
                    <SnsWrapper target="_blank" rel="noopener noreferrer" href="https://bodychart.modoo.at/">
                        <img className="icon" src={BodyChart} alt="bodyChart" />
                        <TextWrapper>
                            <p>바디차트</p>
                        </TextWrapper>
                    </SnsWrapper>
                    <SnsWrapper target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/rocktapekorea">
                        <img className="icon" src={RockTape} alt="rockTape" />
                        <TextWrapper>
                            <p>락테이프 코리아</p>
                        </TextWrapper>
                    </SnsWrapper>
                    <SnsWrapper target="_blank" rel="noopener noreferrer" href="https://bbtape.com/">
                        <img className="icon" src={BBTape} alt="bbTape" />
                        <TextWrapper>
                            <p>BB Tape</p>
                        </TextWrapper>
                    </SnsWrapper>
                    <SnsWrapper target="_blank" rel="noopener noreferrer" href="https://krivet.re.kr/kor/index.do">
                        <img className="icon" src={Internet} alt="site" />
                        <TextWrapper>
                            <p>한국직업능력개발원</p>
                        </TextWrapper>
                    </SnsWrapper>
                    <SnsWrapper target="_blank" rel="noopener noreferrer" href="https://www.nrf.re.kr/index">
                        <img className="icon" src={Internet} alt="site" />
                        <TextWrapper>
                            <p>한국연구재단</p>
                        </TextWrapper>
                    </SnsWrapper>
                    <SnsWrapper target="_blank" rel="noopener noreferrer" href="http://www.spiraltape.co.jp/">
                        <img className="icon" src={Internet} alt="site" />
                        <TextWrapper>
                            <p>일본 스파이랄 테이핑 협회</p>
                        </TextWrapper>
                    </SnsWrapper>
                    <SnsWrapper target="_blank" rel="noopener noreferrer" href="https://healernote.co.kr/">
                        <img className="icon" src={Internet} alt="site" />
                        <TextWrapper>
                            <p>힐러노트</p>
                        </TextWrapper>
                    </SnsWrapper>
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
    margin-bottom: 80px;
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
    @media (max-width: 768px) {
        margin-top: 40px;
        margin-bottom: 60px;
        > p {
            font-size: 22px;
        }
    }
`;

const ContentWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    justify-content: space-between;
    gap: 30px;
    margin-top: 40px;
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 20px;
        margin-top: 30px;
    }
`;

const SnsWrapper = styled.a`
    display: flex;
    align-items: center;
    gap: 30px;
    cursor: pointer;
    .icon {
        width: 40px;
    }
    @media (max-width: 768px) {
        gap: 20px;
        .icon {
            width: 35px;
        }
    }
`;

const TextWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    justify-content: space-between;
    width: 100%;
    > p {
        font-size: 20px;
        font-weight: 500;
    }
    @media (max-width: 768px) {
        > p {
            font-size: 16px;
        }
    }
`;