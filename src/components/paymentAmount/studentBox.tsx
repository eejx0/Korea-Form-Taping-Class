import styled from "styled-components";
import StudentIcon from "../../assets/img/svg/student.svg";
import ReturnIcon from "../../assets/img/svg/return.svg";
import ThreeTimeIcon from "../../assets/img/svg/threeTime.svg";

interface StudentBoxProps {
    studentFee?: string;
    studentSecondFee?: string;
    studentAfterFee?: string;
}

export const StudentBox = ({studentFee, studentSecondFee, studentAfterFee}: StudentBoxProps) => {
    return (
        <StudentBoxWrapper>
                            <StudentTitleBox>
                                <StudentTitleWrapper>
                                    <img src={StudentIcon} alt="" />
                                    <p>학생</p>
                                </StudentTitleWrapper>
                                <p>학생을 위한 특별 할인 과정</p>
                            </StudentTitleBox>
                            <StudentContentBox>
                                <MainProcessWrapper>
                                    <p>정규 과정</p>
                                    <h3>{studentFee}원</h3>
                                </MainProcessWrapper>
                                <OthersWrapper>
                                    <CourseWrapper>
                                        <CourseTitleWrapper>
                                            <img src={ReturnIcon} alt="" />
                                            <p>재수강</p>
                                        </CourseTitleWrapper>
                                        <p>{studentSecondFee}원</p>
                                    </CourseWrapper>
                                    <CourseWrapper>
                                        <CourseTitleWrapper>
                                            <img src={ThreeTimeIcon} alt="" />
                                            <p>3회 이상</p>
                                        </CourseTitleWrapper>
                                        <p>{studentAfterFee}원</p>
                                    </CourseWrapper>
                                </OthersWrapper>
                            </StudentContentBox>
                        </StudentBoxWrapper>
    )
}


const StudentBoxWrapper = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    border: 2px solid #4AE09C;
    border-radius: 10px;
    @media (max-width: 768px) {
        width: 100%;
    }
`;

const StudentTitleBox = styled.div`
    display: flex;
    flex-direction: column;
    padding: 25px 35px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    width: 100%;
    background-color: rgba(74, 224, 156, 0.37);
    gap: 15px;
    > p {
        font-size: 15px;
        color: #C6C6C6;
    }
    @media (max-width: 768px) {
        padding: 20px 25px;
        gap: 10px;
        > p {
            font-size: 13px;
        }
    }
`;

const StudentTitleWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    background:none;
    > p {
        font-size: 23px;
        font-weight: 600;
        color: #4AE09C;
    }
    @media (max-width: 768px) {
        gap: 10px;
        > p {
            font-size: 18px;
        }
        > img {
            width: 24px;
        }
    }
`;

const StudentContentBox = styled.div`
    padding: 25px 35px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    @media (max-width: 768px) {
        padding: 20px 25px;
    }
`;

const MainProcessWrapper = styled.div`
    width: 100%;
    justify-content: space-between;
    align-items: center;
    display: flex;
    > h3 {
        color: #4AE09C;
    }
    @media (max-width: 768px) {
        > p {
            font-size: 14px;
        }
        > h3 {
            font-size: 18px;
        }
    }
`;

const OthersWrapper = styled.div`
    margin-top: 35px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    @media (max-width: 768px) {
        margin-top: 25px;
        gap: 12px;
    }
`;

const CourseWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 768px) {
        > p {
            font-size: 14px;
        }
    }
`;

const CourseTitleWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    @media (max-width: 768px) {
        gap: 8px;
        > p {
            font-size: 14px;
        }
        > img {
            width: 16px;
        }
    }
`;