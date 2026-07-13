import { useAuthStore } from "@/features/auth/store/authStore"

describe("Auth Store", () => {
  beforeEach(() => {
    // Reset the store before each test
    useAuthStore.setState({ user: null, isAuthenticated: false, isLoading: false })
  })

  it("should have correct initial state", () => {
    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
    expect(state.isAuthenticated).toBe(false)
    expect(state.isLoading).toBe(false)
  })

  it("should set auth user correctly", () => {
    const mockUser = { id: "1", email: "demo@aegis.ai", name: "Demo User", role: "Security" as const }
    
    useAuthStore.getState().setAuth(mockUser)
    
    const state = useAuthStore.getState()
    expect(state.user).toEqual(mockUser)
    expect(state.isAuthenticated).toBe(true)
    expect(state.isLoading).toBe(false)
  })

  it("should update role for authenticated user", () => {
    const mockUser = { id: "1", email: "demo@aegis.ai", name: "Demo User", role: "Fan" as const }
    useAuthStore.getState().setAuth(mockUser)
    
    useAuthStore.getState().setRole("Executive")
    
    const state = useAuthStore.getState()
    expect(state.user?.role).toBe("Executive")
  })

  it("should clear state on logout", () => {
    const mockUser = { id: "1", email: "demo@aegis.ai", name: "Demo User" }
    useAuthStore.getState().setAuth(mockUser)
    
    useAuthStore.getState().logout()
    
    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
    expect(state.isAuthenticated).toBe(false)
  })

  it("should set loading state", () => {
    useAuthStore.getState().setLoading(true)
    expect(useAuthStore.getState().isLoading).toBe(true)
    
    useAuthStore.getState().setLoading(false)
    expect(useAuthStore.getState().isLoading).toBe(false)
  })
})
