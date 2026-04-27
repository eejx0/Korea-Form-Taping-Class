import styled from "styled-components"
import { motion } from "framer-motion"

export const EducationProcess = () => {
    return (
        <>
            <Wrapper as={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Container>
                    <p>교육 과정</p>
                    <ListWrapper>
                        <ListBox>
                            <p className="title">Spiral-Posture control Tapign course : 8 hour</p>
                            <List>
                                <p>1) Total Balance Taping - 4 hour</p>
                                <p>2) Block Balance Taping - 4 hour</p>
                            </List>
                        </ListBox>
                        <ListBox>
                            <p className="title">OMT-Painful Cervical & Lumbar course : 8 hour</p>
                            <List>
                                <p>1) Painful Cervical Taping - 4 hour</p>
                                <p>2) Painful Lumbar Taping - 4 hour</p>
                            </List>
                        </ListBox>
                        <ListBox>
                            <p className="title">OMT-Upper & Lower extremity course : 8 hour</p>
                            <List>
                                <p>1) Upper extremity Taping - 4 hour</p>
                                <p>2) Lower extremity Taping - 4 hour</p>
                            </List>
                        </ListBox>
                        <ListBox>
                            <p className="title">Spiral-Upper & Lower extremity course : 8 hour</p>
                            <List>
                                <p>1) Upper extremity Taping - 4 hour</p>
                                <p>2) Lower extremity Taping - 4 hour</p>
                            </List>
                        </ListBox>
                        <ListBox>
                            <p className="title">Spiral-Internal Taping course : 8 hour</p>
                            <List>
                                <p>1) 寒 Taping - 4 hour</p>
                                <p>2) 熱 Taping - 4 hour</p>
                            </List>
                        </ListBox>
                        <RowWrapper>
                            <RowListBox>
                                <p className="title">Kinetic-1 course</p>
                                <List>
                                    <p>1) Cervical & Upper extremity</p>
                                </List>
                            </RowListBox>
                            <RowListBox>
                                <p className="title">Kinetic-2 course</p>
                                <List>
                                    <p>1) Lumbar & Lower extremity</p>
                                </List>
                            </RowListBox>
                        </RowWrapper>
                    </ListWrapper>
                </Container>
            </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
    display: flex;
    padding-left: 270px;
    padding-right: 270px;
    flex-direction: column;
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
`;

const Container = styled.div`
    margin-top: 70px;
    > p {
        font-size: 30px;
        font-weight: 600;
    }
    @media (max-width: 768px) {
        margin-top: 40px;
        > p {
            font-size: 24px;
        }
    }
`;

const ListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
    margin-top: 30px;
    width: 100%;
    @media (max-width: 768px) {
        gap: 15px;
        margin-top: 20px;
    }
`;

const ListBox = styled.div`
    padding: 20px 35px 20px 35px;
    background-color: ${({theme}) => theme.inputBackground};
    border: 1px solid ${({theme}) => theme.inputBorder};
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    .title {
        font-size: 20px;
        font-weight: 600;
    }
    @media (max-width: 768px) {
        padding: 15px 20px;
        border-radius: 15px;
        gap: 15px;
        .title {
            font-size: 16px;
        }
    }
`;

const RowListBox = styled.div`
    padding: 20px 35px 20px 35px;
    background-color: ${({theme}) => theme.inputBackground};
    border: 1px solid ${({theme}) => theme.inputBorder};
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 50%;
    .title {
        font-size: 20px;
        font-weight: 600;
    }
    @media (max-width: 768px) {
        width: 100%;
        padding: 15px 20px;
        border-radius: 15px;
        gap: 15px;
        .title {
            font-size: 16px;
        }
    }
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 15px;
    font-weight: 400;
    background: none;
    > p {
        background: none;
        color: ${({theme}) => theme.detailText};
    }
    @media (max-width: 768px) {
        font-size: 13px;
    }
`;

const RowWrapper = styled.div`
    display: flex;
    width: 100%;
    gap: 25px;
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 15px;
    }
`;