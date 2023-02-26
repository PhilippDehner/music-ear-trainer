@REM --- Backend ---
CALL ..\backend\build.cmd
Pushd "%~dp0"

mkdir .\packages
MOVE /Y ..\backend\music-ear-trainer.zip .\packages\WindowsStandalone.zip


@REM --- Frontend ---
mkdir .\temp
ROBOCOPY ..\web-app .\temp\ /S /XD "node_modules" ".git" ".vscode" "Icon"
Powershell.exe -executionpolicy remotesigned -command "Compress-Archive -Path .\temp* -DestinationPath ./packages/WebAppNpm.zip -Force"
rmdir /s/q .\temp