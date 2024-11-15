import styled from 'styled-components';
import Button from '../common/Button';

const AppCard = ({ picture, title, desc, onClick }) => {
  return (
    <Wrapper>
      <Image src={picture} alt={title} />
      <Title>{title}</Title>
      <Time>{desc}</Time>
      <Button onClick={onClick} width={'100px'} height={'40px'}>
        자세히 보기
      </Button>
    </Wrapper>
  );
};

export default AppCard;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 15px;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  &:hover {
    background-color: #f5f5f5;
  }
  width: 300px;
`;

const Image = styled.img`
  width: 160px;
  height: 160px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

const Time = styled.div`
  margin-top: -5px;
  color: #757575;
`;
