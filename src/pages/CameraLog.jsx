import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import Detail from '../components/result/Detail';
import { useState, useEffect } from 'react';
import LogContainer from '../components/result/LogContainer';
import LogItem from '../components/result/LogItem';

const DATA = [
  { time: '04:19:11', result: false },
  { time: '04:19:22', result: false },
  { time: '18:29:32', result: true },
  { time: '18:39:23', result: true },
  { time: '20:39:32', result: false },
];

const CameraLog = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    setTime(window.localStorage.getItem('time'));
  }, [window.localStorage.getItem('time')]);
  return (
    <Layout>
      <Wrapper>
        <Detail time={time} number={2} />
        <Content>
          <LogWrapper>
            {DATA.map((item, idx) => (
              <LogItem
                key={idx}
                $result={item.result}
                $isLast={DATA.length - 1 === idx}
              >
                {item.time}
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
