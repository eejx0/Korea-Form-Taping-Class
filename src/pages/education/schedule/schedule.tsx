import styled from "styled-components"
import { Table } from "../../../components/table";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { GetScheduleListResponse } from "../../../apis/education/type";
import { getScheduleList } from "../../../apis/education";

export const EducationSchedule = () => {
    const [listdata, setListData] = useState<GetScheduleListResponse | null>(null);
    const [page, setPage] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async (pageNumber: number) => {
            try {
                const res = await getScheduleList(pageNumber);
                setListData(res.data);
            } catch (error) {
                console.error('교육 일정 리스트 조회 에러: ', error);
            }
        };
        fetchData(page);
    }, [page])

    return (
        <>
            <Wrapper>
                <TitleWrapper>
                    <p>교육 일정</p>
                    <button onClick={() => navigate('/main/education/schedule/add')}>글쓰기</button>
                </TitleWrapper>
                <TableWrapper>
                    {listdata && (
                        <Table currentPage={page} maxPage={listdata.maxPage} onPageChange={setPage} data={listdata.items} onRowClick={(id) => navigate(`/main/education/schedule/${id}`)}/>
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