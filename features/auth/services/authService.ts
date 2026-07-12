import { LoginFormData, RegisterFormData, ForgotPasswordFormData, ResetPasswordFormData } from "../schemas/authSchemas"
import { User } from "../store/authStore"
import { toast } from "@/store/toastStore"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://aegis-backend-qlx8.onrender.com/api/v1"

// Helper to handle API responses
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(data?.error?.message || data?.detail || "An unexpected error occurred.")
  }

  return data
}

export const authService = {
  async login(data: LoginFormData): Promise<User> {
    toast.loading("Authenticating via secure proxy...", undefined, { duration: 1500 })
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", "mock_token_123")
    }

    return {
      id: `usr_mock_${Math.floor(Math.random() * 1000)}`,
      email: data.email,
      name: data.email.split("@")[0],
      role: "Pending" // Will be prompted to select persona
    } as User
  },

  async register(data: RegisterFormData): Promise<User> {
    toast.loading("Provisioning new identity...", undefined, { duration: 1500 })
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", "mock_token_123")
    }
    
    return {
      id: `usr_mock_${Math.floor(Math.random() * 1000)}`,
      email: data.email,
      name: data.name,
      role: data.role
    } as User
  },

  async mockLogin(role: string): Promise<User> {
    toast.loading(`Initializing ${role} Workspace...`, undefined, { duration: 1500 })
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", "mock_token_123")
    }

    return {
      id: `usr_mock_${Math.floor(Math.random() * 1000)}`,
      email: `${role.toLowerCase()}@aegis.system`,
      name: `${role} User`,
      role: role
    } as User
  },

  async oauthLogin(provider: "google" | "microsoft"): Promise<User> {
    toast.loading(`Connecting to ${provider}...`, undefined, { duration: 2000 })
    // Mock OAuth delay
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    // For demo purposes, map different OAuth providers to different roles
    const demoRole = provider === "google" ? "Organizer" : "Medical"

    return {
      id: `usr_oauth_${Math.floor(Math.random() * 1000)}`,
      email: `user@${provider}.com`,
      name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
      role: demoRole
    } as User
  },

  async forgotPassword(data: ForgotPasswordFormData): Promise<void> {
    await fetchAPI("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email: data.email }),
    })
  },

  async resetPassword(data: ResetPasswordFormData, token: string): Promise<void> {
    await fetchAPI("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ new_password: data.password, token }),
    })
  }
}
