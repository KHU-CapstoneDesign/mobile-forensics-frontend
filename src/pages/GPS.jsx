import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import { Map, MapMarker, Circle, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { useKakaoLoader } from 'react-kakao-maps-sdk';
import { useState, useEffect } from 'react';
import MarkerImg from '../assets/images/marker.png';
import WarningMarkerImg from '../assets/images/markerWarning.png';
import Detail from '../components/result/Detail';
import LoadingIndicator from '../components/common/LoadingIndicator';
import axios from 'axios';

const GPS = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [locationData, setLocationData] = useState([]);

  useEffect(() => {
    setTime(window.sessionStorage.getItem('time'));
  }, [window.sessionStorage.getItem('time')]);

  useEffect(() => {
    setLatitude(window.sessionStorage.getItem('latitude'));
    setLongitude(window.sessionStorage.getItem('longitude'));
  }, [window.sessionStorage.getItem('latitude')]);

  // useKakaoLoader();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (locationData.length) {
      console.log(locationData);
    }
  }, [locationData]);

  // 위치 데이터 요청
  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/result/location`, // 요청 URL
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

        setLocationData(res.data);
        setLocationData(prev => [
          ...prev,
          { latitude: '37.239800', longtitude: '127.081198' },
        ]);
        setLoading(false);
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
    <Layout>
      {loading && <LoadingIndicator />}

      <Wrapper id="wrapper">
        <div style={{ marginTop: '50px' }}>
          <Detail
            time={time}
            number={locationData.length}
            latitude={latitude}
            longtitude={longitude}
          />
        </div>
        <Map // 지도를 표시할 Container
          id="map"
          center={{
            // 지도의 중심좌표
            lat: latitude,
            lng: longitude,
          }}
          style={{
            // 지도의 크기
            width: '70%',
            height: '70%',
          }}
          level={1} // 지도의 확대 레벨
        >
          <Circle
            center={{
              lat: latitude,
              lng: longitude,
            }}
            radius={50}
            strokeWeight={2} // 선의 두께입니다
            strokeColor={'#75B8FA'} // 선의 색깔입니다
            strokeOpacity={2} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle={'solid'} // 선의 스타일 입니다
            fillColor={'#CFE7FF'} // 채우기 색깔입니다
            fillOpacity={0.5} // 채우기 불투명도 입니다
          ></Circle>
          <MapMarker
            position={{
              // 지도의 중심좌표
              lat: latitude,
              lng: longitude,
            }}
            image={{
              src: MarkerImg,
              size: {
                width: 40,
                height: 40,
              },
            }}
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
            zIndex={9}
          ></MapMarker>
          {isHovered && (
            <CustomOverlayMap
              position={{
                // 지도의 중심좌표
                lat: latitude,
                lng: longitude,
              }}
              xAnchor={0.1}
              yAnchor={2.5}
            >
              <div
                style={{
                  color: 'red',
                  backgroundColor: 'rgba(255,0,0,0.2)',
                  borderRadius: '4px',
                  padding: '5px',
                  fontWeight: '600',
                }}
              >
                범행장소
              </div>
            </CustomOverlayMap>
          )}
          {locationData?.map((item, index) => {
            console.log(item);
            return (
              <MapMarker
                key={index}
                position={{ lat: '37.239850', lng: '127.081148' }} // 마커를 표시할 위치
                image={{
                  src: WarningMarkerImg, // 마커이미지의 주소입니다
                  size: {
                    width: 40,
                    height: 40,
                  }, // 마커이미지의 크기입니다
                }}
                title={index} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
              />
            );
          })}
        </Map>
      </Wrapper>
    </Layout>
  );
};
export default GPS;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  gap: 50px;
`;
