import styled from "styled-components"

interface InputProps {
    label: string;
    placeholder: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({placeholder, label, value, onChange}: InputProps) => {
    return (
        <Wrapper>
            <Label>{label}</Label>
            <InputStyle onChange={onChange} value={value} placeholder={placeholder} />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`;

const Label = styled.p`
    font-size: 15px;
    font-weight: 500;
`;

const InputStyle = styled.input`
    width: 100%;
    height: 45px;
    background-color: ${({theme}) => theme.inputBackground};
    border: 1px solid ${({theme}) => theme.inputBorder};
    padding: 0px 20px 0px 20px;
    font-size: 15px;
    font-weight: 400;
    outline: none;
    color: ${({theme}) => theme.text};
    border-radius: 12px;
`;