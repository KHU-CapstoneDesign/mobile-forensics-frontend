import { ReactComponent as Picture } from '../assets/result.svg';
import styled from 'styled-components';

const Result = () => {
  return (
    <Wrapper>
      <StyledPicture />
    </Wrapper>
  );
};

export default Result;

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
