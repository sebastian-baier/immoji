import { ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies'
import { cookies, type UnsafeUnwrappedCookies } from 'next/headers'

export function setSessionTokenCookie(
	token: string,
	expiresAt: Date,
): ResponseCookies {
	return (cookies() as unknown as UnsafeUnwrappedCookies).set(
		'session',
		token,
		{
			httpOnly: true,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
			expires: expiresAt,
			path: '/',
		},
	)
}

export function deleteSessionTokenCookie(): ResponseCookies {
	return (cookies() as unknown as UnsafeUnwrappedCookies).set(
		'session',
		'',
		{
			httpOnly: true,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 0,
			path: '/',
		},
	)
}
