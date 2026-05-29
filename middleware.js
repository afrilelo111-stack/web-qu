// middleware.js
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Penting: Refresh session jika perlu
  const { data: { user } } = await supabase.auth.getUser()

  // Definisikan route yang dilindungi (butuh login)
  const protectedRoutes = ['/web-ku/Keuangan']
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )

  // Jika route dilindungi dan user tidak login, redirect ke /admin/login
  if (isProtectedRoute && !user) {
    const redirectUrl = new URL('/', request.url)
    return NextResponse.redirect(redirectUrl)
  }

  // Jika user sudah login dan mencoba akses /admin/login, redirect ke dashboard
  if (user && request.nextUrl.pathname === '/') {
    const redirectUrl = new URL('/web-ku/Keuangan', request.url)
    return NextResponse.redirect(redirectUrl)
  }

  return supabaseResponse
}

// Tentukan path mana yang akan diproses middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
