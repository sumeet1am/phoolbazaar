@echo off
echo ========================================================
echo 🌸 Starting PhoolBazaar Backend (FastAPI + Excel DB)...
echo ========================================================
cd /d "%~dp0backend"
.\env\Scripts\Activate.ps1
echo Installing python dependencies...
pip install -r requirements.txt
echo Launching Uvicorn server at http://localhost:8000
python -m uvicorn app.main:app --reload --port 8000
pause
