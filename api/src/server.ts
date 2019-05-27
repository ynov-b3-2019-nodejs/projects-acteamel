import * as Express from 'express';

export default class Server {

    private static INSTANCE: Server;

    public static getInstance(): Server {
        if (!Server.INSTANCE) {
            Server.INSTANCE = new Server();
        }
        return Server.INSTANCE;
    }

    private readonly app: Express.Application;

    public constructor() {
        this.app = this.createExpressApplication();
    }

    public async start(port: number): Promise<void> {
        return new Promise<void>(resolve => {
            this.app.listen(port, () => resolve());
        });
    }

    private createExpressApplication(): Express.Application {
        const app = Express.application;
        return app;
    }
}