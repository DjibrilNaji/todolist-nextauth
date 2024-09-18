export const authRoutes = ["/auth/login", "/auth/register", "/auth/error"]

export const apiAuthPrefix = "/api/auth"

export const DEFAULT_LOGIN_REDIRECT = "/"

const routes = {
  home: "/",
  settings: "/settings",
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    error: "/auth/error"
  },
  tasks: {
    tasksList: (tasksListSlug: string) => `/tasksList/${tasksListSlug}`
  },
  api: {
    user: {
      tasksList: (userId: string) => `/api/user/${userId}/tasksList`,
      tasksListBySlug: (userId: string, slug: string) => `/api/user/${userId}/tasksList/${slug}`
    }
  }
}

export default routes
