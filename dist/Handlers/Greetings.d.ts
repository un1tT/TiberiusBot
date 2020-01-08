import { Handler } from './Handlers.interface';
export default class GreetingHandler implements Handler {
    successor: any;
    constructor(successor?: Handler);
    handleCommand(data: any): any;
}
