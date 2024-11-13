import Layout from '../components/layout/Layout';
import styled from 'styled-components';
import Card from '../components/result/Card';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DATA = [
  {
    id: 1,
    name: 'picture',
    title: '사진 발견',
    desc: '범행 시간대에 찍힌 사진이 존재합니다.',
  },
  {
    id: 2,
    name: 'taken',
    title: '사진 촬영 로그 발견',
    desc: '범행 시간대에 사진을 촬영한 로그가 존재합니다.',
  },
  {
    id: 3,
    name: 'gps',
    title: '위치 근접',
    desc: '범행 장소와 인접한 GPS 기록이 존재합니다.',
  },
  {
    id: 4,
    name: 'mybox-cache',
    title: '클라우드 업로드 흔적 발견',
    desc: 'MYBOX에 사진을 업로드한 흔적이 존재합니다',
  },
  {
    id: 5,
    name: 'soda-cache',
    title: '사진 삭제 흔적 발견',
    desc: 'SODA로 사진을 찍고 삭제한 흔적이 존재합니다.',
  },
  {
    id: 6,
    name: 'cloud-app',
    title: '클라우드 앱 사용 기록 발견',
    desc: '범행 시간대에 클라우드 앱을 사용한 기록이 존재합니다.',
  },
  {
    id: 7,
    name: 'camera-app',
    title: '카메라 앱 사용 기록 발견',
    desc: '범행 시간대에 카메라 앱을 사용한 기록이 존재합니다.',
  },
];

const levelMap = {
  5: '매우 높음',
  4: '높음',
  3: '보통',
  2: '낮음',
  1: '매우 낮음',
};

const Result = () => {
  const navigate = useNavigate();
  const [level, setLevel] = useState(5);

  const handleClick = id => {
    if (id === 1) {
      navigate('/result/pictures');
    }
  };

  return (
    <Layout>
      <Wrapper>
        <Wrap>
          <Title>불법촬영 가능성 판단 결과</Title>
          <ResultBox level={level}>{levelMap[level]}</ResultBox>
          <CardSection>
            {DATA.map(item => (
              <Card
                key={item.id}
                title={item.title}
                desc={item.desc}
                onClick={() => handleClick(item.id)}
              />
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
  gap: 20px;
  margin: 50px 0px;
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
