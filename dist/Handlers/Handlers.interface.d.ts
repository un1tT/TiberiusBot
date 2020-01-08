export interface Handler {
    handleCommand: (data: string) => string;
    successor?: Handler;
}
