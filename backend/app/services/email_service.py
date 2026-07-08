from app.core.logging import logger

class EmailService:
    @staticmethod
    async def send_verification_email(email: str, token: str):
        # Mock implementation for email sending
        logger.info("email_sent", type="verification", to=email, token=token)

    @staticmethod
    async def send_password_reset_email(email: str, token: str):
        logger.info("email_sent", type="password_reset", to=email, token=token)

    @staticmethod
    async def send_welcome_email(email: str, name: str):
        logger.info("email_sent", type="welcome", to=email, name=name)
