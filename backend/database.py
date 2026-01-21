from motor.motor_asyncio import AsyncIOMotorClient
from os import getenv
from dotenv import load_dotenv

load_dotenv()

MONGODB_URL = getenv("MONGODB_URL", "mongodb://localhost:27017")
DATABASE_NAME = "hrms_lite"

client = None
database = None

async def connect_to_mongo():
    global client, database
    client = AsyncIOMotorClient(MONGODB_URL)
    database = client[DATABASE_NAME]
    print(f"Connected to MongoDB at {MONGODB_URL}")

async def close_mongo_connection():
    global client
    if client:
        client.close()
        print("Closed MongoDB connection")

def get_database():
    return database
