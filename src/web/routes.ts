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
    tasks: {
      tasksList: (ownerId: string) => `/api/tasks/${ownerId}`
    }
  }
}

export default routes
