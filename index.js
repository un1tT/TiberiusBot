const TiberiusBot = require('./src/TiberiusBot');
const GreetingsHandler = require('./src/Handlers/Greetings');
const KekHandler = require('./src/Handlers/KekHandler');
const FeedHandler = require('./src/Handlers/Feed');

//Current handlers chain: Greetings -> Kek

const greetingsHandler = new GreetingsHandler();
const kekHandler = new KekHandler();
const feedHandler = new FeedHandler();
greetingsHandler.successor = kekHandler;
kekHandler.successor = feedHandler;
const handlers = [greetingsHandler,kekHandler, feedHandler]
const bot = new TiberiusBot(handlers);


