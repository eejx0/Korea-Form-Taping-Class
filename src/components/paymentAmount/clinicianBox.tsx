import styled from "styled-components";
import PeopleIcon from "../../assets/img/svg/people.svg";
import ReturnIcon from "../../assets/img/svg/return.svg";
import ThreeTimeIcon from "../../assets/img/svg/threeTime.svg";

export const ClinicianBox = () => {
    return (
        <ClinicianBoxWrapper>
                            <ClinicianTitleBox>
                                <CinicianTitleWrapper>
                                    <img src={PeopleIcon} alt="" />
                                    <p>임상가</p>
                                </CinicianTitleWrapper>
                                <p>전문 임상가를 위한 과정</p>
                            </ClinicianTitleBox>
                            <CinicianContentBox>
                                <MainProcessWrapper>
                                    <p>정규 과정</p>
                                    <h3>350,000원</h3>
                                </MainProcessWrapper>
                                <OthersWrapper>
                                    <CourseWrapper>
                                        <CourseTitleWrapper>
                                            <img src={ReturnIcon} alt="" />
                                            <p>재수강</p>
                                        </CourseTitleWrapper>
                                        <p>150,000원</p>
                                    </CourseWrapper>
                                    <CourseWrapper>
                                        <CourseTitleWrapper>
                                            <img src={ThreeTimeIcon} alt="" />
                                            <p>3회 이상</p>
                                        </CourseTitleWrapper>
                                        <p>150,000원</p>
                                    </CourseWrapper>
                                </OthersWrapper>
                            </CinicianContentBox>
                        </ClinicianBoxWrapper>
    )
}


const ClinicianBoxWrapper = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    border: 2px solid #588DFF;
    border-radius: 10px;
`;

const ClinicianTitleBox = styled.div`
    display: flex;
    flex-direction: column;
    padding: 25px 35px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    width: 100%;
    background-color: rgba(88, 141, 255, 0.37);
    gap: 15px;
    > p {
        font-size: 15px;
        color: #C6C6C6;
    }
`;

const CinicianTitleWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    background:none;
    > p {
        font-size: 23px;
        font-weight: 600;
        color: #588DFF;
    }
`;

const CinicianContentBox = styled.div`
    padding: 25px 35px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
`;

const MainProcessWrapper = styled.div`
    width: 100%;
    justify-content: space-between;
    align-items: center;
    display: flex;
    > h3 {
        color: #588DFF;
    }
`;

const OthersWrapper = styled.div`
    margin-top: 35px;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const CourseWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const CourseTitleWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;