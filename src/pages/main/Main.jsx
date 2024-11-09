import styled from 'styled-components';
import { Navigate, useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import ContentButton from '../../components/main/ContentButton';
import { ReactComponent as PhoneIcon } from '../../assets/svgs/phone.svg';
import { ReactComponent as PCIcon } from '../../assets/svgs/pc.svg';

const Main = () => {
  const navigate = useNavigate();

  const handleGuideClick = () => {
    navigate('/');
  };

  return (
    <Layout>
      <Wrapper>
        <Guide onClick={handleGuideClick}>가이드 다시 보러 가기</Guide>
        <MainWrapper>
          <ContentButton
            number={'1'}
            title={'데이터 추출'}
            icon={<PhoneIcon />}
            desc={
              '불법 촬영 판단을 위한 데이터를 연결된 스마트폰으로부터 추출합니다.'
            }
            buttonText={'데이터 추출하러 가기'}
          />
          <ContentButton
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
  align-items: center;
  gap: 87px;
`;
