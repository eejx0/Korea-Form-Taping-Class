import styled from "styled-components"
import Arrow from "../../../assets/img/svg/rightArrow.svg";
import { useState, useEffect } from "react";
import { checkPassword } from "../../../apis";
import { putSchedule, getScheduleDetail } from "../../../apis/education";
import WarningIcon from "../../../assets/img/svg/warning.svg";
import { useParams } from "react-router-dom";

export const EducationScheduleEdit = () => {
    const [password, setPassword] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOn, setIsOn] = useState<boolean>(false);
    const [errorMessage, setErroeMessage] = useState<string>("");

    const { id } = useParams<{ id: string }>();
    
    useEffect(() => {
        const fetchScheduleDetail = async () => {
            if (!id) return;
            try {
                const res = await getScheduleDetail(id);
                const { isActive } = res.data;
                setIsOn(isActive === "1");
            } catch (err) {
                console.error("교육 상태 조회 실패: ", err);
            }
        };
    
        fetchScheduleDetail();
    }, [id]);

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


    const handleToggle = () => {
        setIsOn(prev => !prev);
    };

    const handleSubmit = async () => {
        if (!id) return;
      
        try {
          await putSchedule(id, isOn)
        } catch (err) {
          console.error("저장 실패: ", err);
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
                        <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호를 입력해주세요" type="password"/>
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
                    <ContentWrapper>
                        <ContentTitleWrapper>
                            <p>교육 등록 여부</p>
                            <WriteButton onClick={handleSubmit}>작성</WriteButton>
                        </ContentTitleWrapper>
                        <ButtonBox>
                            <ButtonTitle>
                                <span>등록 접수 상태</span>
                                <p>{isOn ? "현재 등록을 받고 있습니다." : "등록이 마감되었습니다."}</p>
                            </ButtonTitle>
                            <ButtonContent>
                                <ButtonState $isOn={isOn}>
                                    {isOn ? "접수중" : "마감"}
                                </ButtonState>
                                <SwitchContainer isOn={isOn} onClick={handleToggle}>
                                    <Circle isOn={isOn} />
                                </SwitchContainer>
                            </ButtonContent>
                        </ButtonBox>
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
    color: ${({theme}) => theme.detailText};
`;

const InputWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 30px;
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
    width: 100%;
    justify-content: space-between;
    > p {
        font-size: 30px;
        font-weight: 600;
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

const ButtonBox = styled.div`
    border: 1px solid #414142;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 500px;
    padding: 25px;
`;

const ButtonTitle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    > span {
        font-size: 18px;
        font-weight: 600;
    }
    > p {
        font-size: 15px;
    }
`;

const ButtonContent = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`;

const ButtonState = styled.div<{ $isOn: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 23px;
    padding: 0px 16px;
    border-radius: 30px;
    font-size: 13px;
    background-color: ${({ $isOn }) => ($isOn ? "#588DFF" : "#FF5A5A")};
    color: white;
`;

const SwitchContainer = styled.div<{ isOn: boolean }>`
  width: 50px;
  height: 28px;
  border-radius: 999px;
  background-color: ${({ isOn }) => (isOn ? "#588DFF" : "#ccc")};
  display: flex;
  align-items: center;
  padding: 4px;
  transition: background-color 0.3s;
  cursor: pointer;
`;

const Circle = styled.div<{ isOn: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 999px;
  background-color: white;
  transition: transform 0.3s;
  transform: ${({ isOn }) => (isOn ? "translateX(22px)" : "translateX(0)")};
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