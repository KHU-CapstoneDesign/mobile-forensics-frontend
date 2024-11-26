import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import Detail from '../components/result/Detail';
import { useState, useEffect } from 'react';
import LogContainer from '../components/result/LogContainer';
import LogItem from '../components/result/LogItem';
import axios from 'axios';

const DATA = [
  { time: '04:19:11', result: false },
  { time: '04:19:22', result: false },
  { time: '18:29:32', result: true },
  { time: '18:39:23', result: true },
  { time: '20:39:32', result: false },
];

const CameraLog = () => {
  const [time, setTime] = useState('');
  const [logData, setLogData] = useState([]);

  useEffect(() => {
    setTime(window.sessionStorage.getItem('time'));
  }, [window.sessionStorage.getItem('time')]);

  // 촬영 로그 데이터 요청
  const getData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/result/picture-taken`, // 요청 URL
        {
          // 요청 헤더
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // 쿠키 자동 전송
        },
      );

      if (res.status === 200) {
        console.log('response:', res.data); // 성공 응답 출력
        const formattedTime = res.data.map(
          item => item.timestamp.split(['T'])[1],
        );
        setLogData(formattedTime);
      } else {
        return null; // 데이터가 없는 경우 처리s
      }
    } catch (err) {
      console.error('Failed to get data:', err); // 에러 로그 출력
      return null; // 에러 발생 시 처리
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (logData.length) {
      console.log(logData);
    }
  }, [logData]);

  return (
    <Layout>
      <Wrapper>
        <Detail time={time} number={logData.length} />
        <Content>
          <LogWrapper>
            {logData.map((item, idx) => (
              <LogItem
                key={idx}
                $result={item}
                $isLast={logData.length - 1 === idx}
              >
                {item}
              </LogItem>
            ))}
          </LogWrapper>
        </Content>
      </Wrapper>
    </Layout>
  );
};
export default CameraLog;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px 0px;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  /* width: 100%; */
  width: 500px;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 50px 0px;
  justify-content: center;
`;

const LogWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
