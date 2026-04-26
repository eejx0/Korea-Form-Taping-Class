import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { getAlbumList, getImageUrl } from "../../apis/classAlbum";
import { GetAlbumListResponse } from "../../apis/classAlbum/type";

const ITEMS_PER_PAGE = 9;

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    useEffect(() => {
        const mql = window.matchMedia('(max-width: 768px)');
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mql.addEventListener('change', handler);
        return () => mql.removeEventListener('change', handler);
    }, []);
    return isMobile;
};

export const ClassAlbumList = () => {
    const isMobile = useIsMobile();
    const pagesPerGroup = isMobile ? 5 : 10;
    const [listData, setListData] = useState<GetAlbumListResponse | null>(null);
    const [page, setPage] = useState<number>(0);
    const [pageGroup, setPageGroup] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getAlbumList(page);
                setListData(res.data);
            } catch (error) {
                console.error('클래스 앨범 리스트 조회 에러: ', error);
            }
        };
        fetchData();
    }, [page]);

    const totalPages = listData ? listData.maxPage + 1 : 0;
    const currentItems = listData?.items.slice(0, ITEMS_PER_PAGE) || [];

    const totalGroups = Math.ceil(totalPages / pagesPerGroup);
    const startPage = pageGroup * pagesPerGroup;
    const endPage = Math.min(startPage + pagesPerGroup, totalPages);
    const visiblePages = Array.from({ length: endPage - startPage }, (_, i) => startPage + i);

    const handlePrevGroup = () => {
        if (pageGroup > 0) {
            setPageGroup(pageGroup - 1);
            setPage((pageGroup - 1) * pagesPerGroup);
        }
    };

    const handleNextGroup = () => {
        if (pageGroup < totalGroups - 1) {
            setPageGroup(pageGroup + 1);
            setPage((pageGroup + 1) * pagesPerGroup);
        }
    };

    return (
        <>
            <Wrapper>
                <TitleWrapper>
                    <p>클래스 앨범</p>
                    <button onClick={() => navigate('/main/classAlbum/add')}>사진 올리기</button>
                </TitleWrapper>
                <ContentWrapper>
                    <GridWrapper>
                        {currentItems.map((item, idx) => (
                            <ImgWrapper key={idx} onClick={() => navigate(`/main/classAlbum/${item.count}`, { state: { title: item.title } })}>
                                <ImageBox>
                                    <img src={getImageUrl(`uploads/${item.thumbnail}`)} alt={item.title} />
                                </ImageBox>
                                <p>{item.title.length > 30 ? item.title.slice(0, 30) + '...' : item.title}</p>
                            </ImgWrapper>
                        ))}
                    </GridWrapper>
                    <PaginationWrapper>
                        <ArrowButton
                            onClick={handlePrevGroup}
                            disabled={pageGroup === 0}
                            $disabled={pageGroup === 0}
                        >
                            &lt;
                        </ArrowButton>
                        {visiblePages.map((idx) => (
                            <PageButton
                                key={idx}
                                $active={page === idx}
                                onClick={() => setPage(idx)}
                            >
                                {idx + 1}
                            </PageButton>
                        ))}
                        <ArrowButton
                            onClick={handleNextGroup}
                            disabled={pageGroup >= totalGroups - 1}
                            $disabled={pageGroup >= totalGroups - 1}
                        >
                            &gt;
                        </ArrowButton>
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
    padding-top: 70px;
    min-height: calc(100vh - 84px);
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
    @media (max-width: 768px) {
        padding-top: 40px;
        min-height: calc(100vh - 60px);
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
        text-align: center;
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
    align-items: center;
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
    @media (max-width: 768px) {
        > p {
            font-size: 22px;
        }
        > button {
            width: 100px;
            height: 35px;
            font-size: 13px;
        }
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
    margin-top: 60px;
    margin-bottom: 80px;
    flex-wrap: wrap;
    justify-content: center;
    @media (max-width: 768px) {
        gap: 10px;
        margin-top: 40px;
        margin-bottom: 60px;
    }
`;

const PageButton = styled.button<{ $active?: boolean }>`
    display: flex;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${({ $active }) => $active ? '#588DFF' : '#355599'};
    align-items: center;
    justify-content: center;
    border: none;
    transition: 0.2s;
    cursor: pointer;
    color: white;
    font-size: 14px;
    &:hover {
        background-color: #588DFF;
    }
    @media (max-width: 768px) {
        width: 32px;
        height: 32px;
        font-size: 12px;
    }
`;

const ArrowButton = styled.button<{ $disabled?: boolean }>`
    display: flex;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${({ $disabled }) => $disabled ? '#333' : '#242424'};
    border: 1px solid ${({ $disabled }) => $disabled ? '#555' : '#588DFF'};
    align-items: center;
    justify-content: center;
    transition: 0.2s;
    cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
    color: ${({ $disabled }) => $disabled ? '#555' : '#588DFF'};
    font-size: 18px;
    font-weight: bold;
    &:hover {
        background-color: ${({ $disabled }) => $disabled ? '#333' : '#588DFF'};
        color: ${({ $disabled }) => $disabled ? '#555' : 'white'};
    }
    @media (max-width: 768px) {
        width: 32px;
        height: 32px;
        font-size: 14px;
    }
`;
