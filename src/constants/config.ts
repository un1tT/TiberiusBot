import IQHandler from "../Handlers/IQ";
import FeedHandler from "../Handlers/Feed";
import KekHandler from "../Handlers/KekHandler";
import GreetingsHandler from "../Handlers/Greetings";

const iqHandler = new IQHandler();
const feedHandler = new FeedHandler(iqHandler);
const kekHandler = new KekHandler(feedHandler);
const greetingsHandler = new GreetingsHandler(kekHandler);

export const handlers = [greetingsHandler, kekHandler, feedHandler];
