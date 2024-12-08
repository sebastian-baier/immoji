// app/login/github/route.ts
import { cookies } from 'next/headers'
import { generateState } from 'arctic'
import { github } from '@/lib/auth/arctic'

export async function GET(): Promise<Response> {
	const state = generateState()
	const scopes = ['user:email']

	const url = github.createAuthorizationURL(state, scopes)

	const responseCookie = (await cookies()).set(
		'github_oauth_state',
		state,
		{
			path: '/',
			secure: process.env.NODE_ENV === 'production',
			httpOnly: true,
			maxAge: 60 * 10,
			sameSite: 'lax',
		},
	)

	if (!responseCookie)
		return new Response(null, {
			status: 404,
			headers: {
				Location: url.toString(),
			},
		})

	return new Response(null, {
		status: 302,
		headers: {
			Location: url.toString(),
		},
	})
}
