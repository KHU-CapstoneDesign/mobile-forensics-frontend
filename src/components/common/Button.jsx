import styled from 'styled-components';

const Button = ({
  type,
  width,
  height,
  fontSize,
  children,
  onClick,
  ...props
}) => {
  return (
    <Wrapper
      onClick={onClick}
      type={type}
      width={width}
      height={height}
      fontSize={fontSize}
      {...props}
    >
      {children}
    </Wrapper>
  );
};

export default Button;

const Wrapper = styled.button`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.type === 2 ? '#ffffff' : '#2c2c2c')};
  color: ${props => (props.type === 2 ? '#2c2c2c' : '#f5f5f5')};
  border: 1px solid #2c2c2c;
  border-radius: 8px;
  width: ${props => props.width || 'auto'};
  min-height: ${props => props.height || 'auto'};
  font-size: ${props => props.fontSize || '16px'};
  cursor: pointer;
  &:hover {
    background-color: ${props => (props.type === 2 ? '#eaeaea' : '#444')};
  }
`;
