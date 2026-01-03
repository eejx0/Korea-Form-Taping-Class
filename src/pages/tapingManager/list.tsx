import styled from "styled-components"
import { Table } from "../../components/table";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCertList } from "../../apis/tapingManager";
import { GetCertListResponse } from "../../apis/tapingManager/type";

export const TapingManagerList = () => {
    const [listData, setListData] = useState<GetCertListResponse | null>(null);
    const [page, setPage] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getCertList(page);
                setListData(res.data);
            } catch (error) {
                console.error('한국전문테이핑관리사 리스트 조회 에러: ', error);
            }
        };
        fetchData();
    }, [page]);

    return (
        <>
            <Wrapper>
                <TitleWrapper>
                    <p>한국전문테이핑관리사 일정</p>
                    <ButtonWrapper>
                        <WriteButton onClick={() => navigate('/main/tapingManager/add')}>글쓰기</WriteButton>
                    </ButtonWrapper>
                </TitleWrapper>
                <TableWrapper>
                    {listData && (
                        <Table
                            currentPage={page}
                            maxPage={listData.maxPage}
                            onPageChange={setPage}
                            data={listData.items}
                            onRowClick={(id) => navigate(`/main/tapingManager/${id}`)}
                        />
                    )}
                </TableWrapper>
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
    @media (max-width: 768px) {
        margin-top: 40px;
        height: auto;
        min-height: calc(100vh - 60px);
    }
`;

const TitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    > p {
        font-weight: 600;
        font-size: 30px;
    }
    @media (max-width: 768px) {
        > p {
            font-size: 20px;
        }
    }
`;

const ButtonWrapper =  styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    @media (max-width: 768px) {
        gap: 10px;
    }
`;

const WriteButton = styled.button`
    width: 95px;
    height: 40px;
    border-radius: 10px;
    background: linear-gradient(90deg, #588DFF, #355599);
    font-size: 15px;
    font-weight: 600;
    color: white;
    border: none;
    cursor: pointer;
    @media (max-width: 768px) {
        width: 70px;
        height: 35px;
        font-size: 13px;
    }
`;

const BlogButton = styled.a`
    width: 95px;
    height: 40px;
    border-radius: 10px;
    background: linear-gradient(90deg, #45f95d, #329F40);
    font-size: 15px;
    font-weight: 600;
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    @media (max-width: 768px) {
        width: 70px;
        height: 35px;
        font-size: 13px;
    }
`;

const TableWrapper = styled.div`
    margin-top: 45px;
    height: 100%;
    @media (max-width: 768px) {
        margin-top: 30px;
    }
`;
