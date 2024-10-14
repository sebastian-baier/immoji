// app/login/github/route.ts
import { facebook } from '@/lib/auth/arctic';
import { generateState } from 'arctic';
import { cookies } from 'next/headers';

export async function GET(): Promise<Response> {
	const state = generateState();

	const scopes = ['email', 'public_profile'];
	const url: URL = await facebook.createAuthorizationURL(state, {
		scopes
	});

	cookies().set('facebook_oauth_state', state, {
		path: '/',
		secure: process.env.NODE_ENV === 'production',
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: 'lax'
	});
	return Response.redirect(url);
}
