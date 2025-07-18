import styled from "styled-components"
import SaveIcon from "../../../assets/img/svg/save.svg";
import EditIcon from "../../../assets/img/svg/edit.svg";
import WarningIcon from "../../../assets/img/svg/error.svg";
import RightIcon from "../../../assets/img/svg/blueRightArrow.svg";
import { ClinicianBox } from "../../../components/paymentAmount/clinicianBox";
import { StudentBox } from "../../../components/paymentAmount/studentBox";
import { Message } from "../../../components/message";
import { useState } from "react";

export const EducationScheduleDetail = () => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isFinish, setIsFinish] = useState<boolean>(true);

    return (
        <>
            <Wrapper>
                <TitleWrapper>
                    <p>2025년 경북 김천 5월 11일 KFT-1st class</p>
                    <ButtonWrapper>
                        <EditButton>
                            <img src={EditIcon} alt="수정" />
                        </EditButton>
                        <SaveButtonWrapper
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            {isHovered && (
                                <StyledMessage>
                                    <Message />
                                </StyledMessage>
                            )}
                            <SaveButton>
                                <img src={SaveIcon} alt="저장" />
                            </SaveButton>
                        </SaveButtonWrapper>
                    </ButtonWrapper>
                </TitleWrapper>
                <Line />
                <ContentWrapper>
                    {isFinish ? (
                        <MessageWrapper>
                            <img src={WarningIcon} alt="알림" />
                            <span>이 교육은 등록이 마감되었습니다.</span>
                        </MessageWrapper>
                    ) : (
                        <RegisterButton>
                            <p>교육 등록하기</p>
                            <img src={RightIcon} alt="" />
                        </RegisterButton>
                    )}
                    <PaymentWrapper>
                        <ClinicianBox />
                        <StudentBox />
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
    align-items: center;
    > p {
        font-size: 30px;
        font-weight: 600;
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
`;

const SaveButtonWrapper = styled.div`
  position: relative; 
`;

const SaveButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: 100px;
    border: none;
    background-color: #588DFF;
    cursor: pointer;
    position: relative;
    transition: 0.2s;
    &:hover {
        background-color: #355599;
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
`;

const PaymentWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
    width: 100%;
`;

const StyledMessage = styled.div`
  position: absolute;
  bottom: 60px;
  border-radius: 8px;
  padding: 8px 12px;
  box-shadow: 0px 2px 8px rgba(0,0,0,0.15);
  z-index: 100;
  white-space: nowrap;
`;