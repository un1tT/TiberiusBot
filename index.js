const TiberiusBot = require('./TiberiusBot');
const GreetingsHandler = require('./GreetingsHandler');
const KekHandler = require('./KekHandler');

//Current handlers chain: Greetings -> Kek

const greetingsHandler = new GreetingsHandler();
const kekHandler = new KekHandler();
greetingsHandler.successor = kekHandler;
const handlers = [greetingsHandler,kekHandler]
const bot = new TiberiusBot(handlers);


