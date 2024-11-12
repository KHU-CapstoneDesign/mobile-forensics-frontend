import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Guide from './pages/Guide';
import Main from './pages/Main';
import DataExtraction from './pages/DataExtraction';
import InputPage from './pages/Input';
import Result from './pages/Result';

const { ipcRenderer } = window;

const App = () => {
  const [version, setVersion] = useState('');
  const [files, setFiles] = useState([]);

  useEffect(() => {
    ipcRenderer.send('app_version');

    ipcRenderer.on('app_version', (event, args) => {
      setVersion(args.version);
    });

    ipcRenderer.on('files', (event, args) => {
      setFiles(args.files);
    });
  }, []);

  // const [output, setOutput] = useState('');

  // useEffect(() => {
  //     window.batchPreload.onBatchOutput((data) => {
  //         setOutput((prev) => prev + data + '\n');
  //     });
  // }, []);

  // const runBatch = () => {
  //     setOutput(''); // 이전 출력 내용 초기화
  //     window.batchPreload.executeBatch();
  // };

  return (
    <Root>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Guide />}></Route>
          <Route path="/main" element={<Main />}></Route>
          <Route path="/dataExtraction" element={<DataExtraction />}></Route>
          <Route path="/input" element={<InputPage />}></Route>
          <Route path="/result" element={<Result />}></Route>
        </Routes>
      </BrowserRouter>
    </Root>
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
