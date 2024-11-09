import styled from 'styled-components';
import Button from '../common/Button';
import { ReactComponent as CameraIcon } from '../../assets/svgs/camera.svg';

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <Navbar>
        <CameraIcon />
        <div style={{ paddingTop: '5px' }}>Forensics</div>
      </Navbar>
      {children}
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
  padding: 20px 30px;
`;
