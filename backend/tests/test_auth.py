import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_register(client: AsyncClient):
    response = await client.post(
        "/api/v1/auth/register",
        json={
            "email": "test@example.com",
            "name": "Test User",
            "password": "Password123!"
        }
    )
    # The first time it should pass
    assert response.status_code in [201, 400] # 400 if already exists

@pytest.mark.asyncio
async def test_login(client: AsyncClient):
    # Ensure user exists
    await client.post(
        "/api/v1/auth/register",
        json={
            "email": "login@example.com",
            "name": "Login User",
            "password": "Password123!"
        }
    )

    response = await client.post(
        "/api/v1/auth/login",
        json={
            "email": "login@example.com",
            "password": "Password123!"
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert "refresh_token" in data

@pytest.mark.asyncio
async def test_get_current_user(client: AsyncClient):
    # Register & Login
    await client.post(
        "/api/v1/auth/register",
        json={
            "email": "me@example.com",
            "name": "Me User",
            "password": "Password123!"
        }
    )

    login_resp = await client.post(
        "/api/v1/auth/login",
        json={
            "email": "me@example.com",
            "password": "Password123!"
        }
    )
    
    token = login_resp.json()["access_token"]

    # Get /me
    me_resp = await client.get(
        "/api/v1/users/me",
        headers={"Authorization": f"Bearer {token}"}
    )
    
    assert me_resp.status_code == 200
    assert me_resp.json()["email"] == "me@example.com"
