import { GitHub } from 'arctic';
import { Google } from 'arctic';
import { Facebook } from 'arctic';
import { Apple } from 'arctic';

export const github = new GitHub(
	process.env.GITHUB_CLIENT_ID!,
	process.env.GITHUB_CLIENT_SECRET!
);

export const google = new Google(
	process.env.GOOGLE_CLIENT_ID!,
	process.env.GOOGLE_CLIENT_SECRET!,
	process.env.GOOGLE_REDIRECT_URI!
);

export const facebook = new Facebook(
	process.env.FACEBOOK_CLIENT_ID!,
	process.env.FACEBOOK_CLIENT_SECRET!,
	process.env.FACEBOOK_REDIRECT_URI!
);

import type { AppleCredentials } from 'arctic';

const credentials: AppleCredentials = {
	clientId: process.env.APPLE_CLIENT_ID!,
	teamId: process.env.APPLE_TEAM_ID!,
	keyId: process.env.APPLE_KEY_ID!,
	certificate: process.env.APPLE_CERTIFICATE!
};

export const apple = new Apple(credentials, process.env.APPLE_REDIRECT_URI!);
