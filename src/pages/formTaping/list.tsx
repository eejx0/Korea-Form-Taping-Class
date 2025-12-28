import styled from "styled-components"
import { Table } from "../../components/table";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getReferenceList } from "../../apis/formTaping";
import { GetReferenceListResponse } from "../../apis/formTaping/type";

export const FormTapingList = () => {
    const [listData, setListData] = useState<GetReferenceListResponse | null>(null);
    const [page, setPage] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getReferenceList(page);
                setListData(res.data);
            } catch (error) {
                console.error('자료실 리스트 조회 에러: ', error);
            }
        };
        fetchData();
    }, [page]);

    return (
        <>
            <Wrapper>
                <TitleWrapper>
                    <p>Form Taping 자료실</p>
                    <button onClick={() => navigate('/main/formTaping/add')}>글쓰기</button>
                </TitleWrapper>
                <TableWrapper>
                    {listData && (
                        <Table
                            currentPage={page}
                            maxPage={listData.maxPage}
                            onPageChange={setPage}
                            data={listData.items}
                            onRowClick={(id) => navigate(`/main/formTaping/${id}`)}
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
`;

const TitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    > p {
        font-weight: 600;
        font-size: 30px;
    }
    > button {
        width: 95px;
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

const TableWrapper = styled.div`
    margin-top: 45px;
    height: 100%;
`;
