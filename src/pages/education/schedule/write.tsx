import styled from "styled-components"
import Arrow from "../../../assets/img/svg/rightArrow.svg";
import FileIcon from "../../../assets/img/svg/file.svg";
import WarningIcon from "../../../assets/img/svg/warning.svg";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { checkPassword } from "../../../apis";
import { Input } from "../../../components/input";
import { postSchedule } from "../../../apis/education";

export const EducationScheduleWrite = () => {
    const [form, setForm] = useState({
        title: '',
        doctorFee: '',
        doctorSecondFee: '',
        doctorAfterFee: '',
        studentFee: '',
        studentSecondFee: '',
        studentAfterFee: '',
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [password, setPassword] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [errorMessage, setErroeMessage] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleButtonClick = async () => {
        try {
            const res = await checkPassword(password);
            const { result } = res.data;

            if (result === 'true') {
                setIsOpen(true);
                setErroeMessage('');
            } else {
                setIsOpen(false);
                setErroeMessage('비밀번호가 올바르지 않습니다.');
            }
        } catch (err) {
            console.error("비밀번호 확인 실패: ", err);
        }
    };

    const handleChange = (key: keyof typeof form, value: string) => {
        const priceKeys = [
            "doctorFee", "doctorSecondFee", "doctorAfterFee",
            "studentFee", "studentSecondFee", "studentAfterFee"
        ];
        if (priceKeys.includes(key)) {
            if (value === '' || /^[0-9]+$/.test(value)) {
                setForm(prev => ({ ...prev, [key]: value }));
            }
        } else {
            setForm(prev => ({ ...prev, [key]: value }));
        }
    };

    const handleFileSelect = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleSubmit = async () => {
        if (isSubmitting) return;

        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append("title", form.title);
            if (selectedFile) {
                formData.append("userfile", selectedFile);
            }
            formData.append("doctorFee", form.doctorFee === '' ? '0' : form.doctorFee);
            formData.append("doctorSecondFee", form.doctorSecondFee === '' ? '0' : form.doctorSecondFee);
            formData.append("doctorAfterFee", form.doctorAfterFee === '' ? '0' : form.doctorAfterFee);
            formData.append("studentFee", form.studentFee === '' ? '0' : form.studentFee);
            formData.append("studentSecondFee", form.studentSecondFee === '' ? '0' : form.studentSecondFee);
            formData.append("studentAfterFee", form.studentAfterFee === '' ? '0' : form.studentAfterFee);

            const res = await postSchedule(formData);
            if (res.data.result === 'true') {
                alert('교육 일정이 등록되었습니다.');
                navigate('/main/education/schedule');
            } else {
                alert('교육 일정 등록에 실패했습니다.');
            }
        } catch (err) {
            console.error("업로드 실패: ", err);
            alert('교육 일정 등록 중 오류가 발생했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Wrapper>
                <TitleWrapper>
                    <p>비밀번호를 입력해주세요</p>
                    <SubTitle>운영자만 사용이 가능합니다</SubTitle>
                </TitleWrapper>
                <InputWrapper>
                    <InputBox>
                        <TitleInput value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호를 입력해주세요" type="password"/>
                        {errorMessage && 
                            <ErrorTextWrapper>
                                <img src={WarningIcon} alt="" />
                                <ErrorText>{errorMessage}</ErrorText>
                            </ErrorTextWrapper>
                        }
                    </InputBox>
                    <Button 
                        disabled={password.length === 0}
                        $active={password.length > 0}
                        onClick={handleButtonClick}
                    >
                        <p>글쓰러 가기</p>
                        <img src={Arrow} alt="" />
                    </Button>
                </InputWrapper>
                {isOpen && (
                    <BottomWrapper>
                        <ContentWrapper>
                            <ContentTitleWrapper>
                                <p>교육 일정 글쓰기</p>
                                <WriteButton onClick={handleSubmit} disabled={isSubmitting}>
                                {isSubmitting ? '등록 중...' : '작성'}
                            </WriteButton>
                            </ContentTitleWrapper>
                            <TitleInputWrapper>
                                <TitleInput value={form.title} onChange={(e) => handleChange("title", e.target.value)} placeholder="제목을 입력해주세요"/>
                                <AddFileWrapper>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                    />
                                    <FileButton onClick={handleFileSelect}>파일 선택</FileButton>
                                    <FileName>
                                        <img src={FileIcon} alt="파일명" />
                                        <p>{selectedFile ? selectedFile.name : "선택된 파일이 없습니다."}</p>
                                    </FileName>
                                </AddFileWrapper>
                            </TitleInputWrapper>
                        </ContentWrapper>
                        <PaymentContentWrapper>
                            <p>가격 설정</p>
                            <PaymentInputWrapper>
                                <LeftWrapper>
                                    <Input value={form.doctorFee} onChange={(e) => handleChange("doctorFee", e.target.value)} placeholder="임상가 가격을 입력하세요" label="임상가 가격"/>
                                    <Input value={form.doctorSecondFee} onChange={(e) => handleChange("doctorSecondFee", e.target.value)} placeholder="임상가 재수강 가격을 입력하세요" label="임상가 재수강 가격"/>
                                    <Input value={form.doctorAfterFee} onChange={(e) => handleChange("doctorAfterFee", e.target.value)} placeholder="임상가 3회 이상 재수강 가격을 입력하세요" label="임상가 3회 이상 재수강 가격"/>
                                </LeftWrapper>
                                <RightWrapper>
                                    <Input value={form.studentFee} onChange={(e) => handleChange("studentFee", e.target.value)} placeholder="학생 가격을 입력하세요" label="학생 가격"/>
                                    <Input value={form.studentSecondFee} onChange={(e) => handleChange("studentSecondFee", e.target.value)} placeholder="학생 재수강 가격을 입력하세요" label="학생 재수강 가격"/>
                                    <Input value={form.studentAfterFee} onChange={(e) => handleChange("studentAfterFee", e.target.value)} placeholder="학생 3회 이상 재수강 가격을 입력하세요" label="학생 3회 이상 재수강 가격"/>
                                </RightWrapper>
                            </PaymentInputWrapper>
                        </PaymentContentWrapper>
                    </BottomWrapper>
                    
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
    gap: 50px;
    margin-bottom: 100px;
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
        padding-bottom: 50px;
    }
`;

const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    > p {
        font-size: 30px;
        font-weight: 600;
    }
    @media (max-width: 768px) {
        gap: 10px;
        > p {
            font-size: 22px;
        }
    }
`;

const SubTitle = styled.div`
    font-size: 15px;
    font-weight: 400;
    color: ${({theme}) => theme.detailText};
    @media (max-width: 768px) {
        font-size: 13px;
    }
`;

const InputWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 30px;
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 15px;
    }
`;

const InputBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`;

const TitleInput = styled.input`
    height: 50px;
    width: 100%;
    border: 1px solid ${({theme}) => theme.inputBorder};
    outline: none;
    background-color: ${({theme}) => theme.inputBackground};
    border-radius: 12px;
    padding: 0px 20px 0px 20px;
    font-size: 15px;
    color: ${({theme}) => theme.text};
`;

const Button = styled.button<{$active: boolean}>`
    width: 200px;
    min-width: 200px;
    height: 50px;
    border-radius: 30px;
    background: ${({ $active }) =>
        $active
            ? "linear-gradient(90deg, #588DFF, #355599)"
            : "linear-gradient(90deg, #DBDBDB, #6F6F6F)"};
    border: none;
    display: flex;
    align-items: center;
    padding: 0px 30px 0px 30px;
    justify-content: space-between;
    cursor: ${({ $active }) => ($active ? "pointer" : "not-allowed")};
    transition: 0.2s;
    > p {
        color: white;
        font-weight: 600;
        font-size: 15px;
    }
    @media (max-width: 768px) {
        width: 100%;
        min-width: unset;
    }
`;

const BottomWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 35px;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 60px;
    width: 100%;
    gap: 50px;
    > p {
        font-size: 30px;
        font-weight: 600;
    }
`;

const ContentTitleWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    > p {
        font-size: 30px;
        font-weight: 600;
    }
    @media (max-width: 768px) {
        > p {
            font-size: 22px;
        }
    }
`;

const WriteButton = styled.button`
    padding: 9px 16px;
    border: 1px solid #588DFF;
    border-radius: 5px;
    background-color: #242424;
    font-size: 15px;
    color: #588DFF;
    cursor: pointer;
`;

const PaymentContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 50px;
    width: 100%;
    > p {
        font-size: 30px;
        font-weight: 600;
    }
    @media (max-width: 768px) {
        gap: 30px;
        > p {
            font-size: 22px;
        }
    }
`;

const PaymentInputWrapper = styled.div`
    display: flex;
    width: 100%;
    gap: 30px;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 20px;
    }
`;

const LeftWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;
    @media (max-width: 768px) {
        gap: 20px;
    }
`;

const RightWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;
    @media (max-width: 768px) {
        gap: 20px;
    }
`;

const TitleInputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 35px;
`;

const AddFileWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 35px;
    height: 50px;
    @media (max-width: 768px) {
        flex-direction: column;
        height: auto;
        gap: 15px;
    }
`;

const FileButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 250px;
    min-width: 250px;
    height: 50px;
    border-radius: 30px;
    border: none;
    background-color: #588DFF;
    font-size: 15px;
    font-weight: 600;
    color: white;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
        background-color: #355599;
    }
    @media (max-width: 768px) {
        width: 100%;
        min-width: unset;
    }
`;

const FileName = styled.div`
    display: flex;
    width: 100%;
    height: 50px;
    background-color: ${({theme}) => theme.inputBackground};
    border-radius: 8px;
    padding: 0px 18px 0px 18px;
    align-items: center;
    border: 1px solid ${({theme}) => theme.inputBorder};
    gap: 20px;
    > p {
        font-size: 15px;
        font-weight: 400;
        color: ${({theme}) => theme.fileName};
    }
`;

const ErrorTextWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const ErrorText = styled.p`
    color: #FF5858;
    font-size: 15px;
`;