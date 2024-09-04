import type { NextRequest } from "next/server"
import { privateRoutes } from "@/routes"

export function middleware(request: NextRequest) {
  // const isPrivateRoute = privateRoutes.some((route) =>
  //   request.nextUrl.pathname.startsWith(route),
  // )
  // if (isPrivateRoute) {
  //   return Response.redirect(new URL(`/`, request.nextUrl))
  // }
}
