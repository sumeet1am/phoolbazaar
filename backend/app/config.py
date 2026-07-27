import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
EXCEL_DIR = BASE_DIR / "excel_data"
EXCEL_DIR.mkdir(exist_ok=True)

DATABASE_URL = os.getenv("DATABASE_URL", "").strip()

# If DATABASE_URL is empty, automatically fallback to Excel files storage
USE_EXCEL = len(DATABASE_URL) == 0

SECRET_KEY = os.getenv("SECRET_KEY", "phoolbazaar_super_secret_key_2026")
ALGORITHM = "HS256"
