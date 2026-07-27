@echo off
echo ========================================================
echo 🌸 Starting PhoolBazaar Frontend (React + Vite)...
echo ========================================================
cd /d "%~dp0frontend"
echo Installing npm packages if needed...
call npm install
echo Launching dev server at http://localhost:3000
call npm run dev
pause
