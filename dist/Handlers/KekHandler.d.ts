import { Handler } from './Handlers.interface';
export default class KekHandler implements Handler {
    successor: any;
    constructor(successor?: Handler);
    handleCommand(data: any): any;
}
