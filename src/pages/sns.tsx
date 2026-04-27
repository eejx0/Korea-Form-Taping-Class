import styled from "styled-components";
import { motion } from "framer-motion";
import Facebook from "../assets/img/svg/sns/facebook.svg";
import Internet from "../assets/img/svg/sns/internet.svg";
import Instagram from "../assets/img/svg/sns/instagram.svg";
import BodyChart from "../assets/img/svg/sns/bodyChart.svg";
import RockTape from "../assets/img/svg/sns/rockTape.svg";
import BBTape from "../assets/img/svg/sns/bb.svg";

const snsItems = [
    { icon: Facebook, name: "이대희 박사 페이스북", desc: "Facebook", url: "https://www.facebook.com/profile.php?id=100001033585925" },
    { icon: Instagram, name: "이대희 박사 인스타그램", desc: "Instagram", url: "https://www.instagram.com/daehyi7507/?hl=ko" },
    { icon: Internet, name: "Isao Arikawa", desc: "공식 웹사이트", url: "https://www.arikawaseikei.jp/" },
    { icon: BodyChart, name: "바디차트", desc: "공식 웹사이트", url: "https://bodychart.modoo.at/" },
    { icon: RockTape, name: "락테이프 코리아", desc: "Facebook", url: "https://www.facebook.com/rocktapekorea" },
    { icon: BBTape, name: "BB Tape", desc: "공식 웹사이트", url: "https://bbtape.com/" },
    { icon: Internet, name: "한국직업능력개발원", desc: "공식 웹사이트", url: "https://krivet.re.kr/kor/index.do" },
    { icon: Internet, name: "한국연구재단", desc: "공식 웹사이트", url: "https://www.nrf.re.kr/index" },
    { icon: Internet, name: "일본 스파이랄 테이핑 협회", desc: "공식 웹사이트", url: "http://www.spiraltape.co.jp/" },
    { icon: Internet, name: "힐러노트", desc: "공식 웹사이트", url: "https://healernote.co.kr/" },
];

export const Sns = () => {
    return (
        <Wrapper>
            <PageTitle>관련 SNS</PageTitle>
            <ContentWrapper>
                {snsItems.map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                    >
                        <SnsCard target="_blank" rel="noopener noreferrer" href={item.url}>
                            <IconWrapper>
                                <img src={item.icon} alt={item.name} />
                            </IconWrapper>
                            <TextWrapper>
                                <SnsName>{item.name}</SnsName>
                                <SnsDesc>{item.desc}</SnsDesc>
                            </TextWrapper>
                            <ArrowIcon>&#8599;</ArrowIcon>
                        </SnsCard>
                    </motion.div>
                ))}
            </ContentWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 70px 270px 80px;
    min-height: calc(100vh - 84px);
    @media (max-width: 1300px) {
        padding: 70px 200px 80px;
    }
    @media (max-width: 1175px) {
        padding: 70px 100px 80px;
    }
    @media (max-width: 875px) {
        padding: 40px 30px 60px;
    }
    @media (max-width: 768px) {
        min-height: calc(100vh - 60px);
    }
`;

const PageTitle = styled.h1`
    font-size: 32px;
    font-weight: 700;
    @media (max-width: 768px) {
        font-size: 24px;
    }
`;

const ContentWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-top: 40px;
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 12px;
        margin-top: 25px;
    }
`;

const SnsCard = styled.a`
    display: flex;
    align-items: center;
    gap: 18px;
    padding: 20px 24px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    text-decoration: none;
    color: inherit;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
        border-color: rgba(88, 141, 255, 0.4);
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(88, 141, 255, 0.12);
    }

    @media (max-width: 768px) {
        padding: 16px 18px;
        gap: 14px;
    }
`;

const IconWrapper = styled.div`
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: rgba(88, 141, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    > img {
        width: 24px;
        height: 24px;
    }

    @media (max-width: 768px) {
        width: 40px;
        height: 40px;
        > img {
            width: 22px;
            height: 22px;
        }
    }
`;

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
    min-width: 0;
`;

const SnsName = styled.p`
    font-size: 16px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    @media (max-width: 768px) {
        font-size: 15px;
    }
`;

const SnsDesc = styled.p`
    font-size: 13px;
    color: rgba(255, 255, 255, 0.4);
    @media (max-width: 768px) {
        font-size: 12px;
    }
`;

const ArrowIcon = styled.span`
    font-size: 18px;
    color: rgba(255, 255, 255, 0.3);
    flex-shrink: 0;
    transition: 0.3s;

    ${SnsCard}:hover & {
        color: #588DFF;
        transform: translate(2px, -2px);
    }
`;
