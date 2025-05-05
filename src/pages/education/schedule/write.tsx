import styled from "styled-components"
import { Header } from "../../../components/header";
import Arrow from "../../../assets/img/svg/rightArrow.svg";
import File from "../../../assets/img/svg/file.svg";
import { useState } from "react";

export const EducationScheduleWrite = () => {
    const [password, setPassword] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const isPassword = password === process.env.REACT_APP_PASSWORD;

    const handleButtonClick = () => {
        setIsOpen(true);
    }

    return (
        <>
            <Header />
            <Wrapper>
                <TitleWrapper>
                    <p>비밀번호를 입력해주세요</p>
                    <SubTitle>운영자만 사용이 가능합니다</SubTitle>
                </TitleWrapper>
                <InputWrapper>
                    <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호를 입력해주세요" type="password"/>
                    <Button 
                        disabled={!isPassword}
                        $active={isPassword}
                        onClick={handleButtonClick}
                    >
                        <p>글쓰러 가기</p>
                        <img src={Arrow} alt="" />
                    </Button>
                </InputWrapper>
                {isOpen && (
                    <ContentWrapper>
                        <p>교육 일정 글쓰기</p>
                        <TitleInputWrapper>
                            <Input placeholder="제목을 입력해주세요"/>
                            <AddFileWrapper>
                                <button>파일 선택</button>
                                <FileName>
                                    <img src={File} alt="파일명" />
                                    <p>2025년 경북 김천 5월 11일 KFT-1st class. hwp</p>
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
`;

const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    > p {
        font-size: 30px;
        font-weight: 600;
    }
`;

const SubTitle = styled.div`
    font-size: 15px;
    font-weight: 400;
    color: rgba(255,255,255,0.5);
`;

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
`;

const Input = styled.input`
    height: 50px;
    width: 100%;
    border: none;
    outline: none;
    background-color: #414142;
    border-radius: 12px;
    padding: 0px 20px 0px 20px;
    font-size: 15px;
    color: white;
`;

const Button = styled.button<{$active: boolean}>`
    width: 200px;
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
        font-weight: 600;
        font-size: 15px;
    }
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
`;

const FileName = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    background-color: #414142;
    border-radius: 8px;
    padding: 0px 18px 0px 18px;
    align-items: center;
    gap: 20px;
    > p {
        font-size: 15px;
        font-weight: 400;
        color: #B8B8B8;
    }
`;