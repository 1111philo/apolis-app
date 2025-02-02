/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as AuthImport } from './routes/_auth'
import { Route as IndexImport } from './routes/index'
import { Route as AuthVisitsImport } from './routes/_auth.visits'
import { Route as AuthNewVisitImport } from './routes/_auth.new-visit'
import { Route as AuthNewNotificationImport } from './routes/_auth.new-notification'
import { Route as AuthGuestsImport } from './routes/_auth.guests'
import { Route as AuthAddServiceImport } from './routes/_auth.add-service'
import { Route as AuthAdminImport } from './routes/_auth._admin'
import { Route as AuthUsersUserIdImport } from './routes/_auth.users_.$userId'
import { Route as AuthServicesServiceIdImport } from './routes/_auth.services_.$serviceId'
import { Route as AuthGuestsGuestIdImport } from './routes/_auth.guests_.$guestId'
import { Route as AuthAdminUsersImport } from './routes/_auth._admin.users'

// Create/Update Routes

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthVisitsRoute = AuthVisitsImport.update({
  id: '/visits',
  path: '/visits',
  getParentRoute: () => AuthRoute,
} as any)

const AuthNewVisitRoute = AuthNewVisitImport.update({
  id: '/new-visit',
  path: '/new-visit',
  getParentRoute: () => AuthRoute,
} as any)

const AuthNewNotificationRoute = AuthNewNotificationImport.update({
  id: '/new-notification',
  path: '/new-notification',
  getParentRoute: () => AuthRoute,
} as any)

const AuthGuestsRoute = AuthGuestsImport.update({
  id: '/guests',
  path: '/guests',
  getParentRoute: () => AuthRoute,
} as any)

const AuthAddServiceRoute = AuthAddServiceImport.update({
  id: '/add-service',
  path: '/add-service',
  getParentRoute: () => AuthRoute,
} as any)

const AuthAdminRoute = AuthAdminImport.update({
  id: '/_admin',
  getParentRoute: () => AuthRoute,
} as any)

const AuthUsersUserIdRoute = AuthUsersUserIdImport.update({
  id: '/users_/$userId',
  path: '/users/$userId',
  getParentRoute: () => AuthRoute,
} as any)

const AuthServicesServiceIdRoute = AuthServicesServiceIdImport.update({
  id: '/services_/$serviceId',
  path: '/services/$serviceId',
  getParentRoute: () => AuthRoute,
} as any)

const AuthGuestsGuestIdRoute = AuthGuestsGuestIdImport.update({
  id: '/guests_/$guestId',
  path: '/guests/$guestId',
  getParentRoute: () => AuthRoute,
} as any)

const AuthAdminUsersRoute = AuthAdminUsersImport.update({
  id: '/users',
  path: '/users',
  getParentRoute: () => AuthAdminRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/_auth/_admin': {
      id: '/_auth/_admin'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthAdminImport
      parentRoute: typeof AuthImport
    }
    '/_auth/add-service': {
      id: '/_auth/add-service'
      path: '/add-service'
      fullPath: '/add-service'
      preLoaderRoute: typeof AuthAddServiceImport
      parentRoute: typeof AuthImport
    }
    '/_auth/guests': {
      id: '/_auth/guests'
      path: '/guests'
      fullPath: '/guests'
      preLoaderRoute: typeof AuthGuestsImport
      parentRoute: typeof AuthImport
    }
    '/_auth/new-notification': {
      id: '/_auth/new-notification'
      path: '/new-notification'
      fullPath: '/new-notification'
      preLoaderRoute: typeof AuthNewNotificationImport
      parentRoute: typeof AuthImport
    }
    '/_auth/new-visit': {
      id: '/_auth/new-visit'
      path: '/new-visit'
      fullPath: '/new-visit'
      preLoaderRoute: typeof AuthNewVisitImport
      parentRoute: typeof AuthImport
    }
    '/_auth/visits': {
      id: '/_auth/visits'
      path: '/visits'
      fullPath: '/visits'
      preLoaderRoute: typeof AuthVisitsImport
      parentRoute: typeof AuthImport
    }
    '/_auth/_admin/users': {
      id: '/_auth/_admin/users'
      path: '/users'
      fullPath: '/users'
      preLoaderRoute: typeof AuthAdminUsersImport
      parentRoute: typeof AuthAdminImport
    }
    '/_auth/guests_/$guestId': {
      id: '/_auth/guests_/$guestId'
      path: '/guests/$guestId'
      fullPath: '/guests/$guestId'
      preLoaderRoute: typeof AuthGuestsGuestIdImport
      parentRoute: typeof AuthImport
    }
    '/_auth/services_/$serviceId': {
      id: '/_auth/services_/$serviceId'
      path: '/services/$serviceId'
      fullPath: '/services/$serviceId'
      preLoaderRoute: typeof AuthServicesServiceIdImport
      parentRoute: typeof AuthImport
    }
    '/_auth/users_/$userId': {
      id: '/_auth/users_/$userId'
      path: '/users/$userId'
      fullPath: '/users/$userId'
      preLoaderRoute: typeof AuthUsersUserIdImport
      parentRoute: typeof AuthImport
    }
  }
}

