import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ContentButton from '../components/main/ContentButton';
import { ReactComponent as PhoneIcon } from '../assets/svgs/phone.svg';
import { ReactComponent as PCIcon } from '../assets/svgs/pc.svg';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

const Main = () => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log('쿠키:', document.cookie);
  }, []);
  // 데이터 추출 여부
  const [isExtracted, setIsExtracted] = useState(false);

  // 로컬 저장소에 데이터 추출 여부 저장
  useEffect(() => {
    if (localStorage.getItem('isExtracted')) {
      setIsExtracted(localStorage.getItem('isExtracted'));
    } else {
      localStorage.setItem('isExtracted', JSON.stringify(isExtracted));
      setIsExtracted(false);
    }
  }, []);

  const handleGuideClick = () => {
    navigate('/');
  };

  const handleDataExtractionClick = () => {
    navigate('/dataExtraction');
  };

  const handleForensicClick = () => {
    navigate('/input');
  };

  return (
    <Layout>
      <Wrapper>
        <Guide onClick={handleGuideClick}>가이드 다시 보러 가기</Guide>
        <MainWrapper>
          <ContentButton
            onClick={handleDataExtractionClick}
            number={'1'}
            title={'데이터 추출'}
            icon={<PhoneIcon />}
            desc={
              '불법 촬영 판단을 위한 데이터를 연결된 스마트폰으로부터 추출합니다.'
            }
            buttonText={
              isExtracted ? '데이터 추출 다시하기' : '데이터 추출하러 가기'
            }
          />
          <ContentButton
            onClick={handleForensicClick}
            number={'2'}
            title={'포렌식 결과 확인'}
            icon={<PCIcon />}
            desc={
              '스마트폰으로부터 추출한 데이터를 기반으로 불법 촬영 판단 결과를 확인합니다.'
            }
            buttonText={'결과 확인하러 가기'}
          />
        </MainWrapper>
      </Wrapper>
    </Layout>
  );
};

export default Main;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Guide = styled.div`
  font-size: 16px;
  color: #757575;
  text-decoration-line: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
  cursor: pointer;
  margin-top: 27px;
  margin-left: 45px;
`;

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 6.5%;
  gap: 87px;
`;
