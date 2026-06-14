from motor.motor_asyncio import AsyncIOMotorClient
from fastapi import FastAPI
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

client = AsyncIOMotorClient(
    os.getenv("MONGO_URL")
)

db = client[
    os.getenv("DB_NAME")
]

@app.get("/")
async def root():
    return {"message": "GeneCare AI Running"}

@app.get("/test-db")
async def test_db():
    await client.admin.command("ping")
    return {"status": "MongoDB Connected"}