import Layout from '../components/layout/Layout';
import styled from 'styled-components';
import Card from '../components/result/Card';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { DataContext } from '../contexts/DataContext';

const MAP = [
  {
    id: 1,
    name: 'images',
    title: '사진 발견',
    desc: '범행 시간대에 찍힌 사진이 존재합니다.',
  },
  {
    id: 2,
    name: 'pictureTaken',
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
    name: 'cacheMybox',
    title: '클라우드 업로드 흔적 발견',
    desc: 'MYBOX에 사진을 업로드한 흔적이 존재합니다',
  },
  {
    id: 5,
    name: 'cacheSoda',
    title: '사진 삭제 흔적 발견',
    desc: 'SODA로 사진을 찍고 삭제한 흔적이 존재합니다.',
  },
  {
    id: 6,
    name: 'appUsageCloud',
    title: '클라우드 앱 사용 기록 발견',
    desc: '범행 시간대에 클라우드 앱을 사용한 기록이 존재합니다.',
  },
  {
    id: 7,
    name: 'appUsageCamera',
    title: '카메라 앱 사용 기록 발견',
    desc: '범행 시간대에 카메라 앱을 사용한 기록이 존재합니다.',
  },
];

const Result = () => {
  const { ipcRenderer } = window;
  const { data } = useContext(DataContext);
  const navigate = useNavigate();
  const [level, setLevel] = useState(0); // 범죄 가능성
  const [formatData, setFormatData] = useState([]); // 결과 정보 가공
  // const [cookie, setCookie] = useState();
  // const cookies = new Cookies();

  // 포렌식 종합 결과
  useEffect(() => {
    // setCookie(cookies.get('userId'));
    // console.log('쿠키:', cookies);
    if (data) {
      console.log('결과 데이터:', data);

      // 범죄 가능성
      let sum = 0;
      if (data.images) {
        sum += 0.2;
        setFormatData(prev => [...prev, 'images']);
      }
      if (data.pictureTaken) {
        sum += 0.3;
        setFormatData(prev => [...prev, 'pictureTaken']);
      }
      if (data.gps.metadata || data.gps.wifi) {
        sum += 0.4;
        setFormatData(prev => [...prev, 'gps']);
      }
      if (data.cache.soda || data.cache.mybox) {
        sum += 0.5;
        if (data.cache.soda) {
          setFormatData(prev => [...prev, 'cacheSoda']);
        }
        if (data.cache.mybox) {
          setFormatData(prev => [...prev, 'cacheMybox']);
        }
      }
      if (data.appUsage.cloud || data.appUsage.camera) {
        sum += 0.1;
        if (data.appUsage.cloud) {
          setFormatData(prev => [...prev, 'appUsageCloud']);
        }
        if (data.appUsage.camera) {
          setFormatData(prev => [...prev, 'appUsageCamera']);
        }
      }
      setLevel(sum);
    }
  }, [data]);

  useEffect(() => {
    if (level) {
      console.log('범죄 가능성 수치 계산:', level);
    }
  }, [level]);

  const handleClick = id => {
    if (id === 1) {
      ipcRenderer.send('get-cookie');
      navigate('/result/pictures');
    } else if (id === 2) {
      navigate('/result/cameraLog');
    } else if (id === 3) {
      navigate('/result/gps');
    } else if (id === 4) {
      navigate('/result/myboxCache');
    } else if (id === 5) {
      navigate('/result/sodaCache');
    } else if (id === 6) {
      navigate('/result/usage/cloud');
    } else if (id === 7) {
      navigate('/result/usage/camera');
    }
  };

  return (
    <Layout>
      <Wrapper>
        <Wrap>
          <Title>불법촬영 가능성 판단 결과</Title>
          <ResultBox level={level}>
            {level >= 0.8
              ? '매우 높음'
              : level >= 0.6
                ? '높음'
                : level >= 0.4
                  ? '보통'
                  : level >= 0.2
                    ? '낮음'
                    : '매우 낮음'}
          </ResultBox>
          <CardSection>
            {formatData.map(item => {
              const mapItem = MAP.find(mapItem => mapItem.name === item);
              return (
                <Card
                  key={mapItem.id}
                  title={mapItem.title}
                  desc={mapItem.desc}
                  onClick={() => handleClick(mapItem.id)}
                />
              );
            })}
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
    props.level >= 0.8
      ? '#D32F2F'
      : props.level >= 0.6
        ? '#FD7E14'
        : props.level >= 0.4
          ? '#FFC107'
          : props.level >= 0.2
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
