import styled from "styled-components"
import Arrow from "../../assets/img/svg/rightArrow.svg";
import File from "../../assets/img/svg/file.svg";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { checkPassword } from "../../apis";
import { postReference } from "../../apis/formTaping";
import WarningIcon from "../../assets/img/svg/warning.svg";

export const FormTapingWrite = () => {
    const [password, setPassword] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handlePasswordCheck = async () => {
        try {
            const res = await checkPassword(password);
            const { result } = res.data;

            if (result === 'true') {
                setIsOpen(true);
                setErrorMessage('');
            } else {
                setIsOpen(false);
                setErrorMessage('비밀번호가 올바르지 않습니다.');
            }
        } catch (err) {
            console.error("비밀번호 확인 실패: ", err);
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

    const isFormValid = title.trim() !== '' && selectedFile !== null;

    const handleSubmit = async () => {
        if (!isFormValid || isSubmitting) return;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('userfile', selectedFile!);

        setIsSubmitting(true);
        try {
            const res = await postReference(formData);
            if (res.data.result === 'true') {
                alert('글이 등록되었습니다.');
                navigate('/main/formTaping');
            } else {
                alert('글 등록에 실패했습니다.');
            }
        } catch (error) {
            console.error('글 등록 에러: ', error);
            alert('글 등록 중 오류가 발생했습니다.');
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
                        <Input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="비밀번호를 입력해주세요"
                            type="password"
                        />
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
                        onClick={handlePasswordCheck}
                    >
                        <p>글쓰러 가기</p>
                        <img src={Arrow} alt="" />
                    </Button>
                </InputWrapper>
                {isOpen && (
                    <ContentWrapper>
                        <ContentTitleWrapper>
                            <p>Form Taping 자료실 글쓰기</p>
                            <WriteButton
                                $disabled={!isFormValid || isSubmitting}
                                onClick={handleSubmit}
                            >
                                {isSubmitting ? '등록 중...' : '작성'}
                            </WriteButton>
                        </ContentTitleWrapper>
                        <TitleInputWrapper>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="제목을 입력해주세요"
                            />
                            <AddFileWrapper>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                />
                                <button onClick={handleFileSelect}>파일 선택</button>
                                <FileName>
                                    <img src={File} alt="파일명" />
                                    <p>{selectedFile ? selectedFile.name : '선택된 파일이 없습니다'}</p>
                                </FileName>
                            </AddFileWrapper>
                        </TitleInputWrapper>
                    </ContentWrapper>
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
    align-items: flex-start;
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

const Input = styled.input`
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

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 60px;
    width: 100%;
    gap: 50px;
`;

const ContentTitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
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

const WriteButton = styled.button<{ $disabled: boolean }>`
    padding: 9px 16px;
    border: 1px solid ${({ $disabled }) => $disabled ? '#686869' : '#588DFF'};
    border-radius: 5px;
    background-color: transparent;
    font-size: 15px;
    color: ${({ $disabled }) => $disabled ? '#686869' : '#588DFF'};
    cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
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
    > button {
        width: 250px;
        min-width: 250px;
        height: 100%;
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
    }
    @media (max-width: 768px) {
        flex-direction: column;
        height: auto;
        gap: 15px;
        > button {
            width: 100%;
            min-width: unset;
            height: 50px;
        }
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
