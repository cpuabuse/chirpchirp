# chirpchirp

Twitter cli via app authentication.

## About

Straightforward way of sending, supporting multiline messages. Written natively in TypeScript.

## Prerequisites

- [Node.js version 10 or higher](https://nodejs.org/en/download/)

## Installation

```bash
npm install chirpchirp --global
```

## Usage

1. Create a [twitter app](https://apps.twitter.com/) and generate keys
1. Set the environmental variables
	```bash
	export TWITTER_API_KEY="TWITTER_API_KEY"
	export TWITTER_API_SECRET_KEY="TWITTER_API_SECRET_KEY"
	export TWITTER_ACCESS_TOKEN="TWITTER_ACCESS_TOKEN"
	export TWITTER_ACCESS_TOKEN_SECRET="TWITTER_ACCESS_TOKEN_SECRET"
	```
1. Tweet
	```bash
	chirpchirp send <message>
	```

### Example

```bash
chirpchirp send "Hello, World!"
```

## Advanced usage

Command | Explanation
--- | ---
`	chirpchirp send --twitter-api-key "TWITTER_API_KEY" --twitter-api-secret-key "TWITTER_API_SECRET_KEY" --twitter-access-token "TWITTER_ACCESS_TOKEN" --twitter-access-token-secret "TWITTER_ACCESS_TOKEN_SECRET" <message>` | Instead of using the environmental variables
`npx chirpchirp send <message>` | Running without installation
`chirpchirp --help` | To get all the available options