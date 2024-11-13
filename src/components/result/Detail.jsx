import styled from 'styled-components';

const Detail = ({ children }) => {
  return (
    <Wrapper>
      <Child>{children}</Child>
    </Wrapper>
  );
};

export default Detail;

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Child = styled.div`
  padding: 14px 28px;
  background-color: rgba(211, 47, 47, 0.13);
  border-radius: 8px;
  font-size: 20px;
  font-weight: 500;
`;
