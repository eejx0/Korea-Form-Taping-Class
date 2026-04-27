import styled from "styled-components"
import { motion } from "framer-motion"
import { Input } from "../../components/input";
import { getActiveScheduleList, getEducationFee, postRegister } from "../../apis/education";
import { useEffect, useState } from "react";
import { Types, Jobs } from "../../apis/education/type";

export const EducationRegistration = () => {
    const [selectedJob, setSelectedJob] = useState("직종을 선택해주세요");
    const [jobDropdownOpen, setJobDropdownOpen] = useState(false);
    const [name, setName] = useState("");
    const [englishName, setEnglishName] = useState("");
    const [affiliation, setAffiliation] = useState("");
    const [phone, setPhone] = useState("");
    const [selectedCourse, setSelectedCourse] = useState<string | { title: string; id: string; [key: string]: any }>("교육항목을 선택해주세요");
    const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);
    const [courseOptions, setCourseOptions] = useState<any[]>([]);
    const [selectedType, setSelectedType] = useState<string>("교육타입을 선택해주세요");
    const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
    const [fee, setFee] = useState<string>("0");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isFormValid =
        name.trim() !== "" &&
        englishName.trim() !== "" &&
        affiliation.trim() !== "" &&
        phone.trim() !== "" &&
        selectedJob !== "직종을 선택해주세요" &&
        selectedCourse !== "교육항목을 선택해주세요" &&
        selectedType !== "교육타입을 선택해주세요";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getActiveScheduleList();
                setCourseOptions(res.data);
            } catch (error) {
                console.error("교육 신청 가능 항목 조회 에러: ", error);
            }
        };
        fetchData();
    }, [])

    // 결제액 조회
    useEffect(() => {
        const fetchFee = async () => {
            if (
                selectedJob === "직종을 선택해주세요" ||
                typeof selectedCourse === "string" ||
                selectedType === "교육타입을 선택해주세요"
            ) {
                setFee("0");
                return;
            }

            const jobMap: { [key: string]: Jobs } = {
                "임상가": "DOCTOR",
                "학생": "STUDENT"
            };
            const typeMap: { [key: string]: Types } = {
                "일반": "DEFAULT",
                "재수강": "SECOND",
                "3회 이상 재수강": "MORE"
            };

            try {
                const requestData = {
                    job: jobMap[selectedJob],
                    id: selectedCourse.id,
                    type: typeMap[selectedType]
                };
                console.log("결제액 조회 요청:", requestData);
                const res = await getEducationFee(requestData);
                console.log("결제액 조회 응답:", res.data);
                setFee(res.data.cost);
            } catch (error) {
                console.error("결제액 조회 에러: ", error);
            }
        };
        fetchFee();
    }, [selectedJob, selectedCourse, selectedType]);

    const handleRegister = async () => {
        if (!isFormValid || isSubmitting) return;
        if (typeof selectedCourse === "string") return;

        const jobMap: { [key: string]: Jobs } = {
            "임상가": "DOCTOR",
            "학생": "STUDENT"
        };

        setIsSubmitting(true);
        try {
            const res = await postRegister({
                name,
                engname: englishName,
                job: jobMap[selectedJob],
                spcjob: affiliation,
                contact: phone,
                lecture: selectedCourse.id,
                cost: parseInt(fee)
            });
            if (res.data.result === "true") {
                alert("교육 등록이 완료되었습니다.");
                // 폼 초기화
                setName("");
                setEnglishName("");
                setAffiliation("");
                setPhone("");
                setSelectedJob("직종을 선택해주세요");
                setSelectedCourse("교육항목을 선택해주세요");
                setSelectedType("교육타입을 선택해주세요");
                setFee("0");
            } else {
                alert("교육 등록에 실패했습니다.");
            }
        } catch (error) {
            console.error("교육 등록 에러: ", error);
            alert("교육 등록 중 오류가 발생했습니다.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Wrapper as={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <TitleWrapper>
                    <p>교육 등록 및 도서 구매</p>
                    <RegisterButton $disabled={!isFormValid || isSubmitting} onClick={handleRegister}>
                        {isSubmitting ? "등록 중..." : "등록하기"}
                    </RegisterButton>
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
                                {typeof selectedCourse === 'string' ? selectedCourse : selectedCourse.title}
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
                                            {option.title}
                                        </OptionItem>
                                        {index < courseOptions.length - 1 && <CourseLine />}
                                    </div>
                                    ))}
                                </OptionList>
                            )}
                        </SelectBox>
                    </SelectWrapper>
                    <SelectWrapper>
                        <SelectBox>
                            <Label>교육타입</Label>
                            <Select onClick={() => setTypeDropdownOpen((prev) => !prev)} $selected={selectedType !== "교육타입을 선택해주세요"}>
                                {selectedType}
                            </Select>
                            {typeDropdownOpen && (
                                <OptionList>
                                    <OptionItem onClick={() => { setSelectedType("일반"); setTypeDropdownOpen(false); }}>일반</OptionItem>
                                    <Line />
                                    <OptionItem onClick={() => { setSelectedType("재수강"); setTypeDropdownOpen(false); }}>재수강</OptionItem>
                                    <Line />
                                    <OptionItem onClick={() => { setSelectedType("3회 이상 재수강"); setTypeDropdownOpen(false); }}>3회 이상 재수강</OptionItem>
                                </OptionList>
                            )}
                        </SelectBox>
                        <div style={{ width: '50%' }} />
                    </SelectWrapper>
                </ContentWrapper>
                <PaymentWrapper>
                    <p>결제액</p>
                    <p className="amount">{parseInt(fee).toLocaleString()}원</p>
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
    align-items: center;
    > p {
        font-weight: 600;
        font-size: 30px;
    }
    @media (max-width: 768px) {
        > p {
            font-size: 22px;
        }
    }
