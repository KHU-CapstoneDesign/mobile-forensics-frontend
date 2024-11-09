import React, { useState } from 'react';
import styled from 'styled-components';

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  justify-content: center;
  background-color: #f9f9f9;
`;

const Slide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 70%;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Instruction = styled.p`
  font-size: 1.2rem;
`;

const ImageContainer = styled.div`
  width: 60%;
  height: auto;
  margin: 1rem 0;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  margin: 0 5px;
  background-color: ${({ active }) => (active ? '#000' : '#ccc')};
  border-radius: 50%;
  cursor: pointer;
`;

const slides = [
  {
    title: 'STEP 1',
    instruction: 'USB로 스마트폰과 PC를 연결해주세요.',
    image: '/path/to/your/image1.png', // 슬라이드 이미지 경로 설정
  },
  {
    title: 'STEP 2',
    instruction: '스마트폰에서 파일 전송 모드를 활성화하세요.',
    image: '/path/to/your/image2.png',
  },
  {
    title: 'STEP 3',
    instruction: 'PC에서 스마트폰을 탐색하세요.',
    image: '/path/to/your/image3.png',
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleDotClick = index => {
    setCurrentSlide(index);
  };

  return (
    <SliderContainer>
      <Slide>
        <Title>{slides[currentSlide].title}</Title>
        <Instruction>{slides[currentSlide].instruction}</Instruction>
        <ImageContainer>
          <Image src={slides[currentSlide].image} alt="slide image" />
        </ImageContainer>
      </Slide>
      <Dots>
        {slides.map((_, index) => (
          <Dot
            key={index}
            active={index === currentSlide}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </Dots>
    </SliderContainer>
  );
};

export default Slider;
