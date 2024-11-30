import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Guide from './pages/Guide';
import Main from './pages/Main';
import DataExtraction from './pages/DataExtraction';
import InputPage from './pages/Input';
import Result from './pages/Result';
import Picture from './pages/Picture';
import CameraLog from './pages/CameraLog';
import GPS from './pages/GPS';
import Usage from './pages/Usage';
import UsageDetail from './pages/UsageDetail';
import { DataProvider } from './contexts/DataContext';
import axios from 'axios';

const { ipcRenderer } = window;

const App = () => {
  const [version, setVersion] = useState('');
  const [files, setFiles] = useState([]);

  // 앱 버전 확인
  useEffect(() => {
    ipcRenderer.send('app_version');

    ipcRenderer.on('app_version', (event, args) => {
      setVersion(args.version);
    });

    // ipcRenderer.on('files', (event, args) => {
    //   setFiles(args.files);
    // });
  }, []);

  // 창 닫힘 시 데이터 삭제
  useEffect(() => {
    ipcRenderer.on('window-closing', event => {
      deleteData();
    });
  });

  // 이전 기록 삭제
  const deleteData = async () => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/exit`,
        {
          // 요청 본문 데이터
          data: {}, // 필요 시 삭제 요청에 데이터를 포함
          // 요청 옵션
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // 쿠키 자동 전송
        },
      );

      if (res.status === 203) {
        console.log('response:', res.data); // 성공 응답 출력
        console.log('삭제 성공');
      } else {
        console.warn('Unexpected status code:', res.status);
      }
    } catch (err) {
      console.error('Failed to delete data:', err); // 에러 로그 출력
    }
  };

  return (
    <DataProvider>
      <Root>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Guide />}></Route>
            <Route path="/main" element={<Main />}></Route>
            <Route path="/dataExtraction" element={<DataExtraction />}></Route>
            <Route path="/input" element={<InputPage />}></Route>
            <Route path="/result" element={<Result />}></Route>
            <Route path="/result/pictures" element={<Picture />}></Route>
            <Route path="/result/myboxCache" element={<Picture />}></Route>
            <Route path="/result/sodaCache" element={<Picture />}></Route>
            <Route path="/result/cameraLog" element={<CameraLog />}></Route>
            <Route path="/result/gps" element={<GPS />}></Route>
            {/* <Route path="/result/cloudUsage" element={<Usage />}></Route> */}
            <Route path="/result/usage/:appType" element={<Usage />}></Route>
            <Route
              path="/result/usage/:appType/:app"
              element={<UsageDetail />}
            ></Route>
          </Routes>
        </BrowserRouter>
      </Root>
    </DataProvider>
    // <div>
    //   {/* <div style={style}>
    //     <p>This is first electron desktop app.</p>
    //     <p>This application version is {version}</p>
    //   </div>
    //   <div style={style}>
    //     <button
    //       onClick={() => {
    //         ipcRenderer.send("files");
    //       }}
    //     >
    //       파일 명 가져오기
    //     </button>
    //     {files.map(file => (
    //       <p key={file}>{file}</p>
    //     ))}
    //   </div> */}
    //   <div>
    //     {/* <Button
    //       onClick={() => {
    //         ipcRenderer.send("execute-batch");
    //       }}
    //     >
    //       배치 파일 실행
    //     </Button> */}
    //     {/* <Input/> */}

    //     {/* <button onClick={runBatch}>Run Batch File</button>
    //       <pre>{output}</pre> */}
    //   </div>
    // </div>
  );
};

export default App;

const Root = styled.div`
  font-family: Pretendard-Regular;
`;