`;

const ContentWrapper = styled.div`
    margin-top: 45px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    @media (max-width: 768px) {
        margin-top: 30px;
        gap: 15px;
    }
`;

const SelectWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
    width: 100%;
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 15px;
    }
`;

const SelectBox = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
    @media (max-width: 768px) {
        width: 100%;
    }
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
    background-color: ${({theme}) => theme.inputBackground};
    padding: 0px 20px 0px 20px;
    font-size: 15px;
    font-weight: 400;
    border: 1px solid ${({theme}) => theme.inputBorder};
    outline: none;
    color: ${({ theme, $selected }) => {
        const isDark = theme.background === '#242424';
        if (isDark) {
        return $selected ? '#ffff' : '#686869';
        } else {
        return $selected ? '#242424' : '#686869';
        }
    }};
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
    @media (max-width: 768px) {
        margin-top: 60px;
        margin-bottom: 60px;
        > p {
            font-size: 22px;
        }
    }
`;

const CreditWay = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 35px;
    font-size: 20px;
    font-weight: 500;
    @media (max-width: 768px) {
        margin-top: 20px;
        font-size: 14px;
        line-height: 1.6;
    }
`;

const HighLight = styled.span`
    font-size: 20px;
    font-weight: 500;
    color: #588DFF;
    @media (max-width: 768px) {
        font-size: 14px;
    }
`;

const OptionList = styled.div`
    position: absolute; 
    top: 100%; 
    left: 0;
    z-index: 10; 
    margin-top: 10px;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid ${({theme}) => theme.inputBorder};
    background-color: ${({theme}) => theme.inputBackground};
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
    background-color: ${({theme}) => theme.inputBackground};
    width: 100%; 
    border-radius: 8px;
    display: flex;
    align-items: center;
    height: 30px;
    gap: 10px;
    justify-content: center;

    &:hover {
        background-color: ${({theme}) => theme.hoverBackground}; 
        color: ${({theme}) => theme.text};
    }
`;

const Line = styled.div`
    width: 100%;
    height: 1px;
    background-color: ${({theme}) => theme.headerDropDownBorder};
`;

const CourseLine = styled.div`
    width: 100%;
    height: 1px;
    background-color: ${({theme}) => theme.headerDropDownBorder};
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
    @media (max-width: 768px) {
        margin-top: 60px;
        font-size: 22px;
        .amount {
            font-size: 18px;
        }
    }
`;