from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uuid
import datetime

from app.config import USE_EXCEL, DATABASE_URL
from app.db.excel_db import (
    init_excel_files, PRODUCTS_FILE, USERS_FILE, CATEGORIES_FILE, ORDERS_FILE, TIMESLOTS_FILE,
    read_excel_data, write_excel_data
)

app = FastAPI(
    title="PhoolBazaar API",
    description="Fresh Flowers, Garlands, Pooja Essentials & Event Decor Backend API",
    version="1.0.0"
)

# CORS Middleware
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://phoolbazaar-one.vercel.app",
    "https://phoolbazaar.online",
    "https://www.phoolbazaar.online",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.on_event("startup")
def startup_event():
    if USE_EXCEL:
        print("🌸 [PhoolBazaar Backend] DATABASE_URL empty -> Initializing Excel Database Fallback Storage")
        init_excel_files()
    else:
        print(f"🌸 [PhoolBazaar Backend] Switching to PostgreSQL Database Engine: {DATABASE_URL}")

# Pydantic Schemas
class ProductSchema(BaseModel):
    id: Optional[str] = None
    name: str
    category: str
    price: float
    mrp: Optional[float] = None
    unit: str
    badge: Optional[str] = "Farm Plucked"
    images: str
    description: str
    inStock: bool = True
    isBestSeller: bool = False

class LoginSchema(BaseModel):
    email: str
    password: str

class RegisterSchema(BaseModel):
    name: str
    email: str
    mobile: str
    password: str

class OrderSchema(BaseModel):
    items: list
    total: float
    slot: str
    deliveryDate: str
    address: str
    phone: str

# API ENDPOINTS

@app.get("/")
def root():
    return {
        "app": "🌸 PhoolBazaar API",
        "status": "Online",
        "storage_mode": "Excel Fallback (.xlsx)" if USE_EXCEL else "PostgreSQL Database",
        "docs": "/docs"
    }

# Products
@app.get("/api/products")
def get_products(category: Optional[str] = None):
    products = read_excel_data(PRODUCTS_FILE)
    if category and category != "All":
        products = [p for p in products if p.get("category") == category]
    return products

@app.post("/api/products")
def create_product(product: ProductSchema):
    products = read_excel_data(PRODUCTS_FILE)
    new_p = product.dict()
    new_p["id"] = "p_" + str(uuid.uuid4())[:8]
    products.insert(0, new_p)
    write_excel_data(PRODUCTS_FILE, products)
    return new_p

@app.delete("/api/products/{product_id}")
def delete_product(product_id: str):
    products = read_excel_data(PRODUCTS_FILE)
    updated = [p for p in products if str(p.get("id")) != product_id]
    write_excel_data(PRODUCTS_FILE, updated)
    return {"message": "Product deleted successfully"}

# Categories
@app.get("/api/categories")
def get_categories():
    return read_excel_data(CATEGORIES_FILE)

# Time Slots
@app.get("/api/timeslots")
def get_timeslots():
    return read_excel_data(TIMESLOTS_FILE)

# Orders
@app.get("/api/orders")
def get_orders():
    return read_excel_data(ORDERS_FILE)

@app.post("/api/orders")
def place_order(order: OrderSchema):
    orders = read_excel_data(ORDERS_FILE)
    order_dict = {
        "id": "PB-" + str(uuid.uuid4())[:6].upper(),
        "customer": order.phone,
        "total": order.total,
        "status": "Placed",
        "date": str(datetime.date.today()),
        "slot": order.slot,
        "address": order.address
    }
    orders.insert(0, order_dict)
    write_excel_data(ORDERS_FILE, orders)
    return order_dict

# Auth
@app.post("/api/auth/login")
def login_user(payload: LoginSchema):
    users = read_excel_data(USERS_FILE)
    user = next((u for u in users if u.get("email") == payload.email), None)
    if not user:
        # Default mock login for test
        role = "admin" if "admin" in payload.email else "customer"
        return {
            "token": "token_" + str(uuid.uuid4()),
            "user": {
                "id": "usr_demo",
                "name": payload.email.split("@")[0],
                "email": payload.email,
                "role": role
            }
        }
    return {
        "token": "token_" + str(uuid.uuid4()),
        "user": user
    }

@app.post("/api/auth/register")
def register_user(payload: RegisterSchema):
    users = read_excel_data(USERS_FILE)
    new_user = {
        "id": "usr_" + str(uuid.uuid4())[:8],
        "name": payload.name,
        "email": payload.email,
        "mobile": payload.mobile,
        "role": "customer"
    }
    users.append(new_user)
    write_excel_data(USERS_FILE, users)
    return {"token": "token_" + str(uuid.uuid4()), "user": new_user}

# Admin Stats
@app.get("/api/admin/stats")
def get_admin_stats():
    products = read_excel_data(PRODUCTS_FILE)
    orders = read_excel_data(ORDERS_FILE)
    users = read_excel_data(USERS_FILE)
    total_rev = sum(o.get("total", 0) for o in orders)
    return {
        "activeProducts": len(products),
        "totalOrders": len(orders),
        "totalUsers": len(users),
        "totalRevenue": total_rev
    }
