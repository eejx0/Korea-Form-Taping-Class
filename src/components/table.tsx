import { useState } from "react";
import styled from "styled-components"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface TableProps {
    data: {date: string; title: string}[];
}

export const Table = ({data}: TableProps) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [listNum, setListNum] = useState<number>(7);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerHeight < 734) {
                setListNum(7);
            } else if (window.innerHeight < 920){
                setListNum(10);
            }
        };

        handleResize(); 
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const totalPages = Math.ceil(data.length / listNum);
    const currentData = data.slice(
        (currentPage - 1) * listNum,
        currentPage * listNum
    );

    return (
        <TableWrapper>
            <Wrapper>
                <thead>
                    <tr>
                        <th className="date">날짜</th>
                        <th>제목</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((item, idx) => (
                        <tr key={idx} onClick={() => navigate(`/education/schedule/id`)}>
                        <td className="date">{item.date}</td>
                        <td>{item.title}</td>
                        </tr>
                    ))}
                </tbody>
            </Wrapper>
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
        </TableWrapper>
        
    )
}

const TableWrapper =styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
`;

const Wrapper = styled.table`
    width: 100%;
    border: none;
    border-collapse: collapse;
    > thead {
        > tr {
            > th {
                text-align: left;
                font-weight: 600;
                font-size: 15px;
                padding-bottom: 10px;
                border: none;
            }
            .date {
                font-size: 15px;
                font-weight: 500;
                color: rgba(255,255,255,0.5);
                width: 120px;
            }
        }
    }
    > tbody {
        > tr {
            > td {
                border: none;
                border-bottom: 1px solid #414142;
                font-size: 15px;
                font-weight: 500;
                cursor: pointer;
            }
            .date {
                font-size: 15px;
                font-weight: 500;
                color: rgba(255,255,255,0.5);
            }
        }
    }
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