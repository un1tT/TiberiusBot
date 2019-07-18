# TiberiusBot


Superior chat-bot for your twitch.tv channel!

## Getting Started

Follow these instructions to run TiberiusBot on your local machine:

### Prerequisites

1. Download and install [NodeJS](www.nodejs.org);
2. Install all dependencies. In project folder run:

```
npm install
```

3. Type your channel in  /src/constants/auth.js

```
const CHANNELS = ['YOUR_CHANNEL_NAME'];
```

You can use TiberiusBot for multiple channels like this:

```
const CHANNELS = ['YOUR_CHANNEL_NAME_1', 'YOUR_CHANNEL_NAME_2', 'YOUR_CHANNEL_NAME_3'];
```

### Running

In project folder run:


```
node .
```

Done! Check out your channel and enjoy!


## Commands

* `!feed` - bot sends to user random feed from [Habr](www.habr.com) (note, that all feeds are in Russian)
* `!iq` - bot calculates user's IQ;
* `!kek` - bot answers with 'LOL. This is test command and will be removed in future versions;

* Bot answers to user after messages like "hi!" or "привет".

## Versioning

Please make your contributions, bring new ideas and submit issues. These makes Tiberius stronger!

## Authors

* **Vasiliy Shchukin** - *Initial work* - [Un1t](https://github.com/TiberiusBot)

See also the list of [contributors](https://github.com/un1tT/TiberiusBot/contributors) who participated in this project.

