import { cookies } from 'next/headers'
import { generateCodeVerifier, generateState } from 'arctic'
import { google } from '@/lib/auth/arctic'

export async function GET(): Promise<Response> {
	const state = generateState()
	const codeVerifier = generateCodeVerifier()
	const scopes = ['openid', 'profile', 'email']

	const url = google.createAuthorizationURL(
		state,
		codeVerifier,
		scopes,
	)

	const cookie = await cookies()

	cookie.set('google_oauth_state', state, {
		path: '/',
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 10, // 10 minutes
		sameSite: 'lax',
	})

	cookie.set('google_code_verifier', codeVerifier, {
		path: '/',
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 10, // 10 minutes
		sameSite: 'lax',
	})

	return new Response(null, {
		status: 302,
		headers: {
			Location: url.toString(),
		},
	})
}
