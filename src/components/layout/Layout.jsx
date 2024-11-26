import styled from 'styled-components';
import { ReactComponent as CameraIcon } from '../../assets/svgs/camera.svg';
import { ReactComponent as BackIcon } from '../../assets/svgs/back.svg';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Layout = ({ children }) => {
  const params = useParams();

  const [url, setUrl] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState(''); // 페이지 제목
  const [date, setDate] = useState(''); // 포렌식할 날짜
  const [type, setType] = useState(''); // 상세 페이지 타입
  const [app, setApp] = useState(''); // 앱 이름 (앱 사용 기록 페이지)

  useEffect(() => {
    setUrl(location.pathname);
    if (location.pathname.startsWith('/dataExtraction')) {
      setTitle('데이터 추출');
    } else if (
      location.pathname.startsWith('/input') ||
      location.pathname.startsWith('/result')
    ) {
      if (location.pathname.startsWith('/result/pictures')) {
        setType('사진');
      } else if (location.pathname.startsWith('/result/cameraLog')) {
        setType('사진 촬영 로그');
      } else if (location.pathname.startsWith('/result/myboxCache')) {
        setType('MYBOX 앱 캐시 파일');
      } else if (location.pathname.startsWith('/result/sodaCache')) {
        setType('SODA 앱 캐시 파일');
      } else if (location.pathname.startsWith('/result/gps')) {
        setType('GPS');
      } else if (location.pathname.startsWith('/result/usage/cloud')) {
        if (location.pathname.startsWith('/result/usage/cloud/')) {
          setApp(params.app);
        }
        setType('클라우드 앱 사용 기록');
      } else if (location.pathname.startsWith('/result/usage/camera')) {
        if (location.pathname.startsWith('/result/usage/camera/')) {
          setApp(params.app);
        }
        setType('카메라 앱 사용 기록');
      }
      setDate(window.sessionStorage.getItem('date'));
      setTitle('포렌식 결과');
    }
  }, [location]);

  return (
    <Wrapper>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
        }}
      >
        <Navbar>
          <TouchArea onClick={() => navigate('/main')}>
            <div
              style={{
                marginLeft: '30px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CameraIcon />
            </div>
            <Logo>Forensics</Logo>
          </TouchArea>
          <TextSection>
            <Title>{title}</Title>
            {type ? (
              <>
                <Date>({date})</Date>
                <Split />
                <Title>{type}</Title>
                {app ? (
                  <>
                    {' '}
                    <Split />
                    <Title>{app}</Title>
                  </>
                ) : (
                  ''
                )}
              </>
            ) : (
              ''
            )}
          </TextSection>
        </Navbar>
        <ChildrenWrapper id="children-wrapper">
          {url.startsWith('/main') ? (
            ''
          ) : (
            <IconWrap onClick={() => navigate(-1)}>
              <BackIcon width={40} height={40} stroke={'#9c9c9c'} />
            </IconWrap>
          )}
          {children}
        </ChildrenWrapper>
      </div>
    </Wrapper>
  );
};

export default Layout;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

const Navbar = styled.div`
  /* display: fixed; */
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 40px;
  background-color: #2c2c2c;
  padding: 20px 0px;
`;

const TouchArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 13px;
  cursor: pointer;
`;

const Logo = styled.div`
  /* padding-top: 5px; */
  color: #bdbdbd;
  font-size: 30px;
  font-weight: 600;
`;

const ChildrenWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
`;

const IconWrap = styled.div`
  position: absolute;
  cursor: pointer;
  left: 10px;
  top: 10px;
`;

const TextSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const Title = styled.div`
  color: #d9d9d9;
  font-size: 20px;
`;

const Date = styled.div`
  color: #d9d9d9;
  font-size: 16px;
  margin-left: 7px;
`;

const Split = styled.div`
  width: 1px;
  height: 20px;
  background-color: #757575;
  margin: 0px 15px;
`;
