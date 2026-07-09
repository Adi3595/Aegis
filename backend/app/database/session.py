from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from app.core.config import settings

# For SQLite fallback during early dev, we could use sqlite+aiosqlite
# But we are setting up Postgres as requested
db_url = settings.DATABASE_URL
if "sslmode=" in db_url:
    db_url = db_url.replace("sslmode=", "ssl=")
if "&channel_binding=require" in db_url:
    db_url = db_url.replace("&channel_binding=require", "")
if "?channel_binding=require&" in db_url:
    db_url = db_url.replace("?channel_binding=require&", "?")

engine = create_async_engine(
    db_url,
    echo=settings.DEBUG,
    future=True,
    pool_size=5,
    max_overflow=10,
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False,
    expire_on_commit=False,
)

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
