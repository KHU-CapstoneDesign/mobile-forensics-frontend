import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import Detail from '../components/result/Detail';
import PictureCard from '../components/result/PictureCard';
import SampleImg from '../assets/images/sample.png';
import { useState, useEffect } from 'react';
import ImageModal from '../components/result/ImageModal';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Img1 from '../assets/images/1.jpg';
import Img2 from '../assets/images/2.jpg';
import Img3 from '../assets/images/3.jpg';
import Img4 from '../assets/images/4.jpg';
import Img5 from '../assets/images/5.jpg';
import Img6 from '../assets/images/6.jpg';

const DATA = [
  {
    id: 1,
    picture: Img1,
    title: '사진1',
    time: '12:43:30',
    result: false,
  },
  { id: 2, picture: Img2, title: '사진2', time: '13:05:30', result: true },
  { id: 3, picture: Img3, title: '사진3', time: '13:16:30', result: true },
  {
    id: 4,
    picture: Img4,
    title: '사진4',
    time: '13:17:30',
    result: false,
  },
  {
    id: 5,
    picture: Img5,
    title: '사진5',
    time: '13:18:30',
    result: false,
  },
  {
    id: 6,
    picture: Img6,
    title: '사진6',
    time: '13:23:30',
    result: false,
  },
];

const Picture = () => {
  const [time, setTime] = useState('');
  const [selectedImg, setSelectedImg] = useState({
    id: '',
    title: '',
    picture: null,
  });
  const [isOpen, setIsOpen] = useState(false); // 모달

  const handleClick = (id, title, picture, result) => {
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

  // 사진 데이터 요청
  const getData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/result/image`, // 요청 URL
        {
          // 요청 헤더
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // 쿠키 자동 전송
        },
      );

      if (res.status === 200) {
        console.log('response:', res.data); // 성공 응답 출력
      } else {
        return null; // 데이터가 없는 경우 처리
      }
    } catch (err) {
      console.error('Failed to get data:', err); // 에러 로그 출력
      return null; // 에러 발생 시 처리
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
                result={item.result}
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
