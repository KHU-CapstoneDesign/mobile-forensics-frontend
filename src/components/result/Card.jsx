import styled from 'styled-components';
import { ReactComponent as WarningIcon } from '../../assets/svgs/warning.svg';
import Button from '../common/Button';

const Card = () => {
  return (
    <Wrapper>
      <WarningIcon />
      <Content>
        <Title>사진 발견</Title>
        <Desc>범행과 관련된 사진이 존재합니다.</Desc>
        <Button width={'103px'} height={'40px'} fontSize={'16px'}>
          자세히 보기
        </Button>
      </Content>
    </Wrapper>
  );
};

export default Card;

const Wrapper = styled.div`
  width: 390px;
  height: 113px;
  padding: 24px;
  display: flex;
  flex-direction: row;
  gap: 24px;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  &:hover {
    background-color: #eeeeee;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 900;
`;

const Desc = styled.div`
  font-weight: 16px;
  color: #757575;
`;
