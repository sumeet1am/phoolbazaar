import os
import pandas as pd
from pathlib import Path
from app.config import EXCEL_DIR

USERS_FILE = EXCEL_DIR / "users.xlsx"
PRODUCTS_FILE = EXCEL_DIR / "products.xlsx"
CATEGORIES_FILE = EXCEL_DIR / "categories.xlsx"
ORDERS_FILE = EXCEL_DIR / "orders.xlsx"
TIMESLOTS_FILE = EXCEL_DIR / "timeslots.xlsx"
SETTINGS_FILE = EXCEL_DIR / "settings.xlsx"

def init_excel_files():
    """Initializes Excel files with seed data if they do not exist."""
    
    # Products file
    if not PRODUCTS_FILE.exists():
        sample_products = [
            {
                "id": "p1",
                "name": "Fresh Desi Jasmine Flowers (Mogra)",
                "category": "Loose Flowers",
                "price": 349,
                "mrp": 499,
                "discount": 30,
                "unit": "500 grams",
                "badge": "Morning Plucked",
                "inStock": True,
                "isBestSeller": True,
                "images": "https://images.unsplash.com/photo-1596073413225-300dd1d416c2?auto=format&fit=crop&w=800&q=80",
                "description": "Freshly plucked sweet fragrance white Mogra flowers."
            },
            {
                "id": "p2",
                "name": "Royal Rose & Marigold Wedding Garland",
                "category": "Garlands",
                "price": 1899,
                "mrp": 2499,
                "discount": 24,
                "unit": "Set of 2 Garlands",
                "badge": "Luxury Handcrafted",
                "inStock": True,
                "isBestSeller": True,
                "images": "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80",
                "description": "Handcrafted luxury bridal garlands made with fresh red roses."
            },
            {
                "id": "p3",
                "name": "Daily Temple Pooja Basket & Durva Pack",
                "category": "Pooja Items",
                "price": 199,
                "mrp": 299,
                "discount": 33,
                "unit": "1 Daily Pack",
                "badge": "Express 30-Min",
                "inStock": True,
                "isBestSeller": True,
                "images": "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=80",
                "description": "Includes 5 types of sacred flowers."
            }
        ]
        pd.DataFrame(sample_products).to_excel(PRODUCTS_FILE, index=False)

    # Users file
    if not USERS_FILE.exists():
        sample_users = [
            {"id": "usr_admin", "name": "Admin Manager", "email": "admin@phoolbazaar.com", "role": "admin", "mobile": "+91 98765 43210"},
            {"id": "usr_c1", "name": "Ananya Sharma", "email": "ananya@example.com", "role": "customer", "mobile": "+91 98123 45678"}
        ]
        pd.DataFrame(sample_users).to_excel(USERS_FILE, index=False)

    # Categories file
    if not CATEGORIES_FILE.exists():
        sample_categories = [
            {"id": "c1", "name": "Loose Flowers", "icon": "🌸", "count": 42},
            {"id": "c2", "name": "Garlands", "icon": "🌺", "count": 35},
            {"id": "c3", "name": "Pooja Items", "icon": "🪔", "count": 58},
            {"id": "c4", "name": "Fresh Fruits", "icon": "🍎", "count": 24},
            {"id": "c5", "name": "Decorations", "icon": "💐", "count": 19},
            {"id": "c6", "name": "Rentals", "icon": "🎪", "count": 14}
        ]
        pd.DataFrame(sample_categories).to_excel(CATEGORIES_FILE, index=False)

    # Orders file
    if not ORDERS_FILE.exists():
        sample_orders = [
            {"id": "PB-8942", "customer": "Ananya Sharma", "total": 1899, "status": "Delivered", "date": "2026-07-26", "slot": "Early Morning (5:30 AM - 7:30 AM)"}
        ]
        pd.DataFrame(sample_orders).to_excel(ORDERS_FILE, index=False)

    # Time slots file
    if not TIMESLOTS_FILE.exists():
        sample_slots = [
            {"id": "ts1", "label": "Early Morning (5:30 AM - 7:30 AM)", "type": "Pooja Special", "active": True},
            {"id": "ts2", "label": "Morning Slot (8:00 AM - 11:00 AM)", "type": "Standard", "active": True},
            {"id": "ts3", "label": "Afternoon Slot (12:00 PM - 3:00 PM)", "type": "Standard", "active": True},
            {"id": "ts4", "label": "Evening Slot (5:00 PM - 8:00 PM)", "type": "Festival Express", "active": True}
        ]
        pd.DataFrame(sample_slots).to_excel(TIMESLOTS_FILE, index=False)

# Excel Data Access Helpers
def read_excel_data(file_path):
    if not file_path.exists():
        init_excel_files()
    df = pd.read_excel(file_path)
    return df.to_dict(orient="records")

def write_excel_data(file_path, data):
    df = pd.DataFrame(data)
    df.to_excel(file_path, index=False)
