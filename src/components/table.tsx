import { useState, useEffect } from "react";
import styled from "styled-components"

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

interface TableProps {
    data: {dates: string; title: string; file: string; id: string}[];
    currentPage: number;
    maxPage: number;
    onPageChange: (page: number) => void;
    onRowClick: (id: string) => void;
}

export const Table = ({data, currentPage, maxPage, onPageChange, onRowClick}: TableProps) => {
    const isMobile = useIsMobile();
    const pagesPerGroup = isMobile ? 5 : 10;
    const [pageGroup, setPageGroup] = useState<number>(0);

    const totalPages = maxPage + 1;
    const totalGroups = Math.ceil(totalPages / pagesPerGroup);
    const startPage = pageGroup * pagesPerGroup;
    const endPage = Math.min(startPage + pagesPerGroup, totalPages);
    const visiblePages = Array.from({ length: endPage - startPage }, (_, i) => startPage + i);

    const handlePrevGroup = () => {
        if (pageGroup > 0) {
            setPageGroup(pageGroup - 1);
            onPageChange((pageGroup - 1) * pagesPerGroup);
        }
    };

    const handleNextGroup = () => {
        if (pageGroup < totalGroups - 1) {
            setPageGroup(pageGroup + 1);
            onPageChange((pageGroup + 1) * pagesPerGroup);
        }
    };

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
                    {data.map((item, idx) => (
                        <tr key={idx} onClick={() => onRowClick(item.id)}>
                        <td className="date">{item.dates}</td>
                        <td>{item.title}</td>
                        </tr>
                    ))}
                </tbody>
            </Wrapper>
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
                        $active={currentPage === idx}
                        onClick={() => onPageChange(idx)}
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
                color: ${({theme}) => theme.detailText};
                width: 120px;
            }
        }
    }
    > tbody {
        > tr {
            > td {
                border: none;
                border-bottom: 1px solid ${({theme}) => theme.tableLine};
                font-size: 15px;
                font-weight: 500;
                cursor: pointer;
            }
            .date {
                font-size: 15px;
                font-weight: 500;
                color: ${({theme}) => theme.detailText};
            }
        }
    }
    @media (max-width: 768px) {
        > thead {
            > tr {
                > th {
                    font-size: 13px;
                    padding-bottom: 8px;
                }
                .date {
                    font-size: 13px;
                    width: 90px;
                }
            }
        }
        > tbody {
            > tr {
                > td {
                    font-size: 13px;
                    padding: 8px 3px;
                }
                .date {
                    font-size: 12px;
                }
            }
        }
    }
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