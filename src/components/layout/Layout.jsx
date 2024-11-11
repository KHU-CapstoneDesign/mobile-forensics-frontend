import styled from 'styled-components';
import { ReactComponent as CameraIcon } from '../../assets/svgs/camera.svg';
import { ReactComponent as BackIcon } from '../../assets/svgs/back.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Layout = ({ children }) => {
  const [url, setUrl] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');

  useEffect(() => {
    setUrl(location.pathname);
    if (location.pathname.startsWith('/dataExtraction')) {
      setTitle('데이터 추출');
    } else if (location.pathname.startsWith('/input')) {
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
          <Title>{title}</Title>
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
  padding-top: 5px;
  color: #bdbdbd;
  font-size: 30px;
  font-weight: 600;
`;

const ChildrenWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const IconWrap = styled.div`
  position: absolute;
  cursor: pointer;
  left: 10px;
  top: 10px;
`;

const Title = styled.div`
  color: #d9d9d9;
  padding-top: 5px;
  font-size: 20px;
`;
