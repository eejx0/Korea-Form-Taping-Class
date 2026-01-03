import styled from "styled-components";
import { useState, useEffect } from "react";
import PopupImage from "../assets/img/png/popup/image.png";

const STORAGE_KEY_FOREVER = "popup_hide_forever";
const STORAGE_KEY_UNTIL = "popup_hide_until";

export const Popup = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        const hideForever = localStorage.getItem(STORAGE_KEY_FOREVER);
        if (hideForever === "true") {
            setIsOpen(false);
            return;
        }

        const hideUntil = localStorage.getItem(STORAGE_KEY_UNTIL);
        if (hideUntil) {
            const hideUntilTime = parseInt(hideUntil, 10);
            if (Date.now() < hideUntilTime) {
                setIsOpen(false);
                return;
            }
        }

        setIsOpen(true);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleHideForOneDay = () => {
        const oneDayLater = Date.now() + 24 * 60 * 60 * 1000;
        localStorage.setItem(STORAGE_KEY_UNTIL, oneDayLater.toString());
        setIsOpen(false);
    };

    const handleHideForever = () => {
        localStorage.setItem(STORAGE_KEY_FOREVER, "true");
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <Overlay onClick={handleClose}>
            <PopupContainer onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={handleClose}>✕</CloseButton>
                <ImageWrapper>
                    <img src={PopupImage} alt="팝업 이미지" />
                </ImageWrapper>
                <ButtonWrapper>
                    <OptionButton onClick={handleHideForOneDay}>
                        1일간 닫기
                    </OptionButton>
                    <OptionButton onClick={handleHideForever}>
                        다음부터 보지 않기
                    </OptionButton>
                </ButtonWrapper>
            </PopupContainer>
        </Overlay>
    );
};

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
`;

const PopupContainer = styled.div`
    position: relative;
    background-color: ${({ theme }) => theme.background};
    border-radius: 12px;
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 12px;
    right: 12px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: none;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    transition: background-color 0.2s;

    &:hover {
        background-color: rgba(0, 0, 0, 0.7);
    }
`;

const ImageWrapper = styled.div`
    width: 100%;

    > img {
        width: 100%;
        height: auto;
        display: block;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    border-top: 1px solid ${({ theme }) => theme.border};
`;

const OptionButton = styled.button`
    flex: 1;
    padding: 15px;
    background: none;
    border: none;
    color: ${({ theme }) => theme.text};
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:first-child {
        border-right: 1px solid ${({ theme }) => theme.border};
    }

    &:hover {
        background-color: rgba(88, 141, 255, 0.1);
    }

    @media (max-width: 768px) {
        font-size: 13px;
        padding: 12px;
    }
`;
