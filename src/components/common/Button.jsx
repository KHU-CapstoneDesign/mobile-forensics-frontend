import styled from 'styled-components';

const Button = ({ width, height, text }) => {
  return <Wrapper>{text}</Wrapper>;
};

export default Button;

const Wrapper = styled.div`
  background-color: #2c2c2c;
  font-size: '24px';
  width: ${props => props.width || 'auto'};
  height: ${props => props.height || 'auto'};
`;
