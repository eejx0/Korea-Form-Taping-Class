import styled, { keyframes } from "styled-components"
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
import { useEffect, useRef, useState } from "react";
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
    const contentRef = useRef<HTMLDivElement>(null);

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

    const handleScrollDown = () => {
        contentRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <Popup />
            <Wrapper>
                <HeroSection>
                    {BackgroundPictures.map((img, index) => (
                        <HeroBackground
                            key={index}
                            image={img}
                            isVisible={index === backgroundIndex}
                        />
                    ))}
                    <HeroOverlay />
                    <HeroContent>
                        {/* <SmallTextWrapper>
                            <ColorText>
                                <p className="color">대한민국</p>
                                <p>유일의</p>
                            </ColorText>
                            <p>치료적 테이핑 교육</p>
                        </SmallTextWrapper> */}
                        <ExplainTextWrapper>
                            대한민국 유일의 치료적 테이핑 교육
                        </ExplainTextWrapper>
                        <HeroTitle>KOREA FORM<br className="mobile-br" /> TAPING CLASS</HeroTitle>
                        <HeroSubText>전문적인 테이핑 기술을 배우고, 자격을 취득하세요</HeroSubText>
                    </HeroContent>
                    <ScrollDownButton onClick={handleScrollDown}>
                        <ScrollArrow />
                    </ScrollDownButton>
                </HeroSection>

                <ContentSection ref={contentRef}>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: false }}
                    >
                        <IntendedEducationWrapper>
                            <SectionTitle>예정된 교육들을 확인하세요</SectionTitle>
                            <ScheduleCardWrapper>
                                {schedules.length > 0 ? (
                                    schedules.map((schedule) => (
                                        <ScheduleCard key={schedule.id} onClick={() => navigate(`/main/education/schedule/${schedule.id}`)}>
                                            <ScheduleInfo>
                                                <ScheduleTitle>{schedule.title}</ScheduleTitle>
                                            </ScheduleInfo>
                                            <ScheduleArrow>
                                                <img src={RightArrow} alt=">" />
                                            </ScheduleArrow>
                                        </ScheduleCard>
                                    ))
                                ) : (
                                    <EmptyText>예정된 교육이 없습니다.</EmptyText>
                                )}
                            </ScheduleCardWrapper>
                            <CTAButton onClick={() => navigate('/main/education/schedule')}>
                                <p>신청하러 가기</p>
                                <img src={RightArrow} alt=">" />
                            </CTAButton>
                        </IntendedEducationWrapper>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: false }}
                    >
                        <BoardWrapper>
                            <BoardSection>
                                <BoardTitleWrapper>
                                    <p className="title">한국전문테이핑관리사</p>
                                    <DetailButton onClick={() => navigate('/main/tapingManager')}>
                                        <p>자세히 보기</p>
                                        <img src={SmallRightArrow} alt=">" />
                                    </DetailButton>
                                </BoardTitleWrapper>
                                <BoardList>
                                    {certList.length > 0 ? (
                                        certList.map((cert) => (
                                            <Box key={cert.id} onClick={() => navigate(`/main/tapingManager/${cert.id}`)}>
                                                <p>{cert.title.length > 30 ? cert.title.slice(0, 30) + '...' : cert.title}</p>
                                                <img src={RightArrow} alt="" />
                                            </Box>
                                        ))
                                    ) : (
                                        <EmptyText>등록된 게시물이 없습니다.</EmptyText>
                                    )}
                                </BoardList>
                            </BoardSection>
                            <BoardSection>
                                <BoardTitleWrapper>
                                    <p className="title">Form Taping 자료실</p>
                                    <DetailButton onClick={() => navigate('/main/formTaping')}>
                                        <p>자세히 보기</p>
                                        <img src={SmallRightArrow} alt=">" />
                                    </DetailButton>
                                </BoardTitleWrapper>
                                <BoardList>
                                    {referenceList.length > 0 ? (
                                        referenceList.map((ref) => (
                                            <Box key={ref.id} onClick={() => navigate(`/main/formTaping/${ref.id}`)}>
                                                <p>{ref.title.length > 30 ? ref.title.slice(0, 30) + '...' : ref.title}</p>
                                                <img src={RightArrow} alt="" />
                                            </Box>
                                        ))
                                    ) : (
                                        <EmptyText>등록된 게시물이 없습니다.</EmptyText>
                                    )}
                                </BoardList>
                            </BoardSection>
                        </BoardWrapper>
                    </motion.div>
                </ContentSection>
            </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const HeroSection = styled.div`
    position: relative;
    width: 100%;
    height: calc(100vh - 65px);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    @media (max-width: 768px) {
        height: calc(100vh - 60px);
    }
`;

const HeroBackground = styled.div<{ image: string; isVisible: boolean }>`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${(props) => props.image});
    background-size: cover;
    background-position: center;
    opacity: ${(props) => (props.isVisible ? 1 : 0)};
    transition: opacity 1.5s ease-in-out;
    z-index: 0;
`;

const HeroOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.55);
    z-index: 1;
`;

const HeroContent = styled.div`
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 20px;
    background: transparent;
    * {
        background-color: transparent;
    }
`;


const HeroTitle = styled.h1`
    font-size: 60px;
    font-weight: 800;
    letter-spacing: -1px;
    margin-top: 10px;
    .mobile-br {
        display: none;
    }
    @media (max-width: 768px) {
        font-size: 38px;
        .mobile-br {
            display: block;
        }
    }
    @media (max-width: 500px) {
        font-size: 28px;
    }
