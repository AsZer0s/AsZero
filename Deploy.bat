@echo off
setlocal

set SERVER=root@192.168.3.100
set REMOTE_DIR=/www/blog
set LOCAL_DIR=public

echo Deleting contents of %REMOTE_DIR% on %SERVER%...
ssh %SERVER% "rm -rf %REMOTE_DIR/*"

echo Uploading files to %REMOTE_DIR%...
scp -r %LOCAL_DIR%/* %SERVER%:%REMOTE_DIR%

echo Deployment complete.
endlocal
