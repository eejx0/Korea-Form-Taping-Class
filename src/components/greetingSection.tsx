import styled from "styled-components";

export const GreetingSection = () => {
    return (
        <Wrapper>
            <p>
                안녕하세요. Korea Form-Taping Class 물리치료학 박사 이대희 입니다.
            </p>
            <p>
                KFT-Class는 테이핑 치료의 개발자인 Isao Arikawa의 Orthopedic-Medical Taping &amp;
                Tanaka의 Spiral Balance Taping, Rock-Tape를 바탕으로 임상과 스포츠 현장에 기능적
                움직임을 개선하여 일상생활동작과 운동선수의 커리어를 증가하는데 목적이 있습니다.
            </p>
            <p>
                KFT-Class와 함께 교육에 참석하시는 각 분야 임상전문가와 관련학과 학생 여러분들에게
                아래와 같이 꼭 약속을 하겠습니다.
            </p>
            <ul>
                <li>1. 잘못 인식되고 있는 테이핑 치료에 대해 올바르게 테이핑 치료를 전달하겠습니다.</li>
                <li>2. 임상과 스포츠 현장에서 테이핑 치료의 좋은 효과를 위해 최선을 다하겠습니다.</li>
                <li>3. 테이핑 치료 개발자들과 함께 하는 국제 세미나를 꼭 개최하도록 하겠습니다.</li>
            </ul>
            <p>
                KFT-Class는 2018년 10월 28일 첫 수업을 시작으로 지금까지 진행되고 있습니다.
            </p>
            <p>
                어렵게만 느껴졌던 테이핑 치료를 여러분들에게 어떻게 쉽고 효과적으로 전달할까 오늘도
                고민을 하고 있습니다.
            </p>
            <p>
                앞으로 여러분의 KFT-Class 관심과 참여를 부탁드리고, 오늘도 KFT-Class 홈페이지를
                방문하여 관심을 가져 주셔서 진심으로 감사드립니다.
            </p>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    font-size: 16px;
    color: #333;
    padding-left: 30px;
    line-height: 1.3;
    height: auto;

    ul {
        margin: 16px 0;
        padding-left: 20px;
    }
`;
