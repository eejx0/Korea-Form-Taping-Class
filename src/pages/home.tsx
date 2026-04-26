import styled from "styled-components"
import { Popup } from "../components/popup";
import BackgroundPicture1 from "../assets/img/png/home/1.jpeg";
import BackgroundPicture2 from "../assets/img/png/home/2.jpeg";
import BackgroundPicture3 from "../assets/img/png/home/3.jpeg";
import BackgroundPicture4 from "../assets/img/png/home/4.jpeg";
import BackgroundPicture5 from "../assets/img/png/home/5.jpeg";
import BackgroundPicture6 from "../assets/img/png/home/6.jpeg";
import BackgroundPicture7 from "../assets/img/png/home/7.png";
import RightArrow from "../assets/img/svg/rightArrow.svg";
import SmallRightArrow from "../assets/img/svg/smallRightArrow.svg";
import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getActiveScheduleList } from "../apis/education";
import { getCertList } from "../apis/tapingManager";
import { getReferenceList } from "../apis/formTaping";
import { GetScheduleResponse } from "../apis/education/type";
import { CertItem } from "../apis/tapingManager/type";
import { ReferenceItem } from "../apis/formTaping/type";

export const Home = () => {
    const [backgroundIndex, setBackgroundIndex] = useState<number>(0);
    const [schedules, setSchedules] = useState<GetScheduleResponse[]>([]);
    const [certList, setCertList] = useState<CertItem[]>([]);
    const [referenceList, setReferenceList] = useState<ReferenceItem[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setBackgroundIndex((prevIndex) => (prevIndex + 1) % BackgroundPictures.length)
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [scheduleRes, certRes, referenceRes] = await Promise.all([
                    getActiveScheduleList(),
                    getCertList(0),
                    getReferenceList(0)
                ]);
                setSchedules(scheduleRes.data.items || scheduleRes.data);
                setCertList(certRes.data.items.slice(0, 4));
                setReferenceList(referenceRes.data.items.slice(0, 4));
            } catch (error) {
                console.error('홈 데이터 조회 에러:', error);
            }
        };
        fetchData();
    }, [])

    const BackgroundPictures = [
        BackgroundPicture1,
        BackgroundPicture2,
        BackgroundPicture3,
        BackgroundPicture4,
        BackgroundPicture5,
        BackgroundPicture6,
        BackgroundPicture7
    ] 

    return (
        <>
            <Popup />
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
                            {schedules.length > 0 ? (
                                schedules.map((schedule) => (
                                    <List key={schedule.id} onClick={() => navigate(`/main/education/schedule/${schedule.id}`)}>
                                        <p>{schedule.title.length > 15 ? schedule.title.slice(0, 15) + '...' : schedule.title}</p>
                                    </List>
                                ))
                            ) : (
                                <EmptyText>예정된 교육이 없습니다.</EmptyText>
                            )}
                        </ListWrapper>
                        <Button onClick={() => navigate('/main/education/schedule')}>
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
                                <p className="title">한국전문테이핑관리사</p>
                                <DetailButton onClick={() => navigate('/main/tapingManager')}>
                                    <p>자세히 보기</p>
                                    <img src={SmallRightArrow} alt=">" />
                                </DetailButton>
                            </TitleWrapper>
                            <Listwrapper>
                                {certList.length > 0 ? (
                                    certList.map((cert) => (
                                        <Box key={cert.id} onClick={() => navigate(`/main/tapingManager/${cert.id}`)}>
                                            <p>{cert.title.length > 30 ? cert.title.slice(0, 30) + '...' : cert.title}</p>
                                            <img src={RightArrow} alt="" />
                                        </Box>
                                    ))
                                ) : (
                                    <p>등록된 게시물이 없습니다.</p>
                                )}
                            </Listwrapper>
                        </SuccessfulCandidatesWrapper>
                        <SuccessfulCandidatesWrapper>
                            <TitleWrapper>
                                <p className="title">Form Taping 자료실</p>
                                <DetailButton onClick={() => navigate('/main/formTaping')}>
                                    <p>자세히 보기</p>
                                    <img src={SmallRightArrow} alt=">" />
                                </DetailButton>
                            </TitleWrapper>
                            <Listwrapper>
                                {referenceList.length > 0 ? (
                                    referenceList.map((ref) => (
                                        <Box key={ref.id} onClick={() => navigate(`/main/formTaping/${ref.id}`)}>
                                            <p>{ref.title.length > 30 ? ref.title.slice(0, 30) + '...' : ref.title}</p>
                                            <img src={RightArrow} alt="" />
                                        </Box>
                                    ))
                                ) : (
                                    <p>등록된 게시물이 없습니다.</p>
                                )}
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
  @media (max-width: 768px) {
    height: 350px;
  }
  @media (max-width: 500px) {
    height: 280px;
  }
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
    @media (max-width: 768px) {
        padding-left: 30px;
        gap: 20px;
        padding-bottom: 30px;
    }
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
    @media (max-width: 768px) {
        font-size: 20px;
    }
    @media (max-width: 500px) {
        font-size: 16px;
    }
`;

const Text = styled.p`
    font-size: 50px;
    font-weight: 800;
    z-index: 1;
    background: none;
    @media (max-width: 768px) {
        font-size: 35px;
    }
    @media (max-width: 500px) {
        font-size: 24px;
    }
`;

const IntendedEducationWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 100px;
    width: 100%;
    align-items: center;
    padding: 0 30px;
    @media (max-width: 768px) {
        margin-top: 60px;
    }
`;

const Title = styled.p`
    font-size: 25px;
    font-weight: 700;
    text-align: center;
    @media (max-width: 768px) {
        font-size: 22px;
    }
    @media (max-width: 500px) {
        font-size: 18px;
    }
`;

const ListWrapper = styled.div`
    display: flex;
    gap: 50px;
    align-items: center;
    font-weight: 600;
    font-size: 20px;
    margin-top: 50px;
    flex-wrap: wrap;
    justify-content: center;
    @media (max-width: 900px) {
        gap: 40px;
    }
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 20px;
        margin-top: 30px;
        font-size: 18px;
    }
`;

const List = styled.div`
    display: flex;
    gap: 5px;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
        opacity: 0.7;
    }
    .color {
        color: #588DFF;
    }
`;

const EmptyText = styled.p`
    color: rgba(255, 255, 255, 0.5);
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
    > p {
        color: white;
    }
    @media (max-width: 768px) {
        margin-top: 50px;
    }
`;

const ContentWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    gap: 200px;
    margin-top: 100px;
    padding: 0 30px;
    @media (max-width: 1200px) {
        gap: 80px;
    }
    @media (max-width: 900px) {
        flex-direction: column;
        align-items: center;
        gap: 60px;
    }
    @media (max-width: 768px) {
        margin-top: 60px;
    }
`;

const SuccessfulCandidatesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 500px;
`;

const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 40px;
    .title {
        font-size: 25px;
        font-weight: 700;
    }
    @media (max-width: 768px) {
        gap: 20px;
        .title {
            font-size: 20px;
        }
    }
    @media (max-width: 500px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        .title {
            font-size: 18px;
        }
    }
`;

const DetailButton = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    > p {
        color: ${({theme}) => theme.detailText};
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
    border: 2px solid ${({theme}) => theme.border};
    border-radius: 10px;
    width: 100%;
    justify-content: space-between;
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 20px;
    transition: 0.2s;
    &:hover {
        border-color: #588DFF;
    }
    > p {
        font-size: 20px;
        font-weight: 600;
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    > img {
        flex-shrink: 0;
    }
    @media (max-width: 768px) {
        padding: 15px 20px;
        gap: 15px;
        > p {
            font-size: 16px;
        }
    }
    @media (max-width: 500px) {
        padding: 12px 15px;
        > p {
            font-size: 14px;
        }
    }
`;