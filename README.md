# chirpchirp

Twitter cli via app authentication.

## About

Straightforward way of sending tweets, supporting multiline messages. Written natively in TypeScript.

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
	chirpchirp send --message <message>
	```

### Example

```bash
chirpchirp send --message "Hello, World!"
```

## Advanced usage

Command | Explanation
--- | ---
`chirpchirp send --message <message> --twitter-api-key "TWITTER_API_KEY" --twitter-api-secret-key "TWITTER_API_SECRET_KEY" --twitter-access-token "TWITTER_ACCESS_TOKEN" --twitter-access-token-secret "TWITTER_ACCESS_TOKEN_SECRET"` | Instead of using the environmental variables
`npx chirpchirp send --message <message>` | Running without installation
`chirpchirp --help` | To get all the available options

### Multiline messages for **nonglobal** installation

```powershell
$Message = "Beavers
Squirrels
Bears"

node node_modules/chirpchirp/build/release/index.js send --message $Message
```

#### Spaces and multiline support

`+`
: Working

`=`
: Non applicable

`!`
: Spaces work, multiline doesn't (workaround above)

`-`
: Not working (workaround above)

Command used | Global | Local| Not installed
--- | --- | --- | ---|
chirpchirp | + | = | =
chirpchirp (from script) | ! | ! | =
npx chirpchirp | - | - | !
npx chirpchirp (from script) | - | - | !
node index.js | + | + | =