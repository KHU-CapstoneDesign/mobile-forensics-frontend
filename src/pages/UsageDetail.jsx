import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Detail from '../components/result/Detail';
import BarChart from '../components/result/BarChart';
import DoughnutChart from '../components/result/DoughnutChart';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2c2c2c',
    },
  },
});

const selectFieldStyles = {
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderWidth: '1px',
  },
  backgroundColor: 'white',
};

const UsageDetail = () => {
  const params = useParams();
  const app = params.app;
  const selectRef = useRef();
  const [time, setTime] = useState('');
  const [chart, setChart] = useState(1);

  useEffect(() => {
    setTime(window.localStorage.getItem('time'));
  }, [window.localStorage.getItem('time')]);

  // 범행 시간대 데이터(60분)
  const doughnutData = Array.from({ length: 60 }, (_, index) => ({
    time: `${index}`,
    usage: Math.round(Math.random()),
    color: Math.random() > 0.5 ? 'rgb(211, 47, 47)' : 'rgb(251, 229, 207)',
  }));

  // 범행 일자 하루치 데이터(24시간)
  const barData = Array.from({ length: 24 }, (_, index) => ({
    time: index.toString(),
    usage: Math.floor(Math.random() * 61).toString(),
  }));

  const handleChange = () => {
    const elements = document.getElementsByClassName('MuiInputBase-root');
    Array.from(elements).forEach(element => {
      element.classList.remove('Mui-focused');
    });
    if (chart === 1) {
      setChart(2);
    } else {
      setChart(1);
    }
  };

  return (
    <Layout>
      <Wrapper>
        <Wrap>
          <Detail time={time} number={3} />
          <ChartSection>
            <ThemeProvider theme={theme}>
              <FormControl
                id="here"
                ref={selectRef}
                size="small"
                sx={{ width: '130px' }}
              >
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={chart}
                  onChange={handleChange}
                  sx={selectFieldStyles}
                >
                  <MenuItem value={1}>범행 시간대</MenuItem>
                  <MenuItem value={2}>하루 전체</MenuItem>
                </Select>
              </FormControl>
            </ThemeProvider>
            {chart === 1 ? (
              <DoughnutChart data={doughnutData} width={800} height={500} />
            ) : (
              <BarChart ChartData={barData} width={800} height={500} />
            )}
          </ChartSection>
        </Wrap>
      </Wrapper>
    </Layout>
  );
};

export default UsageDetail;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  gap: 30px;
  align-items: center;
`;

const ChartSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #f5f5f5;
  padding: 30px 50px;
  border-radius: 8px;
`;
