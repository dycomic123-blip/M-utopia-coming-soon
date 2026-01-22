@echo off
echo Starting development server on port 3002...
echo.

REM 检查node_modules是否存在
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
)

REM 启动开发服务器 (固定端口3002)
echo Starting Vite dev server on http://localhost:3002
start "" "http://localhost:3002"
call npm run dev
