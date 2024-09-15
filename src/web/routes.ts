export const publicRoutes = [""]

export const authRoutes = ["/auth/login", "/auth/register", "/auth/error"]

export const apiAuthPrefix = "/api/auth"

export const DEFAULT_LOGIN_REDIRECT = "/"

const routes = {
  home: () => "/",
  auth: {
    login: () => "/auth/login",
    register: () => "/auth/register",
    error: () => "/auth/error"
  }
}

export default routes
