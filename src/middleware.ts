import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware({
  publicRoutes: ['/sign-in(.*)', '/sign-up(.*)', '/', '/api/public(.*)'],
})

export const config = {
  matcher: [
    // Always run for API and app routes, skip static files
    '/((?!_next|.*\\..*|favicon.ico).*)',
  ],
}
