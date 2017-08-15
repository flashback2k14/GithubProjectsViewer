const electronInstaller = require("electron-winstaller");
const { createWindowsInstaller } = electronInstaller;
const path = require("path");

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error);
    process.exit(1);
  });

function getInstallerConfig () {
  console.log('creating windows installer');
  const rootPath = path.join('../');
  const outPath = path.join(rootPath, 'desktop-release/release/win');

  return Promise.resolve({
    appDirectory: path.join(outPath, 'app-win32-x64/'),
    authors: 'flashback2k14',
    noMsi: true,
    outputDirectory: path.join(outPath, 'installer'),
    exe: 'app.exe',
    setupExe: 'ghpInstaller.exe',
    setupIcon: path.join(rootPath, 'assets', 'icons', 'win', 'icon.png.ico'),
    skipUpdateIcon: true,
    versionString: {
      FileDescription: 'View Github Projects built with Vue.js 2 - Desktop',
      ProductName: 'GithubProjectsViewer'
    }
  });
}
