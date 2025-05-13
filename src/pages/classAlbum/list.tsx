import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import Example from "../../assets/img/svg/example.svg";

export const ClassAlbumList = () => {
    const dummyData = [
        Example,
        Example,
        Example,
        Example,
        Example,
        Example,
        Example,
        Example,
        Example
    ]

    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [listNum, setListNum] = useState<number>(6);

    useEffect(() => {
        const handleResize = () => {
            setListNum(6);
        };

        handleResize(); 
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const totalPages = Math.ceil(dummyData.length / listNum);
    const currentData = dummyData.slice(
        (currentPage - 1) * listNum,
        currentPage * listNum
    );

    
    return (
        <>
            <Wrapper>
                <TitleWrapper>
                    <p>클래스 앨범</p>
                    <button onClick={() => navigate('/classAlbum/add')}>사진 올리기</button>
                </TitleWrapper>
                <ContentWrapper>
                    <GridWrapper>
                        {currentData.map((img, idx) => (
                            <ImgWrapper onClick={() => navigate('/classAlbum/detail')}>
                                <ImageBox key={idx}>
                                    <img src={img} alt={`앨범 이미지 ${idx + 1}`} />
                                </ImageBox>
                                <p>2025년 대한물리치료사협회 울산지부 ...</p>
                            </ImgWrapper>
                        ))}
                    </GridWrapper>
                    <PaginationWrapper>
                        {Array.from({ length: totalPages }, (_, idx) => (
                            <Button
                                key={idx}
                                onClick={() => setCurrentPage(idx + 1)}
                            >
                                {idx + 1}
                            </Button>
                        ))}
                    </PaginationWrapper>
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
    height: calc(100vh - 70px - 84px);
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

const ImgWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    cursor: pointer;
    > p {
        font-size: 13px;
        font-weight: 500;
    }
`;

const ImageBox = styled.div`
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
    height: 130px;
    @media (max-height: 920px) {
        height: 200px;
    }
    @media (max-height: 800px) {
        height: 130px;
    }

    > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;


const TitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    > p {
        font-weight: 600;
        font-size: 30px;
    }
    > button {
        width: 120px;
        height: 40px;
        border-radius: 10px;
        background: linear-gradient(90deg, #588DFF, #355599);
        font-size: 15px;
        font-weight: 600;
        color: white;
        border: none;
        cursor: pointer;
    }
`;

const GridWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
    gap: 40px;

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 500px) {
        grid-template-columns: 1fr;
    }
`;


const ContentWrapper = styled.div`
    display: flex;
    margin-top: 45px;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    flex-direction: column;
`;

const PaginationWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: auto;
    margin-bottom: 80px;    
`;

const Button = styled.button`
    display: flex;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #355599;
    align-items: center;
    justify-content: center;
    border: none;
    transition: 0.2s;
    cursor: pointer;
    color: white;
    &:hover {
        background-color: #588DFF;
    }
`;