// Create and export the route tree

interface AuthAdminRouteChildren {
  AuthAdminUsersRoute: typeof AuthAdminUsersRoute
}

const AuthAdminRouteChildren: AuthAdminRouteChildren = {
  AuthAdminUsersRoute: AuthAdminUsersRoute,
}

const AuthAdminRouteWithChildren = AuthAdminRoute._addFileChildren(
  AuthAdminRouteChildren,
)

interface AuthRouteChildren {
  AuthAdminRoute: typeof AuthAdminRouteWithChildren
  AuthAddServiceRoute: typeof AuthAddServiceRoute
  AuthGuestsRoute: typeof AuthGuestsRoute
  AuthNewNotificationRoute: typeof AuthNewNotificationRoute
  AuthNewVisitRoute: typeof AuthNewVisitRoute
  AuthVisitsRoute: typeof AuthVisitsRoute
  AuthGuestsGuestIdRoute: typeof AuthGuestsGuestIdRoute
  AuthServicesServiceIdRoute: typeof AuthServicesServiceIdRoute
  AuthUsersUserIdRoute: typeof AuthUsersUserIdRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthAdminRoute: AuthAdminRouteWithChildren,
  AuthAddServiceRoute: AuthAddServiceRoute,
  AuthGuestsRoute: AuthGuestsRoute,
  AuthNewNotificationRoute: AuthNewNotificationRoute,
  AuthNewVisitRoute: AuthNewVisitRoute,
  AuthVisitsRoute: AuthVisitsRoute,
  AuthGuestsGuestIdRoute: AuthGuestsGuestIdRoute,
  AuthServicesServiceIdRoute: AuthServicesServiceIdRoute,
  AuthUsersUserIdRoute: AuthUsersUserIdRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthAdminRouteWithChildren
  '/login': typeof LoginRoute
  '/add-service': typeof AuthAddServiceRoute
  '/guests': typeof AuthGuestsRoute
  '/new-notification': typeof AuthNewNotificationRoute
  '/new-visit': typeof AuthNewVisitRoute
  '/visits': typeof AuthVisitsRoute
  '/users': typeof AuthAdminUsersRoute
  '/guests/$guestId': typeof AuthGuestsGuestIdRoute
  '/services/$serviceId': typeof AuthServicesServiceIdRoute
  '/users/$userId': typeof AuthUsersUserIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthAdminRouteWithChildren
  '/login': typeof LoginRoute
  '/add-service': typeof AuthAddServiceRoute
  '/guests': typeof AuthGuestsRoute
  '/new-notification': typeof AuthNewNotificationRoute
  '/new-visit': typeof AuthNewVisitRoute
  '/visits': typeof AuthVisitsRoute
  '/users': typeof AuthAdminUsersRoute
  '/guests/$guestId': typeof AuthGuestsGuestIdRoute
  '/services/$serviceId': typeof AuthServicesServiceIdRoute
  '/users/$userId': typeof AuthUsersUserIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_auth': typeof AuthRouteWithChildren
  '/login': typeof LoginRoute
  '/_auth/_admin': typeof AuthAdminRouteWithChildren
  '/_auth/add-service': typeof AuthAddServiceRoute
  '/_auth/guests': typeof AuthGuestsRoute
  '/_auth/new-notification': typeof AuthNewNotificationRoute
  '/_auth/new-visit': typeof AuthNewVisitRoute
  '/_auth/visits': typeof AuthVisitsRoute
  '/_auth/_admin/users': typeof AuthAdminUsersRoute
  '/_auth/guests_/$guestId': typeof AuthGuestsGuestIdRoute
  '/_auth/services_/$serviceId': typeof AuthServicesServiceIdRoute
  '/_auth/users_/$userId': typeof AuthUsersUserIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/login'
    | '/add-service'
    | '/guests'
    | '/new-notification'
    | '/new-visit'
    | '/visits'
    | '/users'
    | '/guests/$guestId'
    | '/services/$serviceId'
    | '/users/$userId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/login'
    | '/add-service'
    | '/guests'
    | '/new-notification'
    | '/new-visit'
    | '/visits'
    | '/users'
    | '/guests/$guestId'
    | '/services/$serviceId'
    | '/users/$userId'
  id:
    | '__root__'
    | '/'
    | '/_auth'
    | '/login'
    | '/_auth/_admin'
    | '/_auth/add-service'
    | '/_auth/guests'
    | '/_auth/new-notification'
    | '/_auth/new-visit'
    | '/_auth/visits'
    | '/_auth/_admin/users'
    | '/_auth/guests_/$guestId'
    | '/_auth/services_/$serviceId'
    | '/_auth/users_/$userId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthRoute: typeof AuthRouteWithChildren
  LoginRoute: typeof LoginRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthRoute: AuthRouteWithChildren,
  LoginRoute: LoginRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_auth",
        "/login"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/_admin",
        "/_auth/add-service",
        "/_auth/guests",
        "/_auth/new-notification",
        "/_auth/new-visit",
        "/_auth/visits",
        "/_auth/guests_/$guestId",
        "/_auth/services_/$serviceId",
        "/_auth/users_/$userId"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/_auth/_admin": {
      "filePath": "_auth._admin.tsx",
      "parent": "/_auth",
      "children": [
        "/_auth/_admin/users"
      ]
    },
    "/_auth/add-service": {
      "filePath": "_auth.add-service.tsx",
      "parent": "/_auth"
    },
    "/_auth/guests": {
      "filePath": "_auth.guests.tsx",
      "parent": "/_auth"
    },
    "/_auth/new-notification": {
      "filePath": "_auth.new-notification.tsx",
      "parent": "/_auth"
    },
    "/_auth/new-visit": {
      "filePath": "_auth.new-visit.tsx",
      "parent": "/_auth"
    },
    "/_auth/visits": {
      "filePath": "_auth.visits.tsx",
      "parent": "/_auth"
    },
    "/_auth/_admin/users": {
      "filePath": "_auth._admin.users.tsx",
      "parent": "/_auth/_admin"
    },
    "/_auth/guests_/$guestId": {
      "filePath": "_auth.guests_.$guestId.tsx",
      "parent": "/_auth"
    },
    "/_auth/services_/$serviceId": {
      "filePath": "_auth.services_.$serviceId.tsx",
      "parent": "/_auth"
    },
    "/_auth/users_/$userId": {
      "filePath": "_auth.users_.$userId.tsx",
      "parent": "/_auth"
    }
  }
}
ROUTE_MANIFEST_END */
