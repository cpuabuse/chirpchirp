/*
	File: src/send.ts
	cpuabuse.com
*/

/**
 * Logic for sending a tweet.
 */

import Twitter from "twitter";

/**
 * Sends a tweet.
 * @param status A tweet
 */
export async function send(client: Twitter, status: string): Promise<void> {
	return new Promise(function(resolve, reject) {
		client.post("statuses/update", { status }, function(err) {
			if (err === null) {
				// Node only use
				// eslint-disable-next-line no-console
				console.log(`[  \u001b[32mOK\u001b[0m  ] Successfully sent a status update:\n${status}`);
				resolve();
			} else {
				// Node only use
				// eslint-disable-next-line no-console
				console.error("[\u001b[31mFAILED\u001b[0m] Could not perform send command");
				// Node only use
				// eslint-disable-next-line no-console
				console.error(err);
				reject();
			}
		});
	});
}
