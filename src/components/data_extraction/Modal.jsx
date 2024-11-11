import styled from 'styled-components';
import CircularProgressBar from './CircularProgressBar';
import { useState, useEffect } from 'react';

const Modal = ({ progress }) => {
  return (
    <Overlay>
      <Wrapper>
        스마트폰 데이터 추출 중...
        <CircularProgressBar size={120} strokeWidth={8} progress={progress} />
      </Wrapper>
    </Overlay>
  );
};

export default Modal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
`;

const Wrapper = styled.div`
  background-color: white;
  color: #2c2c2c;
  height: 200px;
  width: 400px;
  border-radius: 16px;
  padding: 65px;
  font-size: 30px;
  font-weight: 600;
  z-index: 99;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
