/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ResetPasswordImport } from './routes/reset-password'
import { Route as AuthImport } from './routes/_auth'
import { Route as IndexImport } from './routes/index'
import { Route as AuthVisitsImport } from './routes/_auth.visits'
import { Route as AuthNewVisitImport } from './routes/_auth.new-visit'
import { Route as AuthNewNotificationImport } from './routes/_auth.new-notification'
import { Route as AuthMeImport } from './routes/_auth.me'
import { Route as AuthGuestsImport } from './routes/_auth.guests'
import { Route as AuthAdminImport } from './routes/_auth._admin'
import { Route as AuthServicesServiceIdImport } from './routes/_auth.services_.$serviceId'
import { Route as AuthGuestsGuestIdImport } from './routes/_auth.guests_.$guestId'
import { Route as AuthAdminUsersImport } from './routes/_auth._admin.users'
import { Route as AuthAdminAddServiceImport } from './routes/_auth._admin.add-service'
import { Route as AuthAdminUsersUserSubImport } from './routes/_auth._admin.users_.$userSub'

// Create/Update Routes

const ResetPasswordRoute = ResetPasswordImport.update({
  id: '/reset-password',
  path: '/reset-password',
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

const AuthMeRoute = AuthMeImport.update({
  id: '/me',
  path: '/me',
  getParentRoute: () => AuthRoute,
} as any)

const AuthGuestsRoute = AuthGuestsImport.update({
  id: '/guests',
  path: '/guests',
  getParentRoute: () => AuthRoute,
} as any)

const AuthAdminRoute = AuthAdminImport.update({
  id: '/_admin',
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

const AuthAdminAddServiceRoute = AuthAdminAddServiceImport.update({
  id: '/add-service',
  path: '/add-service',
  getParentRoute: () => AuthAdminRoute,
} as any)

const AuthAdminUsersUserSubRoute = AuthAdminUsersUserSubImport.update({
  id: '/users_/$userSub',
  path: '/users/$userSub',
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
    '/reset-password': {
      id: '/reset-password'
      path: '/reset-password'
      fullPath: '/reset-password'
      preLoaderRoute: typeof ResetPasswordImport
      parentRoute: typeof rootRoute
    }
    '/_auth/_admin': {
      id: '/_auth/_admin'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthAdminImport
      parentRoute: typeof AuthImport
    }
    '/_auth/guests': {
      id: '/_auth/guests'
      path: '/guests'
      fullPath: '/guests'
      preLoaderRoute: typeof AuthGuestsImport
      parentRoute: typeof AuthImport
    }
    '/_auth/me': {
      id: '/_auth/me'
      path: '/me'
      fullPath: '/me'
      preLoaderRoute: typeof AuthMeImport
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
    '/_auth/_admin/add-service': {
      id: '/_auth/_admin/add-service'
      path: '/add-service'
      fullPath: '/add-service'
      preLoaderRoute: typeof AuthAdminAddServiceImport
      parentRoute: typeof AuthAdminImport
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
    '/_auth/_admin/users_/$userSub': {
      id: '/_auth/_admin/users_/$userSub'
      path: '/users/$userSub'
      fullPath: '/users/$userSub'
      preLoaderRoute: typeof AuthAdminUsersUserSubImport
      parentRoute: typeof AuthAdminImport
    }
  }
}

// Create and export the route tree

interface AuthAdminRouteChildren {
  AuthAdminAddServiceRoute: typeof AuthAdminAddServiceRoute
  AuthAdminUsersRoute: typeof AuthAdminUsersRoute
  AuthAdminUsersUserSubRoute: typeof AuthAdminUsersUserSubRoute
}

const AuthAdminRouteChildren: AuthAdminRouteChildren = {
  AuthAdminAddServiceRoute: AuthAdminAddServiceRoute,
  AuthAdminUsersRoute: AuthAdminUsersRoute,
  AuthAdminUsersUserSubRoute: AuthAdminUsersUserSubRoute,
}

const AuthAdminRouteWithChildren = AuthAdminRoute._addFileChildren(
  AuthAdminRouteChildren,
)

interface AuthRouteChildren {
  AuthAdminRoute: typeof AuthAdminRouteWithChildren
  AuthGuestsRoute: typeof AuthGuestsRoute
  AuthMeRoute: typeof AuthMeRoute
  AuthNewNotificationRoute: typeof AuthNewNotificationRoute
  AuthNewVisitRoute: typeof AuthNewVisitRoute
  AuthVisitsRoute: typeof AuthVisitsRoute
  AuthGuestsGuestIdRoute: typeof AuthGuestsGuestIdRoute
  AuthServicesServiceIdRoute: typeof AuthServicesServiceIdRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthAdminRoute: AuthAdminRouteWithChildren,
  AuthGuestsRoute: AuthGuestsRoute,
  AuthMeRoute: AuthMeRoute,
  AuthNewNotificationRoute: AuthNewNotificationRoute,
  AuthNewVisitRoute: AuthNewVisitRoute,
  AuthVisitsRoute: AuthVisitsRoute,
  AuthGuestsGuestIdRoute: AuthGuestsGuestIdRoute,
  AuthServicesServiceIdRoute: AuthServicesServiceIdRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthAdminRouteWithChildren
  '/reset-password': typeof ResetPasswordRoute
  '/guests': typeof AuthGuestsRoute
  '/me': typeof AuthMeRoute
  '/new-notification': typeof AuthNewNotificationRoute
  '/new-visit': typeof AuthNewVisitRoute
  '/visits': typeof AuthVisitsRoute
  '/add-service': typeof AuthAdminAddServiceRoute
  '/users': typeof AuthAdminUsersRoute
  '/guests/$guestId': typeof AuthGuestsGuestIdRoute
  '/services/$serviceId': typeof AuthServicesServiceIdRoute
  '/users/$userSub': typeof AuthAdminUsersUserSubRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthAdminRouteWithChildren
  '/reset-password': typeof ResetPasswordRoute
  '/guests': typeof AuthGuestsRoute
  '/me': typeof AuthMeRoute
  '/new-notification': typeof AuthNewNotificationRoute
  '/new-visit': typeof AuthNewVisitRoute
  '/visits': typeof AuthVisitsRoute
  '/add-service': typeof AuthAdminAddServiceRoute
  '/users': typeof AuthAdminUsersRoute
  '/guests/$guestId': typeof AuthGuestsGuestIdRoute
  '/services/$serviceId': typeof AuthServicesServiceIdRoute
  '/users/$userSub': typeof AuthAdminUsersUserSubRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_auth': typeof AuthRouteWithChildren
  '/reset-password': typeof ResetPasswordRoute
  '/_auth/_admin': typeof AuthAdminRouteWithChildren
  '/_auth/guests': typeof AuthGuestsRoute
  '/_auth/me': typeof AuthMeRoute
  '/_auth/new-notification': typeof AuthNewNotificationRoute
  '/_auth/new-visit': typeof AuthNewVisitRoute
  '/_auth/visits': typeof AuthVisitsRoute
  '/_auth/_admin/add-service': typeof AuthAdminAddServiceRoute
  '/_auth/_admin/users': typeof AuthAdminUsersRoute
  '/_auth/guests_/$guestId': typeof AuthGuestsGuestIdRoute
  '/_auth/services_/$serviceId': typeof AuthServicesServiceIdRoute
  '/_auth/_admin/users_/$userSub': typeof AuthAdminUsersUserSubRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/reset-password'
    | '/guests'
    | '/me'
    | '/new-notification'
    | '/new-visit'
    | '/visits'
    | '/add-service'
    | '/users'
    | '/guests/$guestId'
    | '/services/$serviceId'
    | '/users/$userSub'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/reset-password'
    | '/guests'
    | '/me'
    | '/new-notification'
    | '/new-visit'
    | '/visits'
    | '/add-service'
    | '/users'
    | '/guests/$guestId'
    | '/services/$serviceId'
    | '/users/$userSub'
  id:
    | '__root__'
    | '/'
    | '/_auth'
    | '/reset-password'
    | '/_auth/_admin'
    | '/_auth/guests'
    | '/_auth/me'
    | '/_auth/new-notification'
    | '/_auth/new-visit'
    | '/_auth/visits'
    | '/_auth/_admin/add-service'
    | '/_auth/_admin/users'
    | '/_auth/guests_/$guestId'
    | '/_auth/services_/$serviceId'
    | '/_auth/_admin/users_/$userSub'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthRoute: typeof AuthRouteWithChildren
  ResetPasswordRoute: typeof ResetPasswordRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthRoute: AuthRouteWithChildren,
  ResetPasswordRoute: ResetPasswordRoute,
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
        "/reset-password"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/_admin",
        "/_auth/guests",
        "/_auth/me",
        "/_auth/new-notification",
        "/_auth/new-visit",
        "/_auth/visits",
        "/_auth/guests_/$guestId",
        "/_auth/services_/$serviceId"
      ]
    },
    "/reset-password": {
      "filePath": "reset-password.tsx"
    },
    "/_auth/_admin": {
      "filePath": "_auth._admin.tsx",
      "parent": "/_auth",
      "children": [
        "/_auth/_admin/add-service",
        "/_auth/_admin/users",
        "/_auth/_admin/users_/$userSub"
      ]
    },
    "/_auth/guests": {
      "filePath": "_auth.guests.tsx",
      "parent": "/_auth"
    },
    "/_auth/me": {
      "filePath": "_auth.me.tsx",
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
    "/_auth/_admin/add-service": {
      "filePath": "_auth._admin.add-service.tsx",
      "parent": "/_auth/_admin"
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
    "/_auth/_admin/users_/$userSub": {
      "filePath": "_auth._admin.users_.$userSub.tsx",
      "parent": "/_auth/_admin"
    }
  }
}
ROUTE_MANIFEST_END */
