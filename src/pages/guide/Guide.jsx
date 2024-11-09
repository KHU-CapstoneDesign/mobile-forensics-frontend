import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import { ReactComponent as Step1Pic } from '../../assets/svgs/step1.svg';
import { ReactComponent as Step2Pic } from '../../assets/svgs/step2.svg';
import { ReactComponent as Step3Pic } from '../../assets/svgs/step3.svg';
import { ReactComponent as CheckIcon } from '../../assets/svgs/check.svg';

const slides = [
  {
    title: 'STEP 1',
    instruction: 'USB로 스마트폰과 PC를 연결해주세요',
    image: <Step1Pic />, // 슬라이드 이미지 경로 설정
  },
  {
    title: 'STEP 2',
    instruction: '스마트폰의 개발자 옵션을 활성화 해주세요',
    image: <Step2Pic />,
  },
  {
    title: 'STEP 3',
    instruction: '개발자 옵션에서 OEM 잠금해제와 USB 디버깅을 활성화 해주세요',
    image: <Step3Pic />,
  },
  {
    title: 'Completed',
    instruction: '프로그램 사용을 위한 모든 준비가 완료되었습니다',
    image: <CheckIcon />,
  },
];

const Guide = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);

  const handlePrevClick = () => {
    if (step !== 0) setStep(step - 1);
  };

  const handleNextClick = () => {
    if (step !== 3) setStep(step + 1);
  };

  const handleDotClick = index => {
    setStep(index);
  };

  const handleSkip = () => {
    navigate('/main');
  };
  return (
    <Root>
      {/* <Slider /> */}
      <Wrapper>
        <Skip onClick={handleSkip}>건너뛰기</Skip>
        <GuideText>GUIDE</GuideText>
        <Container>
          <StepWrapper>
            <Step>{slides[step].title}</Step>
            <Text>{slides[step].instruction}</Text>
            <ImageWrapper>{slides[step].image}</ImageWrapper>
            <Dots>
              {slides.map((_, index) => (
                <Dot
                  key={index}
                  onClick={() => handleDotClick(index)}
                  $active={index === step}
                />
              ))}
            </Dots>
          </StepWrapper>
        </Container>
        <ButtonWrapper>
          {step !== 0 ? (
            <Button
              onClick={handlePrevClick}
              type={2}
              width={'100%'}
              height={'50px'}
              fontSize={'20px'}
            >
              이전
            </Button>
          ) : (
            ''
          )}
          <Button
            onClick={step === 3 ? handleSkip : handleNextClick}
            width={'100%'}
            height={'50px'}
            fontSize={'20px'}
          >
            {step === 3 ? '메인으로' : '다음'}
          </Button>
        </ButtonWrapper>
      </Wrapper>
    </Root>
  );
};
export default Guide;
const Root = styled.div`
  width: 100%;
  height: 100vh;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #2c2c2c;
`;

const Skip = styled.div`
  color: #757575;
  font-size: 16px;
  text-decoration-line: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
  margin: 30px;
  margin-bottom: 10px;
  align-self: flex-end;
  cursor: pointer;
`;

const GuideText = styled.div`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const Container = styled.div`
  background-color: #f5f5f5;
  width: 880px;
  height: 550px;
  border-radius: 16px;
  padding: 50px;
`;

const Step = styled.div`
  font-size: 34px;
  font-weight: bold;
`;

const Text = styled.div`
  margin-top: 20px;
  font-size: 24px;
`;

const StepWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Dots = styled.div`
  width: 64px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: center;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${({ $active }) => ($active ? '#616161' : '#e0e0e0')};
  border-radius: 50%;
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  width: 650px;
  margin: 30px;
`;

const ButtonPrev = styled.button``;
