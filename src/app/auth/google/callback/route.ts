import { cookies } from 'next/headers'
import { ObjectParser } from '@pilcrowjs/object-parser'
import { type OAuth2Tokens, decodeIdToken } from 'arctic'
import { google } from '@/lib/auth/arctic'
import { setSessionTokenCookie } from '@/lib/auth/cookies'
import {
	createSession,
	generateSessionToken,
} from '@/lib/auth/session'
import { prisma } from '@/lib/database/prisma'

export async function GET(request: Request): Promise<Response> {
	const url = new URL(request.url)
	const code = url.searchParams.get('code')
	const state = url.searchParams.get('state')
	const storedState =
		(await cookies()).get('google_oauth_state')?.value ?? null
	const codeVerifier =
		(await cookies()).get('google_code_verifier')?.value ?? null
	if (
		code === null ||
		state === null ||
		storedState === null ||
		codeVerifier === null ||
		state !== storedState
	) {
		return new Response('Please restart the process.', {
			status: 400,
		})
	}

	let tokens: OAuth2Tokens
	try {
		tokens = await google.validateAuthorizationCode(
			code,
			codeVerifier,
		)
	} catch (e) {
		// Invalid code or client credentials
		return new Response('Please restart the process.', {
			status: 400,
		})
	}

	const claims = decodeIdToken(tokens.idToken())
	const claimsParser = new ObjectParser(claims)

	const googleId = claimsParser.getString('sub')
	const name = claimsParser.getString('name')
	const picture = claimsParser.getString('picture')
	const email = claimsParser.getString('email')

	if (googleId === null)
		return new Response('Google Id null', {
			status: 400,
		})

	// TODO: Replace this with your own DB query.
	const existingUser = await prisma.user.findFirst({
		where: {
			googleId: {
				equals: googleId,
				not: null,
			},
		},
	})

	if (existingUser !== null) {
		console.log(existingUser)
		const sessionToken = generateSessionToken()
		const session = await createSession(sessionToken, existingUser.id)
		setSessionTokenCookie(sessionToken, session.expiresAt)
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/',
			},
		})
	}

	const user = await prisma.user.create({
		data: {
			googleId: googleId, // googleId can be null if not provided
			userName: name,
			email: email,
			picture: picture,
			role: 'USER',
		},
	})

	const sessionToken = generateSessionToken()
	const session = await createSession(sessionToken, user.id)
	setSessionTokenCookie(sessionToken, session.expiresAt)
	return new Response(null, {
		status: 302,
		headers: {
			Location: '/',
		},
	})
}
