import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const isOnDashboard = req.nextUrl.pathname.startsWith('/admin')
    const isOnCheckout = req.nextUrl.pathname.startsWith('/checkout')
    const isOnProfile = req.nextUrl.pathname.startsWith('/profile')

    // Protect Admin Routes
    if (isOnDashboard) {
        if (isLoggedIn) return NextResponse.next()
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    // Protect Checkout and Profile Routes
    if (isOnCheckout || isOnProfile) {
        if (isLoggedIn) return NextResponse.next()
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    // Content Security Policy
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
    const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.payfast.co.za https://sandbox.payfast.co.za;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://www.payfast.co.za https://sandbox.payfast.co.za;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self' https://www.payfast.co.za https://sandbox.payfast.co.za;
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
  `
    // Replace newlines with spaces
    const contentSecurityPolicyHeaderValue = cspHeader
        .replace(/\s{2,}/g, ' ')
        .trim()

    const requestHeaders = new Headers(req.headers)
    requestHeaders.set('x-nonce', nonce)
    requestHeaders.set(
        'Content-Security-Policy',
        contentSecurityPolicyHeaderValue
    )

    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    })
    response.headers.set(
        'Content-Security-Policy',
        contentSecurityPolicyHeaderValue
    )

    return response
})

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
