import styled from 'styled-components';
import Button from '../common/Button';
import { ReactComponent as CameraIcon } from '../../assets/svgs/camera.svg';

const Layout = ({ children }) => {
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
        <div style={{ width: '100%', height: '100%' }}>{children}</div>
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
