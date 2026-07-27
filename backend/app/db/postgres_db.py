from sqlalchemy import create_engine, Column, String, Float, Integer, Boolean, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config import DATABASE_URL

Base = declarative_base()

if DATABASE_URL:
    engine = create_engine(DATABASE_URL)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
else:
    engine = None
    SessionLocal = None

class ProductModel(Base):
    __tablename__ = "products"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    category = Column(String, index=True)
    price = Column(Float)
    mrp = Column(Float, nullable=True)
    discount = Column(Integer, default=0)
    unit = Column(String)
    badge = Column(String, nullable=True)
    in_stock = Column(Boolean, default=True)
    is_best_seller = Column(Boolean, default=False)
    images = Column(Text)
    description = Column(Text)

class UserModel(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    mobile = Column(String)
    hashed_password = Column(String)
    role = Column(String, default="customer")

class OrderModel(Base):
    __tablename__ = "orders"

    id = Column(String, primary_key=True, index=True)
    customer_id = Column(String)
    total_amount = Column(Float)
    status = Column(String, default="Placed")
    delivery_slot = Column(String)
    delivery_date = Column(String)
    created_at = Column(String)
