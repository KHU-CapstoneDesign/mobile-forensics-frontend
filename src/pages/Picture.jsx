import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import Detail from '../components/result/Detail';
import PictureCard from '../components/result/PictureCard';
import SampleImg from '../assets/images/sample.png';
import { useState, useEffect } from 'react';
import ImageModal from '../components/result/ImageModal';
import { useLocation } from 'react-router-dom';

const DATA = [
  { id: 1, picture: SampleImg, title: '사진1', time: '15:13:30' },
  { id: 2, picture: SampleImg, title: '사진2', time: '15:13:30' },
  { id: 3, picture: SampleImg, title: '사진3', time: '15:13:30' },
  { id: 4, picture: SampleImg, title: '사진4', time: '15:13:30' },
  { id: 5, picture: SampleImg, title: '사진5', time: '15:13:30' },
  { id: 6, picture: SampleImg, title: '사진6', time: '15:13:30' },
  { id: 7, picture: SampleImg, title: '사진7', time: '15:13:30' },
];

const Picture = () => {
  const [time, setTime] = useState('');
  const [selectedImg, setSelectedImg] = useState({
    id: '',
    title: '',
    picture: null,
  });
  const [isOpen, setIsOpen] = useState(false); // 모달

  const handleClick = (id, title, picture) => {
    setSelectedImg({ id: id, title: title, picture: picture });
    openModal();
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setTime(window.localStorage.getItem('time'));
  }, [window.localStorage.getItem('time')]);

  return (
    <>
      {isOpen && (
        <ImageModal
          picture={selectedImg.picture}
          title={selectedImg.title}
          onClose={closeModal}
        />
      )}
      <Layout>
        <Wrapper>
          <Detail time={time} number={1}></Detail>
          <CardSection>
            {DATA.map(item => (
              <PictureCard
                key={item.id}
                picture={item.picture}
                title={item.title}
                time={item.time}
                onClick={() => handleClick(item.id, item.title, item.picture)}
              />
            ))}
          </CardSection>
        </Wrapper>
      </Layout>
    </>
  );
};

export default Picture;

const Wrapper = styled.div`
  /* width: 100%;
  height: 100%; */
  display: flex;
  flex-direction: column;
  padding: 50px 0px;
`;

const CardSection = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(4, 220px);
  /* grid-template-rows: repeat(3, 1fr); */
  gap: 40px;
  justify-content: center;
`;
