import { LoginFormData, RegisterFormData, ForgotPasswordFormData, ResetPasswordFormData } from "../schemas/authSchemas"
import { User } from "../store/authStore"
import { toast } from "@/store/toastStore"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"

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
    const response = await fetchAPI("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: data.email, password: data.password }),
    })
    
    // Store the tokens securely (in real app, HttpOnly cookies are better)
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", response.access_token)
      localStorage.setItem("refresh_token", response.refresh_token)
    }

    // Fetch the user profile using the access token
    const user = await fetchAPI("/users/me", {
      headers: {
        Authorization: `Bearer ${response.access_token}`,
      },
    })
    
    return user
  },

  async register(data: RegisterFormData): Promise<User> {
    const user = await fetchAPI("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        name: data.name,
        password: data.password,
      }),
    })
    
    return user
  },

  async oauthLogin(provider: "google" | "microsoft"): Promise<User> {
    toast.loading(`Connecting to ${provider}...`, undefined, { duration: 2000 })
    // Mock OAuth delay
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    return {
      id: `usr_oauth_${Math.floor(Math.random() * 1000)}`,
      email: `user@${provider}.com`,
      name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
      role: "Fan"
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
