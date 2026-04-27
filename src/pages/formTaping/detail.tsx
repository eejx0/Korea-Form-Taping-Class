import styled from "styled-components"
import { motion } from "framer-motion"
import SaveIcon from "../../assets/img/svg/save.svg";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getReferenceDetail } from "../../apis/formTaping";
import { downloadFile } from "../../apis";
import { GetReferenceResponse } from "../../apis/formTaping/type";

export const FormTapingDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [detail, setDetail] = useState<GetReferenceResponse | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            try {
                const res = await getReferenceDetail(id);
                setDetail(res.data);
            } catch (error) {
                console.error('자료실 상세 조회 에러: ', error);
            }
        };
        fetchData();
    }, [id]);

    const handleDownload = async () => {
        if (!detail?.file) return;

        try {
            const response = await downloadFile(detail.file);
            const blob = new Blob([response.data]);
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = detail.file;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error("파일 다운로드 실패: ", error);
        }
    };

    return (
        <>
            <Wrapper as={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <TitleWrapper>
                    <p>{detail?.title || "로딩 중..."}</p>
                    <Button onClick={handleDownload}>
                        <img src={SaveIcon} alt="저장" />
                    </Button>
                </TitleWrapper>
                {detail && (
                    <InfoWrapper>
                        <InfoItem>
                            <span>날짜</span>
                            <p>{detail.dates}</p>
                        </InfoItem>
                        <InfoItem>
                            <span>파일</span>
                            <p>{detail.file}</p>
                        </InfoItem>
                    </InfoWrapper>
                )}
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
    margin-bottom: 80px;
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
        margin-bottom: 60px;
    }
`;

const TitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    > p {
        font-size: 30px;
        font-weight: 600;
    }
    @media (max-width: 768px) {
        > p {
            font-size: 20px;
        }
    }
`;

const Button = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: 100px;
    border: none;
    background-color: #588DFF;
    cursor: pointer;
    transition: 0.2s;
    flex-shrink: 0;
    &:hover {
        background-color: #355599;
    }
    @media (max-width: 768px) {
        width: 40px;
        height: 40px;
    }
`;

const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 30px;
    padding: 20px;
    border-radius: 12px;
    border: 1px solid ${({theme}) => theme.inputBorder};
    @media (max-width: 768px) {
        margin-top: 20px;
        padding: 15px;
        gap: 10px;
    }
`;

const InfoItem = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    > span {
        font-size: 14px;
        font-weight: 600;
        color: ${({theme}) => theme.detailText};
        width: 50px;
    }
    > p {
        font-size: 15px;
        font-weight: 500;
        word-break: break-all;
    }
    @media (max-width: 768px) {
        gap: 15px;
        > span {
            font-size: 13px;
        }
        > p {
            font-size: 14px;
        }
    }
`;
