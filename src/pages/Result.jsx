import Layout from '../components/layout/Layout';
import styled from 'styled-components';
import Card from '../components/result/Card';
import { useState } from 'react';

const DATA = [1, 2, 3, 4];

const levelMap = {
  5: '매우 높음',
  4: '높음',
  3: '보통',
  2: '낮음',
  1: '매우 낮음',
};

const Result = () => {
  const [level, setLevel] = useState(5);

  return (
    <Layout>
      <Wrapper>
        <Wrap>
          <Title>불법촬영 가능성 판단 결과</Title>
          <ResultBox level={level}>{levelMap[level]}</ResultBox>
          <CardSection>
            {DATA.map(item => (
              <Card key={item} />
            ))}
          </CardSection>
        </Wrap>
      </Wrapper>
    </Layout>
  );
};

export default Result;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #2c2c2c;
  overflow: auto;
`;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  margin: 60px 0px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 600;
`;

const ResultBox = styled.div`
  width: 350px;
  min-height: 100px;
  background-color: ${props =>
    props.level === 5
      ? '#D32F2F'
      : props.level === 4
        ? '#FD7E14'
        : props.level === 3
          ? '#FFC107'
          : props.level === 2
            ? '#85C21E'
            : '#28A745'};
  color: white;
  font-size: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  padding: 30px;
  gap: 50px;
`;
