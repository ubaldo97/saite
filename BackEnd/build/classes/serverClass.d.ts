declare class Server {
    private _app;
    private _puerto;
    constructor();
    private config;
    private routes;
    start(): void;
}
declare const server: Server;
export default server;
