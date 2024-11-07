import styled from 'styled-components';
import GuideLayout from '../../components/layout/GuideLayout';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Guide1 = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // API에서 데이터 가져오기
    axios
      .get('http://localhost:8080/api/test')
      .then(response => {
        setData(response.data); // 성공적으로 데이터 가져오기
      })
      .catch(error => {
        setError(error.message); // 에러 처리
      });
  }, []);

  return <GuideLayout>{`get api result: ${data}`}</GuideLayout>;
};
export default Guide1;
