from typing import Protocol, Optional
import os

class ISecretProvider(Protocol):
    """
    Interface for resolving application secrets.
    """
    def get_secret(self, key: str) -> Optional[str]:
        ...

class EnvironmentSecretProvider:
    """
    Default provider that resolves secrets from environment variables.
    """
    def get_secret(self, key: str) -> Optional[str]:
        return os.getenv(key)

class AzureKeyVaultProvider:
    """
    Placeholder for Azure Key Vault integration.
    To implement:
      1. pip install azure-identity azure-keyvault-secrets
      2. Initialize DefaultAzureCredential and SecretClient
      3. Override get_secret to fetch from client.get_secret(key)
    """
    def __init__(self, vault_url: str = None):
        self.vault_url = vault_url or os.getenv("AZURE_KEYVAULT_URL")
        if self.vault_url:
            pass # Initialize client here in future

    def get_secret(self, key: str) -> Optional[str]:
        # For MVP fallback to ENV if SDK not implemented
        return os.getenv(key)

def get_secret_provider() -> ISecretProvider:
    provider_name = os.getenv("SECRET_PROVIDER", "env").lower()
    
    if provider_name == "keyvault":
        return AzureKeyVaultProvider()
    
    return EnvironmentSecretProvider()

# Global instance
secrets = get_secret_provider()
