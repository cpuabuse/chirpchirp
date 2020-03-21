#!/usr/bin/env node

/*
	File: src/index.ts
	cpuabuse.com
*/

/**
 * Entry point for the project.
 */

/**
 * @license ISC
 * ISC License (ISC)
 *
 * Copyright 2020 cpuabuse.com
 *
 * Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

import { Command } from "commander";
import Twitter from "twitter";
import { join } from "path";
import { readFile } from "fs";
import { send } from "./send";

const envTwitterApiKey: string | undefined = process.env.TWITTER_API_KEY;
const envTwitterApiSecretKey: string | undefined = process.env.TWITTER_API_SECRET_KEY;
const envTwitterAccessToken: string | undefined = process.env.TWITTER_ACCESS_TOKEN;
const envTwitterAccessTokenSecret: string | undefined = process.env.TWITTER_ACCESS_TOKEN_SECRET;

/**
 * Main function.
 * @returns `true` on success, `false` otherwise
 */
async function main(): Promise<boolean> {
	// Package file
	let packageContent: Promise<Buffer> = new Promise(function(resolve, reject) {
		readFile(join(__dirname, "..", "..", "..", "package.json"), (err, data) => {
			if (err === undefined) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});

	// Commander program
	let program: Command = new Command();

	// Version
	try {
		program.version(JSON.parse((await packageContent).toString()).version);
	} catch {
		// Gracefully exit; Node.js only application
		// eslint-disable-next-line no-console
		console.error("[\u001b[31mFAILED\u001b[0m] package.json is corrupted or not found");
		return false;
	}

	// Description
	program.description("Sends out a tweet.");

	// apiKey
	program.option(
		"-k, --twitter-api-key <TWITTER_API_KEY>",
		"api key, defaults to TWITTER_API_KEY environmental variable"
	);

	// secretKey
	program.option(
		"-s, --twitter-api-secret-key <TWITTER_API_SECRET_KEY>",
		"api secret key, defaults to TWITTER_API_SECRET_KEY environmental variable"
	);

	// accessToken
	program.option(
		"-t, --twitter-access-token <TWITTER_ACCESS_TOKEN>",
		"access token, defaults to TWITTER_ACCESS_TOKEN environmental variable"
	);

	// secret
	program.option(
		"-e, --twitter-access-token-secret <TWITTER_ACCESS_TOKEN_SECRET>",
		"access token secret, defaults to TWITTER_ACCESS_TOKEN_SECRET environmental variable"
	);

	// Send
	let commandMode: string = "default"; // Default mode
	let sendMessage: string | undefined = ""; // Empty string so that twitter hopefully refuses to post, if something went wrong
	program
		.command("send")
		.description("send a tweet")
		.option("-m, --message <message>", "message to send")
		.action(function(subProgram) {
			commandMode = "send";
			sendMessage = subProgram.message;
		});

	// Parse args
	program.parse(process.argv);

	// Set the auth
	const apiKey: string | undefined = program.twitterApiKey === undefined ? envTwitterApiKey : program.twitterApiKey;
	const apiSecretKey: string | undefined =
		program.twitterApiSecretKey === undefined ? envTwitterApiSecretKey : program.twitterApiSecretKey;
	const accessToken: string | undefined =
		program.twitterAccessToken === undefined ? envTwitterAccessToken : program.twitterAccessToken;
	const accessTokenSecret: string | undefined =
		program.twitterAccessTokenSecret === undefined ? envTwitterAccessTokenSecret : program.twitterAccessTokenSecret;

	// Check all values are set
	if (
		apiKey === undefined ||
		apiSecretKey === undefined ||
		accessToken === undefined ||
		accessTokenSecret === undefined
	) {
		// Gracefully exit; Node.js only application
		// eslint-disable-next-line no-console
		console.error("[\u001b[31mFAILED\u001b[0m] Authentication information missing");
		return false;
	}

	// Create new client
	let client: Twitter = new Twitter({
		// As in API
		// eslint-disable-next-line @typescript-eslint/camelcase
		access_token_key: accessToken,
		// As in API
		// eslint-disable-next-line @typescript-eslint/camelcase
		access_token_secret: accessTokenSecret,
		// As in API
		// eslint-disable-next-line @typescript-eslint/camelcase
		consumer_key: apiKey,
		// As in API
		// eslint-disable-next-line @typescript-eslint/camelcase
		consumer_secret: apiSecretKey
	});

	// Process sending and do sanity/value check
	switch (commandMode) {
		case "send":
			if (sendMessage === undefined) {
				// Gracefully exit; Node.js only application
				// eslint-disable-next-line no-console
				console.error("[\u001b[31mFAILED\u001b[0m] Neither message nor media was specified");
				return false;
			}
			try {
				console.log(sendMessage);
				send(client, sendMessage);
			} catch {
				return false;
			}
			break;
		default:
			// Gracefully exit; Node.js only application
			// eslint-disable-next-line no-console
			console.error(
				'[\u001b[31mFAILED\u001b[0m] Could not identify command to perform; Run "chirpchirp --help" for more information'
			);
			return false;
	}

	return true;
}

// Call the main and exit
main().then(function(success) {
	if (success === false) {
		process.exit(1);
	}
});
