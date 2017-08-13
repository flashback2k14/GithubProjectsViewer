import { createWindowsInstaller } from "electron-winstaller";
import { path } from "path";

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error);
    process.exit(1);
  });

function getInstallerConfig () {
  console.log('creating windows installer');
  const rootPath = path.join('./');
  const outPath = path.join(rootPath, 'release/win');

  return Promise.resolve({
    appDirectory: path.join(outPath, 'ghp-win32-ia32/'),
    authors: 'flashback2k14',
    noMsi: true,
    outputDirectory: path.join(outPath, 'windows-installer'),
    exe: 'ghp.exe',
    setupExe: 'ghpInstaller.exe',
    setupIcon: path.join(rootPath, 'assets', 'win', 'icon.png.ico'),
    skipUpdateIcon: true,
    versionString: {
      FileDescription: 'View Github Projects built with Vue.js 2 - Desktop',
      ProductName: 'GithubProjectsViewer'
    }
  });
}
