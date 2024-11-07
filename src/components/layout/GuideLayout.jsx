import styled from 'styled-components';
import Button from '../common/Button';

const GuideLayout = ({ children }) => {
  return (
    <Wrapper>
      <Skip>건너뛰기</Skip>
      <Guide>GUIDE</Guide>
      <Container>{children}</Container>
    </Wrapper>
  );
};

export default GuideLayout;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const Skip = styled.div`
  color: #757575;
  font-size: 16px;
  text-decoration-line: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
  margin: 30px;
  align-self: flex-end;
  cursor: pointer;
`;

const Guide = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: #2c2c2c;
  margin-bottom: 25px;
`;

const Container = styled.div`
  background-color: #f5f5f5;
  width: 900px;
  height: 650px;
  border-radius: 16px;
`;

const ButtonWrapper = styled.div``;
