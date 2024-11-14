import styled from 'styled-components';

const LogItem = ({ $result, $isLast, children }) => {
  return (
    <Wrapper $result={$result} $isLast={$isLast}>
      <Icon>
        <Circle />
        {`${children} 촬영`}
      </Icon>
      {$isLast ? '' : <Bar />}
    </Wrapper>
  );
};

export default LogItem;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: ${props => (props.$result ? 'red' : '#747474')};
  font-size: 20px;
`;

const Icon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

const Circle = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #bdbdbd;
`;

const Bar = styled.div`
  width: 2px;
  height: 35px;
  background-color: #bdbdbd;
  margin: 5px 6px;
`;