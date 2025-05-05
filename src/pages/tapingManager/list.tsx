import styled from "styled-components"
import { Header } from "../../components/header";
import { Table } from "../../components/table";
import { useNavigate } from "react-router-dom";

export const TapingManagerList = () => {
    const navigate = useNavigate();
    const dummyData = Array.from({ length: 42 }, (_, i) => ({
        date: `2025-05-${(i % 30 + 1).toString().padStart(2, '0')}`,
        title: `샘플 제목 ${i + 1}`
    }));

    return (
        <>
            <Header/>
            <Wrapper>
                <TitleWrapper>
                    <p>한국전문테이핑관리사 일정</p>
                    <ButtonWrapper>
                        <BlogButton target="_blank" rel="noopener noreferrer" href="https://koreaspecialtapingacademy.tistory.com/">블로그</BlogButton>
                        <WriteButton onClick={() => navigate('/tapingManager/add')}>글쓰기</WriteButton>
                    </ButtonWrapper>
                </TitleWrapper>
                <TableWrapper>
                    <Table data={dummyData}/>
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
`;

const ButtonWrapper =  styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
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
`;

const TableWrapper = styled.div`
    margin-top: 45px;
    height: 100%;
`;