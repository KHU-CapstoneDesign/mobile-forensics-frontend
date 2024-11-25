const { app, BrowserWindow, ipcMain, dialog, session } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const { autoUpdater } = require('electron-updater');
const ProgressBar = require('electron-progressbar');
const { exec } = require('child_process');
const axios = require('axios');

let mainWindow = null;
let progressBar = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 640,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      devTools: isDev,
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: true, // CORS 정책 비활성화
    },
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`,
  );

  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }

  // mainWindow.setResizable(false);
  mainWindow.setResizable(true);
  mainWindow.on('closed', () => (mainWindow = null));
  mainWindow.focus();
};

ipcMain.on('app_version', event => {
  event.reply('app_version', { version: app.getVersion() });
});

ipcMain.on('files', async event => {
  const result = await dialog
    .showOpenDialog(null, {
      filters: [
        {
          name: 'Images',
          extensions: ['jpg', 'png'],
        },
      ],
      properties: ['openFile', 'multiSelections'],
    })
    .then(result => {
      const { canceled, filePaths } = result;

      if (canceled) return [];
      return filePaths;
    })
    .catch(err => {
      console.log(err);
      return [];
    });

  event.reply('files', { files: result });
});

// 자동으로 업데이트가 되는 것 방지
autoUpdater.autoDownload = false;

autoUpdater.on('checking-for-update', () => {
  console.log('업데이트 확인 중');
});

autoUpdater.on('update-available', () => {
  console.log('업데이트 버전 확인');

  dialog
    .showMessageBox({
      type: 'info',
      title: 'Update',
      message:
        '새로운 버전이 확인되었습니다. 설치 파일을 다운로드 하시겠습니까?',
      buttons: ['지금 설치', '나중에 설치'],
    })
    .then(result => {
      const { response } = result;

      if (response === 0) autoUpdater.downloadUpdate();
    });
});

autoUpdater.on('update-not-available', () => {
  console.log('업데이트 불가');
});

autoUpdater.once('download-progress', () => {
  console.log('설치 중');

  progressBar = new ProgressBar({
    text: 'Download 합니다.',
  });

  progressBar
    .on('completed', () => {
      console.log('설치 완료');
    })
    .on('aborted', () => {
      console.log('aborted');
    });
});

autoUpdater.on('update-downloaded', () => {
  console.log('업데이트 완료');

  progressBar.setCompleted();

  dialog
    .showMessageBox({
      type: 'info',
      title: 'Update',
      message: '새로운 버전이 다운로드 되었습니다. 다시 시작하시겠습니까?',
      buttons: ['예', '아니오'],
    })
    .then(result => {
      const { response } = result;

      if (response === 0) autoUpdater.quitAndInstall(false, true);
    });
});

// electron이 초기화 끝났을 때
app.on('ready', () => {
  createWindow();
  autoUpdater.checkForUpdates();
});

// 모든 window가 종료되었을 때
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// app이 활성화 되었을 때
app.on('activate', () => {
  if (!mainWindow) {
    createWindow();
  }
});

// IPC 통신을 통해 배치 파일 실행
ipcMain.on('execute-batch', event => {
  console.log('배치파일실행');

  const batchPathMac = path.join(__dirname, 'batch');
  const batchPathWindows = path.join(__dirname, 'batch.bat');

  const isWindows = process.platform === 'win32';
  const command = isWindows
    ? `cmd /c "${batchPathWindows}"`
    : `sh ${batchPathMac}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${stderr}`);
      event.reply('batch-output', `Error: ${stderr}`);
      return;
    }
    event.reply('batch-output', stdout);
  });
});

ipcMain.on('get-cookie', async () => {
  session.defaultSession.cookies
    .get({})
    .then(cookies => {
      console.log('All Cookies:', cookies);
    })
    .catch(error => {
      console.error('Error retrieving all cookies:', error);
    });
});

ipcMain.on('set-cookie', async event => {
  console.log('=======triggered======');

  try {
    const response = await axios.post(
      'http://localhost:8080/api/result',
      {
        latitude: '37.237555 N',
        longitude: '127.0710272 E',
        dateTime: '2024-11-04T15:55:00.012Z',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // 쿠키 허용
      },
    );
    if (response.status === 200) {
      const getCookie = response?.headers['set-cookie'];
      // console.log('response:', response); // 성공 응답 출력
      const parsedCookie = await parseCookie(getCookie[0]);
      console.log(`===============userId: ${parseCookie}====================`); // 쿠키 출력

      await session.defaultSession.cookies
        .set({
          url: 'http://localhost:3000', // 쿠키 저장할 주소
          name: 'userId',
          value: parsedCookie,
          // path: '/api/result',
          httpOnly: false, // client에서 쿠키를 접근 제한
          expirationDate: Date.now() / 1000 + 3600, // 만료 시간
        })
        .then(() => {
          console.log('쿠키 저장 성공', parsedCookie);
        })
        .catch(error => {
          console.error('쿠키 저장 실패', error);
        });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
});

const parseCookie = cookies => {
  const cookie = cookies.split('; ');
  const targetCookie = cookie.find(cookie => cookie.startsWith(`userId=`));
  return targetCookie?.split('=')[1]; // 쿠키 값 추출
};
