import styled from "styled-components"
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { useState } from "react";

export const EducationRegistration = () => {
    const [selectedJob, setSelectedJob] = useState("직종을 선택해주세요");
    const [jobDropdownOpen, setJobDropdownOpen] = useState(false);
    const [name, setName] = useState("");
    const [englishName, setEnglishName] = useState("");
    const [affiliation, setAffiliation] = useState("");
    const [phone, setPhone] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("교육항목을 선택해주세요");
    const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);
    const courseOptions = [
        "2025.05.11 1st Class Non-elastic approach of posture control ta",
        "스포츠테이핑",
        "임상가 과정",
        "학생 기본과정",
        "심화과정",
        "온라인 과정",
    ];

    const isFormValid =
        name.trim() !== "" &&
        englishName.trim() !== "" &&
        affiliation.trim() !== "" &&
        phone.trim() !== "" &&
        selectedJob !== "직종을 선택해주세요" &&
        selectedCourse !== "교육항목을 선택해주세요";

    return (
        <>
            <Header />
            <Wrapper>
                <TitleWrapper>
                    <p>교육 등록 및 도서 구매</p>
                    <RegisterButton $disabled={!isFormValid}>등록하기</RegisterButton>
                </TitleWrapper>
                <ContentWrapper>
                    <Input value={name} onChange={(e) => setName(e.target.value)} label="이름" placeholder="이름을 입력해주세요"/>
                    <Input value={englishName} onChange={(e) => setEnglishName(e.target.value)} label="영문이름" placeholder="영문이름을 입력해주세요"/>
                    <Input value={affiliation} onChange={(e) => setAffiliation(e.target.value)} label="소속" placeholder="ex) 서울대학교 1학년 운동처방학과"/>
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} label="연락처" placeholder="연락처를 입력해주세요"/>
                    <SelectWrapper>
                        <SelectBox>
                            <Label>직종</Label>
                            <Select onClick={() => setJobDropdownOpen((prev) => !prev)} $selected={selectedJob !== "직종을 선택해주세요"}>
                                {selectedJob}
                            </Select>
                            {jobDropdownOpen && (
                                <OptionList>
                                    <OptionItem onClick={() => { setSelectedJob("임상가"); setJobDropdownOpen(false); }}>임상가</OptionItem>
                                    <Line />
                                    <OptionItem onClick={() => { setSelectedJob("학생"); setJobDropdownOpen(false); }}>학생</OptionItem>
                                </OptionList>
                            )}
                        </SelectBox>
                        <SelectBox>
                            <Label>교육항목</Label>
                            <Select onClick={() => setCourseDropdownOpen((prev) => !prev)} $selected={selectedCourse !== "교육항목을 선택해주세요"}>
                                {selectedCourse}
                            </Select>
                            {courseDropdownOpen && (
                                <OptionList style={{ width: "100%" }}>
                                    {courseOptions.map((option, index) => (
                                    <div key={index} style={{width: '100%', background: 'none', gap: '10px'}}>
                                        <OptionItem
                                            onClick={() => {
                                                setSelectedCourse(option);
                                                setCourseDropdownOpen(false);
                                            }}
                                        >
                                            {option}
                                        </OptionItem>
                                        {index < courseOptions.length - 1 && <CourseLine />}
                                    </div>
                                    ))}
                                </OptionList>
                            )}
                        </SelectBox>
                    </SelectWrapper>
                </ContentWrapper>
                <PaymentWrapper>
                    <p>결제액</p>
                    <p className="amount">15,000,000</p>
                </PaymentWrapper>
                <CreditWayWrapper>
                    <p>결제 방법</p>
                    <CreditWay>
                        <p>무통장 입금 부산은행 | 코리아폼테이핑클래스 (이대희)</p>
                        <p>계좌번호 : 101-2062-3058-01</p>
                        <p>입금 후 <HighLight>"홍길동 교육비 입금완료"</HighLight> 010-6533-2395로 문자 보내 주시면 됩니다.</p>
                        <p>환불규정) 교육 3일전 : 환불 30%, 그 이후 : 환불없음</p>
                    </CreditWay>
                </CreditWayWrapper>
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

const RegisterButton = styled.button<{ $disabled: boolean }>`
    width: 95px;
        height: 40px;
        border-radius: 10px;
        font-size: 15px;
        font-weight: 600;
        color: white;
        border: none;
        cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
    background: ${({ $disabled }) =>
        $disabled
            ? "linear-gradient(90deg, #DBDBDB, #6F6F6F)" 
            : "linear-gradient(90deg, #588DFF, #355599)"};
`;

const TitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    > p {
        font-weight: 600;
        font-size: 30px;
    }
`;

const ContentWrapper = styled.div`
    margin-top: 45px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const SelectWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
    width: 100%;
`;

const SelectBox = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
`;

const Label = styled.p`
    font-size: 15px;
    font-weight: 500;
`;

const Select = styled.div<{$selected: boolean}>`
    display: flex;
    align-items: center;
    width: 100%;
    height: 45px;
    background-color: #414142;
    padding: 0px 20px 0px 20px;
    font-size: 15px;
    font-weight: 400;
    border: none;
    outline: none;
    color: ${({$selected}) => $selected ? '#ffff' : '#686869'};
    border-radius: 12px;
    cursor: pointer;
`;

const CreditWayWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 130px;
    margin-bottom: 100px;
    > p {
        font-size: 30px;
        font-weight: 600;
    }
`;

const CreditWay = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 35px;
    font-size: 20px;
    font-weight: 500;
`;

const HighLight = styled.span`
    font-size: 20px;
    font-weight: 500;
    color: #588DFF;
`;

const OptionList = styled.div`
    position: absolute; 
    top: 100%; 
    left: 0;
    z-index: 10; 
    margin-top: 10px;
    border-radius: 10px;
    overflow: hidden;
    background-color: #414142;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 8px;
    gap: 10px;
    width: 140px;
`;

const OptionItem = styled.div`
    cursor: pointer;
    font-size: 14px;
    background-color: #414142;
    width: 100%; 
    border-radius: 8px;
    display: flex;
    align-items: center;
    height: 30px;
    gap: 10px;
    justify-content: center;

    &:hover {
        background-color: #555555; 
    }
`;

const Line = styled.div`
    width: 100%;
    height: 1px;
    background-color: rgba(255,255,255,0.2);
`;

const CourseLine = styled.div`
    width: 100%;
    height: 1px;
    background-color: rgba(255,255,255,0.2);
    margin-top: 10px;
`;

const PaymentWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 130px;
    font-size: 30px;
    font-weight: 600;
    align-items: center;
    .amount {
        font-size: 20px;
        font-weight: 500;
    }
`;