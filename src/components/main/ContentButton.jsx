import styled from 'styled-components';
import Button from '../common/Button';

const ContentButton = ({ number, title, icon, desc, buttonText }) => {
  return (
    <Wrapper>
      <Number>{number}</Number>
      <Title>{title}</Title>
      {icon}
      <Desc>{desc}</Desc>
      <Button width={'322px'} height={'40px'}>
        {buttonText}
      </Button>
    </Wrapper>
  );
};

export default ContentButton;

const Wrapper = styled.div`
  width: 322px;
  height: 446px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 35px;
  color: #2c2c2c;
  cursor: pointer;
  &:hover {
    background-color: #eeeeee;
  }
`;

const Number = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #757575;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  color: white;
  font-size: 25px;
  font-weight: 700;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
`;

const Desc = styled.div`
  color: #757575;
  font-size: 16px;
`;
