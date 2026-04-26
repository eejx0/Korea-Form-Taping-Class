import styled from "styled-components"
import EditIcon from "../../../assets/img/svg/edit.svg";
import WarningIcon from "../../../assets/img/svg/error.svg";
import RightIcon from "../../../assets/img/svg/blueRightArrow.svg";
import { ClinicianBox } from "../../../components/paymentAmount/clinicianBox";
import { StudentBox } from "../../../components/paymentAmount/studentBox";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getScheduleDetail } from "../../../apis/education";
import { GetScheduleResponse } from "../../../apis/education/type";
import { downloadFile } from "../../../apis";

export const EducationScheduleDetail = () => {
    const [isActive, setIsActive] = useState<boolean | null>(null);
    const [scheduleTitle, setScheduleTitle] = useState<string>("");
    const [scheduleDetail, setScheduleDetail] = useState<GetScheduleResponse | null>(null);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const handleEditButtonClick = () => {
        navigate(`/main/education/schedule/edit/${id}`, { state: { isActive: scheduleDetail?.isActive } });
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            try {
                const res = await getScheduleDetail(id);
                const detail = res.data;
                setScheduleTitle(detail.title);
                setIsActive(detail.isActive === '1');
                setScheduleDetail(detail);
            } catch (error) {
                console.error("교육 상세 조회 에러: ", error);
            }
        };
    
        fetchData();
    }, [id]);

    const handleSaveClick = async () => {
        if (!scheduleDetail?.file) {
            return;
        }
    
        try {
            const response = await downloadFile(scheduleDetail.file);
            const blob = new Blob([response.data]);
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = scheduleDetail.file;
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
            <Wrapper>
                <TitleWrapper>
                    <p>{scheduleTitle}</p>
                    <ButtonWrapper>
                        <EditButton onClick={handleEditButtonClick}>
                            <img src={EditIcon} alt="수정" />
                        </EditButton>
                        <DownloadButton onClick={handleSaveClick}>
                            공고문 확인하기
                        </DownloadButton>
                    </ButtonWrapper>
                </TitleWrapper>
                <Line />
                <ContentWrapper>
                    {isActive === false ? (
                        <MessageWrapper>
                            <img src={WarningIcon} alt="알림" />
                            <span>이 교육은 등록이 마감되었습니다.</span>
                        </MessageWrapper>
                    ) : (
                        <RegisterButton onClick={() => navigate('/main/education/registration')}>
                            <p>교육 등록하기</p>
                            <img src={RightIcon} alt="" />
                        </RegisterButton>
                    )}
                    <PaymentWrapper>
                        <ClinicianBox doctorFee={scheduleDetail?.doctorFee} doctorSecondFee={scheduleDetail?.doctorSecondFee} doctorAfterFee={scheduleDetail?.doctorAfterFee}/>
                        <StudentBox studentFee={scheduleDetail?.studentFee} studentSecondFee={scheduleDetail?.studentSecondFee} studentAfterFee={scheduleDetail?.studentAfterFee}/>
                    </PaymentWrapper>
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
        flex-direction: column;
        align-items: flex-start;
        > p {
            font-size: 20px;
        }
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`;

const EditButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: 100px;
    border: none;
    background-color: white;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
        background-color: #CECECE;
    }
    > img {
        width: 18px;
    }
    @media (max-width: 768px) {
        width: 40px;
        height: 40px;
        > img {
            width: 14px;
        }
    }
`;

const DownloadButton = styled.button`
    padding: 10px 20px;
    border: 1px solid #588DFF;
    border-radius: 8px;
    background-color: transparent;
    color: #588DFF;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s;
    white-space: nowrap;
    &:hover {
        background-color: #588DFF;
        color: white;
    }
    @media (max-width: 768px) {
        padding: 8px 14px;
        font-size: 13px;
    }
`;

const Line = styled.div`
    width: 100%;
    height: 1px;
    background-color: #414142;
    margin-top: 35px;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 35px;
`;

const MessageWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    > span {
        font-size: 15px;
    }
`;

const RegisterButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 199px;
    height: 51px;
    gap: 20px;
    border: 2px solid #588DFF;
    border-radius: 50px;
    cursor: pointer;
    > p {
        font-weight: 600;
        color: #588DFF;
    }
    @media (max-width: 768px) {
        width: 160px;
        height: 45px;
        gap: 10px;
        > p {
            font-size: 14px;
        }
    }
`;

const PaymentWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
    width: 100%;
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 20px;
    }
`;

