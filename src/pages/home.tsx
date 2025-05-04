import styled from "styled-components"
import { Header } from "../components/header";
import BackgroundPicture1 from "../assets/img/png/home/1.png";
import BackgroundPicture2 from "../assets/img/png/home/2.png";
import BackgroundPicture3 from "../assets/img/png/home/3.png";
import BackgroundPicture4 from "../assets/img/png/home/4.png";
import RightArrow from "../assets/img/svg/rightArrow.svg";
import SmallRightArrow from "../assets/img/svg/smallRightArrow.svg";
import { motion } from "framer-motion"
import { useEffect, useState } from "react";

export const Home = () => {
    const [backgroundIndex, setBackgroundIndex] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setBackgroundIndex((prevIndex) => (prevIndex + 1) % BackgroundPictures.length)
        }, 5000);
        
        return () => clearInterval(interval);
    }, [])

    const BackgroundPictures = [
        BackgroundPicture1,
        BackgroundPicture2,
        BackgroundPicture3,
        BackgroundPicture4
    ]

    return (
        <>
            <Header />
            <Wrapper>
                <Background>
                    {BackgroundPictures.map((img, index) => (
                        <BackgroundImage
                        key={index}
                        image={img}
                        isVisible={index === backgroundIndex}
                        />
                    ))}
                    <TextWrapper>
                        <SmallTextWrapper>
                            <ColorText>
                                <p className="color">대한민국</p>
                                <p>유일의</p>
                            </ColorText>
                            <p>치료적 테이핑 교육</p>
                        </SmallTextWrapper>
                        <Text>KOREA FORM TAPING CLASS</Text>
                    </TextWrapper>
                </Background>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5 }}
                    viewport={{ once: false }}
                >
                    <IntendedEducationWrapper>
                        <Title>예정된 교육들을 확인하세요</Title>
                        <ListWrapper>
                            <List>
                                <p className="color">5월 11일</p>
                                <p>경북 교육</p>
                            </List>
                            <List>
                                <p className="color">5월 17일</p>
                                <p>부산 교육</p>
                            </List>
                            <List>
                                <p className="color">5월 25일</p>
                                <p>서울 교육</p>
                            </List>
                        </ListWrapper>
                        <Button>
                            <p>신청하러 가기</p>
                            <img src={RightArrow} alt=">" />
                        </Button>
                    </IntendedEducationWrapper>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5 }}
                    viewport={{ once: false }}
                >
                    <ContentWrapper>
                        <SuccessfulCandidatesWrapper>
                            <TitleWrapper>
                                <p className="title">한국전문테이핑관리사 합격자 발표</p>
                                <DetailButton>
                                    <p>자세히 보기</p>
                                    <img src={SmallRightArrow} alt=">" />
                                </DetailButton>
                            </TitleWrapper>
                            <Listwrapper>
                                <Box>
                                    <p>제 7회 한국전문테이핑관리사 2급 합격자 발표</p>
                                    <img src={RightArrow} alt="" />
                                </Box>
                                <Box>
                                    <p>제6회 한국전문테이핑관리사 1급 합격자 발표</p>
                                    <img src={RightArrow} alt="" />
                                </Box>
                                <Box>
                                    <p>제5회 한국전문테이핑관리사 3급 합격자 발표</p>
                                    <img src={RightArrow} alt="" />
                                </Box>
                                <Box>
                                    <p>제4회 한국전문테이핑관리사 3급 합격자 발표</p>
                                    <img src={RightArrow} alt="" />
                                </Box>
                            </Listwrapper>
                        </SuccessfulCandidatesWrapper>
                        <SuccessfulCandidatesWrapper>
                            <TitleWrapper>
                                <p className="title">한국전문테이핑 학회</p>
                                <DetailButton>
                                    <p>자세히 보기</p>
                                    <img src={SmallRightArrow} alt=">" />
                                </DetailButton>
                            </TitleWrapper>
                            <Listwrapper>
                                <Box>
                                    <p>한국직업능력개발연구원 민간자격등록증-한국전문테이핑관리사</p>
                                    <img src={RightArrow} alt="" />
                                </Box>
                                <Box>
                                    <p>제6회 한국전문테이핑관리사 자격 검정 시행 11월 29일-30일</p>
                                    <img src={RightArrow} alt="" />
                                </Box>
                                <Box>
                                    <p>목의 도수교정 금기증와 치료</p>
                                    <img src={RightArrow} alt="" />
                                </Box>
                                <Box>
                                    <p>SI joint dysfunction taping</p>
                                    <img src={RightArrow} alt="" />
                                </Box>
                            </Listwrapper>
                        </SuccessfulCandidatesWrapper>
                    </ContentWrapper>
                </motion.div>
                
            </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    margin-bottom: 100px;
`;

const Background = styled.div`
  position: relative;
  width: 100%;
  height: 472px;
  display: flex;
  overflow: hidden;
`;

const BackgroundImage = styled.div<{ image: string; isVisible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  opacity: ${(props) => (props.isVisible ? 0.4 : 0)};
  transition: opacity 1s ease-in-out;
  z-index: 0;
`;

const ColorText = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    background: none;
    > p {
        background: none;
    }
    .color {
        background: linear-gradient(90deg, #FF6868, #0051FF);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

`;

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding-left: 70px;
    margin-top: auto;
    padding-bottom: 45px;
`;

const SmallTextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    font-weight: 700;
    font-size: 25px;
    color: white;
    position: relative;
    background: none;
    z-index: 1;
    > p {
        background: none;
    }
`;

const Text = styled.p`
    font-size: 50px;
    font-weight: 800;
    color: white;
    z-index: 1;
    background: none;
`;

const IntendedEducationWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 100px;
    width: 100%;
    align-items: center;
`;

const Title = styled.p`
    font-size: 25px;
    font-weight: 700;
`;

const ListWrapper = styled.div`
    display: flex;
    gap: 105px;
    align-items: center;
    font-weight: 600;
    font-size: 20px;
    margin-top: 50px;
`;

const List = styled.div`
    display: flex;
    gap: 5px;
    .color {
        color: #588DFF;
    }
`;

const Button = styled.div`
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 600;
    width: 216px;
    height: 45px;
    background-color: gray;
    margin-top: 85px;
    background: linear-gradient(90deg, #588DFF, #355599);
    border-radius: 30px;
    padding-left: 30px;
    padding-right: 30px;
    justify-content: space-between;
    cursor: pointer;
`;

const ContentWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 200px;
    margin-top: 100px;
`;

const SuccessfulCandidatesWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 40px;
    .title {
        font-size: 25px;
        font-weight: 700;
    }
`;

const DetailButton = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    > p {
        color: rgba(255,255,255,0.59);
        font-weight: 500;
        font-size: 15px;
    }
`;

const Listwrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    gap: 20px;
`;

const Box = styled.div`
    padding: 18px 30px 18px 30px;
    border: 1px solid white;
    border-radius: 10px;
    width: auto;
    justify-content: space-between;
    display: flex;
    cursor: pointer;
    gap: 30px;
    > p {
        font-size: 20px;
        font-weight: 600;
    }
`;