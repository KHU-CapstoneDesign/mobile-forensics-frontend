import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import { useState, useEffect } from 'react';
import AppCard from '../components/result/AppCard';
import MyboxImg from '../assets/images/mybox.png';
import DriveImg from '../assets/images/drive.png';
import SnowImage from '../assets/images/snow.png';
import SodaImage from '../assets/images/soda.png';
import { useNavigate, useParams } from 'react-router-dom';

const Usage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [time, setTime] = useState('');

  useEffect(() => {
    setTime(window.localStorage.getItem('time'));
  }, [window.localStorage.getItem('time')]);

  return (
    <Layout>
      <Wrapper>
        <Grid>
          {params.appType === 'cloud' ? (
            <>
              {' '}
              <AppCard
                picture={MyboxImg}
                title={'네이버 MYBOX'}
                desc={'네이버 MYBOX 앱 실행 기록이 있습니다.'}
                onClick={() => {
                  navigate('/result/usage/cloud/MYBOX');
                }}
              />
              <AppCard
                picture={DriveImg}
                title={'구글 DRIVE'}
                desc={'구글 DRIVE 앱 실행 기록이 있습니다.'}
                onClick={() => {
                  navigate('/result/usage/cloud/DRIVE');
                }}
              />
            </>
          ) : (
            <>
              {' '}
              <AppCard
                picture={SnowImage}
                title={'SNOW'}
                desc={'SNOW 앱 실행 기록이 있습니다.'}
                onClick={() => {
                  navigate('/result/usage/camera/SNOW');
                }}
              />
              <AppCard
                picture={SodaImage}
                title={'SODA'}
                desc={'SODA 앱 실행 기록이 있습니다.'}
                onClick={() => {
                  navigate('/result/usage/camera/SODA');
                }}
              />
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
