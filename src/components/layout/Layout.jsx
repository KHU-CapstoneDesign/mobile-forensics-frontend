import styled from 'styled-components';
import Button from '../common/Button';
import { ReactComponent as CameraIcon } from '../../assets/svgs/camera.svg';
import { ReactComponent as BackIcon } from '../../assets/svgs/back.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Layout = ({ children }) => {
  const [url, setUrl] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    setUrl(location.pathname);
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
          <div style={{ paddingTop: '5px' }}> Forensics</div>
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
  gap: 13px;
  background-color: #2c2c2c;
  color: #bdbdbd;
  font-size: 30px;
  font-weight: 600;
  padding: 20px 0px;
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
