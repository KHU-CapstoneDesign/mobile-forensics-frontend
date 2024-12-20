import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import DaumPostCode from 'react-daum-postcode';
import Button from '../components/common/Button';
import { useState, useEffect, useRef, useContext } from 'react';
import DateTimePick from '../components/input/DateTimePicker';
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { FaSearch } from 'react-icons/fa';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import dayjs from 'dayjs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../contexts/DataContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2c2c2c',
    },
  },
});

const InputPage = () => {
  const navigate = useNavigate();
  const { setData } = useContext(DataContext);

  const [zonecode, setZonecode] = useState(null); // 우편번호
  const [address, setAddress] = useState(null); // 주소
  const postCodeRef = useRef(null); // 주소검색창 ref
  //   const [location, setLocation] = useState({ logitude: '', latitude: '' }); // 주소 좌표
  const [isOpen, setIsOpen] = useState(false); // 주소 검색창
  const [selectedDateTime, setSelectedDateTime] = useState(null); // 날짜 및 시간
  const [errorAddress, setErrorAddress] = useState(false); // 주소 validation 체크
  const [errorDateTime, setErrorDateTime] = useState(false); // 날짜 및 시간 validation 체크
  const [isSubmit, setIsSubmit] = useState(false); // 결과 보기 버튼 클릭 여부
  // post 요청보낼 데이터
  const [formattedData, setFormattedData] = useState({
    latitude: '',
    longitude: '',
    dateTime: '',
  });

  // 날짜 및 시간 값
  const handleDateTimeChange = newValue => {
    setSelectedDateTime(newValue);
  };

  // 주소 창 열기
  const openHandler = () => {
    setIsOpen(true);
  };

  // 주소 선택 완료
  const completeHandler = data => {
    const { address, zonecode } = data;
    setZonecode(zonecode);
    setAddress(address);
  };

  // 주소 창 외부 클릭 시 닫힘
  const handleClickOutside = event => {
    if (postCodeRef.current && !postCodeRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // 주소 창 외부 클릭 시 닫힘
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // 주소 검색 창 닫기
  const closeHandler = state => {
    if (state === 'FORCE_CLOSE') {
      setIsOpen(false);
    } else if (state === 'COMPLETE_CLOSE') {
      setIsOpen(false);
    }
  };

  // 주소 error 관리
  useEffect(() => {
    if (isSubmit && address) {
      setErrorAddress(false);
    }
  }, [address]);

  // 날짜 error 관리
  useEffect(() => {
    if (isSubmit && selectedDateTime) {
      setErrorDateTime(false);
    }
  }, [selectedDateTime]);

  // 주소 -> 좌표 변환 api 호출
  const getLocation = async () => {
    const REST_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
    const url = `https://dapi.kakao.com/v2/local/search/address.json`;

    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `KakaoAK ${REST_API_KEY}`,
        },
        params: {
          query: address,
        },
      });

      if (res.status === 200) {
        const { x: longitude, y: latitude } = res.data.documents[0];
        console.log('kakao res:', longitude, latitude);
        return { longitude, latitude };
      } else {
        console.log('No results found.');
        return null; // 데이터가 없는 경우 처리
      }
    } catch (err) {
      console.error('Failed to get location:', err);
      return null; // 에러 발생 시 처리
    }
  };

  const postData = async () => {
    const data = {
      latitude: `${formattedData?.latitude}`,
      longitude: `${formattedData?.longitude}`,
      dateTime: `${formattedData?.dateTime}`,
    };

    console.log('post data', data);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/result`, // 요청 URL
        data,
        {
          // 요청 헤더
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // 쿠키 허용
        },
      );

      if (res.status === 200) {
        console.log('response:', res.data); // 성공 응답 출력
        setData(res.data);
        navigate('/result');
      } else {
        return null; // 데이터가 없는 경우 처리
      }
    } catch (err) {
      console.error('Failed to post data:', err); // 에러 로그 출력
      return null; // 에러 발생 시 처리
    }
  };

  // formattedData 변경 시 postData 호출
  useEffect(() => {
    if (
      isSubmit &&
      formattedData.latitude &&
      formattedData.longitude &&
      formattedData.dateTime
    ) {
      postData();
    }
  }, [formattedData, isSubmit]);

  // 결과 보기 버튼 클릭
  const handleSubmit = async () => {
    setIsSubmit(true);

    // validation 체크
    if (!address) {
      setErrorAddress(true);
    }
    if (!selectedDateTime) {
      setErrorDateTime(true);
    }
    if (address && selectedDateTime) {
      // 날짜 형식 포맷팅
      const formattedDateTime = dayjs(selectedDateTime).format(
        'YYYY-MM-DD HH:mm:ss',
      );

      // 날짜 분리
      const formattedDate = formattedDateTime.split(' ')[0];
      // 시간 분리
      const formattedTime = formattedDateTime.split(' ')[1];

      // 장소의 좌표 얻기
      const data = await getLocation();
      const longitude = parseFloat(data.longitude);
      const latitude = parseFloat(data.latitude);
      const formattedLongitude = longitude.toFixed(6);
      const formattedLatitude = latitude.toFixed(6);

      setFormattedData({
        latitude: `${formattedLatitude} N`,
        longitude: `${formattedLongitude} E`,
        dateTime: `${formattedDate}T${formattedTime}.000Z`,
      });

      // 로컬 스토리지에 input값들 저장
      window.sessionStorage.setItem('date', formattedDate);
      window.sessionStorage.setItem('time', formattedTime);
      window.sessionStorage.setItem('longitude', formattedLongitude);
      window.sessionStorage.setItem('latitude', formattedLatitude);
    }
  };

  return (
    <Layout>
      <Wrapper>
        <Wrap>
          <ThemeProvider theme={theme}>
            <Title>범행 장소와 날짜, 시간을 입력해주세요</Title>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <InputWrapper>
                  <TextField
                    label="장소"
                    onClick={openHandler}
                    value={address ? `(${zonecode}) ${address}` : ''}
                    error={errorAddress}
                    helperText={errorAddress ? '장소를 입력해주세요' : ''}
                    sx={{
                      width: '300px',
                      backgroundColor: address ? '#eee' : '',
                      position: 'relative',
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <FaSearch />
                        </InputAdornment>
                      ),
                    }}
                  ></TextField>
                  <DateTimePick
                    onSetValue={handleDateTimeChange}
                    errorDateTime={errorDateTime}
                  />
                </InputWrapper>

                {isOpen && (
                  <div style={{ width: '100%' }} ref={postCodeRef}>
                    <DaumPostCode
                      onComplete={completeHandler}
                      onClose={closeHandler}
                      style={PostCodeStyle}
                      theme={themeObj}
                    />
                  </div>
                )}
              </div>
              <Button
                onClick={handleSubmit}
                width={'80%'}
                height={'50px'}
                fontSize={'20px'}
              >
                결과 보기
              </Button>
            </div>
          </ThemeProvider>
        </Wrap>
      </Wrapper>
    </Layout>
  );
};

export default InputPage;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #2c2c2c;
`;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  margin: 60px;
`;

const Title = styled.div`
  padding: 15px 20px;
  background-color: #eeeeee;
  border-radius: 8px;
  font-size: 25px;
  font-weight: 500;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 100px;
`;

const PostCodeStyle = {
  width: '90%',
  height: '450px',
  border: '1px solid #eee',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add drop shadow
};

const themeObj = {};
