import styled from 'styled-components';
import { ReactComponent as CloseIcon } from '../../assets/svgs/close.svg';

const ImageModal = ({ picture, title, onClose }) => {
  return (
    <Overlay>
      <Wrapper>
        <IconWrap onClick={onClose}>
          <CloseIcon width={30} height={30} fill={'#2c2c2c'} />
        </IconWrap>
        <Image src={picture} alt={title} />
      </Wrapper>
    </Overlay>
  );
};

export default ImageModal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
`;

const Wrapper = styled.div`
  position: relative;
`;

const IconWrap = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 60px;
  height: 60px;
  cursor: pointer;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 500px;
  height: 500px;
`;
