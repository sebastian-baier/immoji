import { cookies } from 'next/headers'
import { ObjectParser } from '@pilcrowjs/object-parser'
import { type OAuth2Tokens } from 'arctic'
import { github } from '@/lib/auth/arctic'
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
		cookies().get('github_oauth_state')?.value ?? null

	if (
		code === null ||
		state === null ||
		storedState === null ||
		state !== storedState
	) {
		return new Response('Please restart the process.', {
			status: 400,
		})
	}

	let tokens: OAuth2Tokens
	try {
		tokens = await github.validateAuthorizationCode(code)
	} catch (e) {
		// Invalid code or client credentials
		return new Response(null, {
			status: 400,
		})
	}
	const githubUserResponse = await fetch(
		'https://api.github.com/user',
		{
			headers: {
				Authorization: `Bearer ${tokens.accessToken()}`,
			},
		},
	)
	const githubUser = await githubUserResponse.json()
	const githubUserId = githubUser.id
	const githubUsername = githubUser.login
	const githubAvatar = githubUser.avatar_url

	if (githubUserId === null)
		return new Response('UserId null', {
			status: 400,
		})

	const existingUser = await prisma.user.findFirst({
		where: {
			githubId: {
				equals: githubUserId.toString(),
				not: null,
			},
		},
	})

	if (existingUser !== null) {
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

	const emailListResponse = await fetch(
		'https://api.github.com/user/emails',
		{
			headers: {
				Authorization: `Bearer ${tokens.accessToken()}`,
			},
		},
	)
	const emailListResult: unknown = await emailListResponse.json()
	if (!Array.isArray(emailListResult) || emailListResult.length < 1) {
		return new Response('No Email', {
			status: 400,
		})
	}
	let email: string | null = null
	for (const emailRecord of emailListResult) {
		const emailParser = new ObjectParser(emailRecord)
		const primaryEmail = emailParser.getBoolean('primary')
		const verifiedEmail = emailParser.getBoolean('verified')
		if (primaryEmail && verifiedEmail) {
			email = emailParser.getString('email')
		}
	}
	if (email === null) {
		return new Response('Please verify your GitHub email address.', {
			status: 400,
		})
	}

	const user = await prisma.user.create({
		data: {
			githubId: githubUserId.toString(), // Allow `null` if the GitHub ID is not available
			userName: githubUsername,
			email: email, // Store the email if available
			picture: githubAvatar,
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
