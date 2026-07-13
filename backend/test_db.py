import asyncio
import asyncpg
import redis.asyncio as redis

DATABASE_URL = "postgresql://neondb_owner:***REMOVED***@ep-twilight-star-at1opox0-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require"
REDIS_URL = "redis://localhost:6379"

async def main():
    print("Testing Redis...")
    try:
        r = redis.Redis.from_url(REDIS_URL, decode_responses=True)
        await r.ping()
        print("Redis connection SUCCESS!")
    except Exception as e:
        print(f"Redis connection FAILED: {e}")

    print("Testing PostgreSQL...")
    try:
        conn = await asyncpg.connect(DATABASE_URL)
        val = await conn.fetchval('SELECT 1')
        print(f"PostgreSQL connection SUCCESS! SELECT 1 returned {val}")
        
        # Check if users table exists
        exists = await conn.fetchval("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'users')")
        print(f"Users table exists: {exists}")
        
        await conn.close()
    except Exception as e:
        print(f"PostgreSQL connection FAILED: {e}")

asyncio.run(main())
