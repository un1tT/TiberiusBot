const TiberiusBot = require('./src/TiberiusBot');
const GreetingsHandler = require('./src/Handlers/Greetings');
const KekHandler = require('./src/Handlers/KekHandler');
const FeedHandler = require('./src/Handlers/Feed');
const IQHandler = require('./src/Handlers/IQ');
const createDB = require('./src/db/db');

//Current handlers chain: Greetings -> Kek
const db = createDB();
const greetingsHandler = new GreetingsHandler();
const kekHandler = new KekHandler();
const feedHandler = new FeedHandler();
const iqHandler = new IQHandler();
greetingsHandler.successor = kekHandler;
kekHandler.successor = feedHandler;
feedHandler.successor = iqHandler;
const handlers = [greetingsHandler, kekHandler, feedHandler]
const bot = new TiberiusBot(handlers);