`;

const HeroSubText = styled.p`
    font-size: 18px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.7);
    margin-top: 10px;
    @media (max-width: 768px) {
        font-size: 15px;
    }
    @media (max-width: 500px) {
        font-size: 13px;
    }
`;

const bounce = keyframes`
    0%, 20%, 50%, 80%, 100% {
        transform: translateX(-50%) translateY(0);
    }
    40% {
        transform: translateX(-50%) translateY(10px);
    }
    60% {
        transform: translateX(-50%) translateY(5px);
    }
`;

const ScrollDownButton = styled.button`
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    background: none;
    border: none;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    animation: ${bounce} 2s infinite;
    transition: border-color 0.3s;
    &:hover {
        border-color: #588DFF;
    }
    @media (max-width: 768px) {
        width: 40px;
        height: 40px;
        bottom: 30px;
    }
`;

const ScrollArrow = styled.div`
    width: 12px;
    height: 12px;
    border-right: 2px solid white;
    border-bottom: 2px solid white;
    transform: rotate(45deg) translateY(-3px);
`;

const ContentSection = styled.div`
    display: flex;
    flex-direction: column;
    padding: 100px 70px 120px;
    gap: 120px;
    @media (max-width: 1175px) {
        padding: 80px 50px 100px;
    }
    @media (max-width: 768px) {
        padding: 60px 30px 80px;
        gap: 80px;
    }
`;

const IntendedEducationWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
`;

const SectionTitle = styled.p`
    font-size: 28px;
    font-weight: 700;
    text-align: center;
    @media (max-width: 768px) {
        font-size: 22px;
    }
    @media (max-width: 500px) {
        font-size: 18px;
    }
`;

const ScheduleCardWrapper = styled.div`
    display: flex;
    gap: 20px;
    margin-top: 50px;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    max-width: 900px;
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 15px;
        margin-top: 30px;
    }
`;

const ScheduleCard = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 20px 24px;
    border: 1.5px solid rgba(255, 255, 255, 0.15);
    border-radius: 16px;
    cursor: pointer;
    transition: 0.3s;
    flex: 1;
    min-width: 220px;
    &:hover {
        border-color: rgba(88, 141, 255, 0.6);
        transform: translateY(-4px);
        box-shadow: 0 8px 25px rgba(88, 141, 255, 0.15);
    }
    @media (max-width: 768px) {
        padding: 16px 18px;
        min-width: unset;
    }
`;

const ScheduleDate = styled.span`
    font-size: 13px;
    font-weight: 600;
    color: #588DFF;
    @media (max-width: 768px) {
        font-size: 12px;
        white-space: nowrap;
    }
`;

const ScheduleInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
`;

const ScheduleTitle = styled.p`
    font-size: 17px;
    font-weight: 600;
    @media (max-width: 768px) {
        font-size: 15px;
    }
`;

const ScheduleArrow = styled.div`
    display: flex;
    align-items: center;
    opacity: 0.5;
    transition: 0.3s;
    ${ScheduleCard}:hover & {
        opacity: 1;
        transform: translateX(3px);
    }
`;

const EmptyText = styled.p`
    color: rgba(255, 255, 255, 0.4);
    font-size: 16px;
`;

const CTAButton = styled.div`
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    width: 200px;
    height: 48px;
    margin-top: 60px;
    background: linear-gradient(90deg, #588DFF, #355599);
    border-radius: 30px;
    padding: 0 30px;
    justify-content: space-between;
    cursor: pointer;
    transition: 0.3s;
    > p {
        color: white;
    }
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(88, 141, 255, 0.3);
    }
    @media (max-width: 768px) {
        margin-top: 40px;
    }
`;

const BoardWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    gap: 80px;
    @media (max-width: 900px) {
        flex-direction: column;
        align-items: center;
        gap: 60px;
    }
`;

const BoardSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 500px;
`;

const BoardTitleWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 30px;
    .title {
        font-size: 24px;
        font-weight: 700;
    }
    @media (max-width: 768px) {
        gap: 15px;
        .title {
            font-size: 20px;
        }
    }
    @media (max-width: 500px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
        .title {
            font-size: 18px;
        }
    }
`;

const DetailButton = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: 0.3s;
    > p {
        color: ${({theme}) => theme.detailText};
        font-weight: 500;
        font-size: 14px;
    }
    &:hover {
        opacity: 0.7;
    }
`;

const BoardList = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    gap: 15px;
`;

const Box = styled.div`
    padding: 18px 28px;
    border: 1.5px solid rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    width: 100%;
    justify-content: space-between;
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 20px;
    transition: 0.3s;
    &:hover {
        border-color: rgba(88, 141, 255, 0.6);
        transform: translateY(-4px);
        box-shadow: 0 8px 25px rgba(88, 141, 255, 0.15);
    }
    > p {
        font-size: 18px;
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
            font-size: 15px;
        }
    }
    @media (max-width: 500px) {
        padding: 12px 15px;
        > p {
            font-size: 14px;
        }
    }
`;

const ExplainTextWrapper = styled.div`
    padding: 8px 16px;                                                                                                                 
    border: 1px solid rgba(255, 255, 255, 0.7);                                                                                        
    border-radius: 30px;                                                                                                                  
    color: white;                                                                                                                        
    font-size: 15px;                                                                                                                     
    font-weight: 500;                                                                                                                    
    @media (max-width: 768px) {                                                                                                   
        font-size: 13px;                                                                                                          
        padding: 6px 12px;                                                                                                        
    } 
`;