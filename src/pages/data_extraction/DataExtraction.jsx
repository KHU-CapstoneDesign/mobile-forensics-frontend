import styled from 'styled-components';
import { ReactComponent as AllowPic } from '../../assets/svgs/allow.svg';
import Button from '../../components/common/Button';
import { useFetcher, useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import Modal from '../../components/data_extraction/Modal';
import { useState, useEffect } from 'react';

const DataExtraction = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const openModal = () => {
    setProgress(0);
    setIsModalOpen(true);
    startTimer();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (progress === 100) closeModal();
  }, [progress]);

  const startTimer = () => {
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 100);
  };

  return (
    <>
      {isModalOpen && <Modal progress={progress} />}
      <Layout>
        <Wrapper>
          <Container>
            <StepWrapper>
              <Step>데이터 추출</Step>
              <Text>
                데이터 추출 시작 후 스마트폰에 아래와 같이 USB 디버깅 허용
                알림창이 뜨면&nbsp;<div style={{ color: 'red' }}>허용</div>
                해주세요
              </Text>
              <ImageWrapper>
                <AllowPic />
                <Button
                  width={'500px'}
                  height={'50px'}
                  fontSize={'20px'}
                  alignSelf={'flex-end'}
                  onClick={openModal}
                >
                  데이터 추출하기
                </Button>
              </ImageWrapper>
            </StepWrapper>
          </Container>
        </Wrapper>
      </Layout>
    </>
  );
};

export default DataExtraction;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
  display: flex;
  flex-direction: row;
`;

const StepWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  margin-top: 20px;
`;

const Dots = styled.div`
  width: 64px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: center;
`;
