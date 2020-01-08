import { Handler } from './Handlers.interface';
export default class IQHandler implements Handler {
    successor: any;
    constructor(successor?: Handler);
    handleCommand(data: any): any;
    countIQ(username: any): any;
}
