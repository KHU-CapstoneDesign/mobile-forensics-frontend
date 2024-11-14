import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Detail = ({ time, number, longtitude, latitude }) => {
  const location = useLocation();
  const [type, setType] = useState('');
  useEffect(() => {
    setType(
      location.pathname.includes('pictures')
        ? 'pictures'
        : location.pathname.includes('myboxCache')
          ? 'mybox'
          : location.pathname.includes('sodaCache')
            ? 'soda'
            : location.pathname.includes('cameraLog')
              ? 'cameraLog'
              : location.pathname.includes('gps')
                ? 'gps'
                : '',
    );
  }, [location]);
  return (
    <Wrapper>
      <Child>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          범행 시간대
          <div style={{ color: '#6c6c6c', fontSize: '16px' }}>({time})</div>
          {type === 'pictures' ? (
            '에 찍힌 사진이'
          ) : type === 'mybox' ? (
            '에 MYBOX 앱에 업로드한 사진이'
          ) : type === 'soda' ? (
            '에 SODA 앱으로 찍고 삭제한 사진이'
          ) : type === 'cameraLog' ? (
            '에 기록된 사진 촬영 로그가'
          ) : (
            <>
              에 범행 장소
              <div
                style={{
                  color: '#6c6c6c',
                  fontSize: '16px',
                  display: 'inline',
                }}
              >
                ({latitude}, {longtitude})
              </div>
              와 근접한 위치 기록이
            </>
          )}
          &nbsp;
          <div style={{ color: 'red', fontWeight: '900', fontSize: '23px' }}>
            {' '}
            {number}
          </div>
          개 발견되었습니다
        </div>
      </Child>
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
