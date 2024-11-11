import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import DaumPostCode from 'react-daum-postcode';
import Button from '../components/common/Button';
import { useState, useEffect, useRef } from 'react';
import DateTimePick from '../components/input/DateTimePicker';
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { FaSearch } from 'react-icons/fa';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2c2c2c',
    },
  },
});

const InputPage = () => {
  const [zodecode, setZonecode] = useState(null);
  const [address, setAddress] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // 주소 검색창
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const handleDateTimeChange = newValue => {
    setSelectedDateTime(newValue);
    console.log(newValue);
  };
  const postCodeRef = useRef(null);

  const completeHandler = data => {
    const { address, zonecode } = data;
    setZonecode(zonecode);
    setAddress(address);
  };

  const openHandler = () => {
    setIsOpen(true);
  };

  const handleClickOutside = event => {
    if (postCodeRef.current && !postCodeRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const closeHandler = state => {
    if (state === 'FORCE_CLOSE') {
      setIsOpen(false);
    } else if (state === 'COMPLETE_CLOSE') {
      setIsOpen(false);
    }
  };

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
              }}
            >
              <InputWrapper>
                <TextField
                  label="장소"
                  onClick={openHandler}
                  value={address ? `(${zodecode}) ${address}` : ''}
                  sx={{ backgroundColor: address ? '#eee' : '' }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <FaSearch />
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
                <DateTimePick onSetValue={handleDateTimeChange} />
              </InputWrapper>
              {isOpen && (
                <div ref={postCodeRef}>
                  <DaumPostCode
                    onComplete={completeHandler}
                    onClose={closeHandler}
                    style={PostCodeStyle}
                    theme={themeObj}
                  />
                </div>
              )}
              <Button width={'650px'} height={'50px'} fontSize={'20px'}>
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
  padding: 10px 20px;
  background-color: #eeeeee;
  border-radius: 8px;
  font-size: 25px;
  font-weight: 600;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 100px;
`;

const PostCodeStyle = {
  width: '100%',
  height: '450px',
  border: '1px solid #eee',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add drop shadow
};

const themeObj = {};
