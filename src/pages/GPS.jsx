import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import { Map, MapMarker, Circle, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { useKakaoLoader } from 'react-kakao-maps-sdk';
import { useState, useEffect } from 'react';
import MarkerImg from '../assets/images/marker.png';
import WarningMarkerImg from '../assets/images/markerWarning.png';
import Detail from '../components/result/Detail';

const GPS = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    setTime(window.localStorage.getItem('time'));
  }, [window.localStorage.getItem('time')]);

  useEffect(() => {
    setLatitude(window.localStorage.getItem('latitude'));
    setLongitude(window.localStorage.getItem('longitude'));
  }, [window.localStorage.getItem('latitude')]);

  // useKakaoLoader();
  const [isHovered, setIsHovered] = useState(false);

  const DATA = [
    {
      title: '장소1',
      latlng: {
        lat: latitude,
        lng: longitude - 0.00009,
      },
    },
    {
      title: '장소2',
      latlng: {
        lat: window.localStorage.getItem('latitude') - 0.00009,
        lng: window.localStorage.getItem('longitude'),
      },
    },
    {
      title: '장소3',
      latlng: {
        lat: window.localStorage.getItem('latitude'),
        lng: window.localStorage.getItem('longitude') - 0.00005,
      },
    },
    {
      title: '장소4',
      latlng: {
        lat: window.localStorage.getItem('latitude') - 0.00009,
        lng: window.localStorage.getItem('longitude') - 0.00009,
      },
    },
  ];

  return (
    <Layout>
      <Wrapper id="wrapper">
        <div style={{ marginTop: '50px' }}>
          <Detail
            time={time}
            number={DATA.length}
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
          {DATA?.map((position, index) => {
            console.log(position.title, position.latlng);
            return (
              <MapMarker
                key={`${position.title}-${position.latlng}`}
                position={position?.latlng} // 마커를 표시할 위치
                image={{
                  src: WarningMarkerImg, // 마커이미지의 주소입니다
                  size: {
                    width: 40,
                    height: 40,
                  }, // 마커이미지의 크기입니다
                }}
                title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
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
