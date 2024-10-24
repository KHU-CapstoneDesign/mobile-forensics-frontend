import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import Input from './pages/Input';
import Result from './pages/Result';

const { ipcRenderer } = window;

const style = {
  margin: 10,
  padding: 10,
  border: '1px solid',
  borderRadius: 8,
};

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
    <div>
      {/* <div style={style}>
        <p>This is first electron desktop app.</p>
        <p>This application version is {version}</p>
      </div>
      <div style={style}>
        <button
          onClick={() => {
            ipcRenderer.send("files");
          }}
        >
          파일 명 가져오기
        </button>
        {files.map(file => (
          <p key={file}>{file}</p>
        ))}
      </div> */}
      <div>
        {/* <Button
          onClick={() => {
            ipcRenderer.send("execute-batch");
          }}
        >
          배치 파일 실행
        </Button> */}
        {/* <Input/> */}
        <Result />

        {/* <button onClick={runBatch}>Run Batch File</button>
          <pre>{output}</pre> */}
      </div>
    </div>
  );
};

export default App;

const Button = styled.button``;
