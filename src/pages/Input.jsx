import { ReactComponent as Picture } from '../assets/input.svg';
import styled from 'styled-components';
const Input = () => {
  return (
    <Wrapper>
      <StyledPicture />
    </Wrapper>
  );
};

export default Input;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledPicture = styled(Picture)`
  width: 100%;
  height: 100%;
`;
