import styled from 'styled-components';

const PictureCard = ({ picture, title, time, onClick }) => {
  return (
    <Wrapper onClick={onClick}>
      <Image src={picture} alt={title} />
      <div style={{ width: '160px' }}>
        <Title>{title}</Title>
        <Time>{time}</Time>
      </div>
    </Wrapper>
  );
};

export default PictureCard;

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const Image = styled.img`
  width: 160px;
  height: 160px;
`;

const Title = styled.div`
  margin-top: 20px;
  font-size: 20px;
  font-weight: 700;
`;

const Time = styled.div`
  margin-top: 4px;
  color: #757575;
`;
