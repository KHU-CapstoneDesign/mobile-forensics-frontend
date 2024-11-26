import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import { useState, useEffect } from 'react';
import AppCard from '../components/result/AppCard';
import MyboxImg from '../assets/images/mybox.png';
import DriveImg from '../assets/images/drive.png';
import SnowImage from '../assets/images/snow.png';
import SodaImage from '../assets/images/soda.png';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Usage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [time, setTime] = useState('');
  const [cloudData, setCloudData] = useState([]);
  const [cameraData, setCameraData] = useState([]);

  useEffect(() => {
    setTime(window.localStorage.getItem('time'));
  }, [window.localStorage.getItem('time')]);

  // 클라우드 앱 사용 기록 데이터 요청
  const getCloudData = async () => {
    // 네이버 mybox
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/result/app-cloud/naver`, // 요청 URL
        {
          // 요청 헤더
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // 쿠키 자동 전송
        },
      );

      if (res.status === 200) {
        console.log('naver response:', res.data); // 성공 응답 출력
        if (res.data.length) {
          setCloudData(prev => [...prev, 'naver']);
        }
      } else {
        return null; // 데이터가 없는 경우 처리
      }
    } catch (err) {
      console.error('Failed to get data:', err); // 에러 로그 출력
      return null; // 에러 발생 시 처리
    }
    // 구글 drive
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/result/app-cloud/google`, // 요청 URL
        {
          // 요청 헤더
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // 쿠키 자동 전송
        },
      );

      if (res.status === 200) {
        console.log('google response:', res.data); // 성공 응답 출력
        if (res.data.length) {
          setCloudData(prev => [...prev, 'google']);
        }
      } else {
        return null; // 데이터가 없는 경우 처리
      }
    } catch (err) {
      console.error('Failed to get data:', err); // 에러 로그 출력
      return null; // 에러 발생 시 처리
    }
  };

  // 카메라 앱 사용 기록 데이터 요청
  const getCameraData = async () => {
    // snow
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/result/app-cam/snow`, // 요청 URL
        {
          // 요청 헤더
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // 쿠키 자동 전송
        },
      );

      if (res.status === 200) {
        console.log('snow response:', res.data); // 성공 응답 출력
        if (res.data.length) {
          setCameraData(prev => [...prev, 'snow']);
        }
      } else {
        return null; // 데이터가 없는 경우 처리
      }
    } catch (err) {
      console.error('Failed to get data:', err); // 에러 로그 출력
      return null; // 에러 발생 시 처리
    }
    // soda
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/result/app-cam/soda`, // 요청 URL
        {
          // 요청 헤더
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // 쿠키 자동 전송
        },
      );

      if (res.status === 200) {
        console.log('soda response:', res.data); // 성공 응답 출력
        if (res.data.length) {
          setCameraData(prev => [...prev, 'soda']);
        }
      } else {
        return null; // 데이터가 없는 경우 처리
      }
    } catch (err) {
      console.error('Failed to get data:', err); // 에러 로그 출력
      return null; // 에러 발생 시 처리
    }
  };

  useEffect(() => {
    if (params.appType === 'cloud') {
      getCloudData();
    } else {
      getCameraData();
    }
  }, []);

  return (
    <Layout>
      <Wrapper>
        <Grid>
          {params.appType === 'cloud' ? (
            <>
              {cloudData.map(item =>
                item === 'naver' ? (
                  <AppCard
                    key={item}
                    picture={MyboxImg}
                    title={'네이버 MYBOX'}
                    desc={'네이버 MYBOX 앱 실행 기록이 있습니다.'}
                    onClick={() => {
                      navigate('/result/usage/cloud/MYBOX');
                    }}
                  />
                ) : (
                  <AppCard
                    key={item}
                    picture={DriveImg}
                    title={'구글 DRIVE'}
                    desc={'구글 DRIVE 앱 실행 기록이 있습니다.'}
                    onClick={() => {
                      navigate('/result/usage/cloud/DRIVE');
                    }}
                  />
                ),
              )}
            </>
          ) : (
            <>
              {cameraData.map(item =>
                item === 'snow' ? (
                  <AppCard
                    key={item}
                    picture={SnowImage}
                    title={'SNOW'}
                    desc={'SNOW 앱 실행 기록이 있습니다.'}
                    onClick={() => {
                      navigate('/result/usage/camera/SNOW');
                    }}
                  />
                ) : (
                  <AppCard
                    key={item}
                    picture={SodaImage}
                    title={'SODA'}
                    desc={'SODA 앱 실행 기록이 있습니다.'}
                    onClick={() => {
                      navigate('/result/usage/camera/SODA');
                    }}
                  />
                ),
              )}
            </>
          )}

          {/* <Detail time={time} number={2} />
        <BarChart ChartData={dataset} /> */}
        </Grid>
      </Wrapper>
    </Layout>
  );
};

export default Usage;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Grid = styled.div`
  padding: 100px;
  display: grid;
  grid-template-columns: 400px 400px;
  align-items: center;
  /* justify-content: center; */
`;
