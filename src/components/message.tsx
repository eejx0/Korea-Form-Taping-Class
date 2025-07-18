import styled from "styled-components"

export const Message = () => {
    return (
        <MessageWrapper>
            <p>💡</p>
            <p>관련 공고문을 다운로드합니다.</p>
        </MessageWrapper>
    )
}

const MessageWrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid #588DFF;
    background-color: rgba(88, 141, 255, 0.37);
    border-radius: 10px 25px 25px 0px;
    font-size: 13px;
`;