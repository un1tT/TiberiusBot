const TiberiusBot = require('./TiberiusBot');
const GreetingsHandler = require('./Handlers/GreetingsHandler');
const KekHandler = require('./Handlers/KekHandler');
const FeedHandler = require('./Handlers/FeedHandler');

//Current handlers chain: Greetings -> Kek

const greetingsHandler = new GreetingsHandler();
const kekHandler = new KekHandler();
const feedHandler = new FeedHandler();
greetingsHandler.successor = kekHandler;
kekHandler.successor = feedHandler;
const handlers = [greetingsHandler,kekHandler]
const bot = new TiberiusBot(handlers);


