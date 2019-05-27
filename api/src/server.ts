import * as Express from 'express';
import bodyParser = require('body-parser');
import helmet = require('helmet');
import ServiceContainer from './services/service-container';
import Controller from './controllers/controller';
import PollController from './controllers/v1/poll-controller';

export default class Server {

    private static INSTANCE: Server;

    public static getInstance(): Server {
        if (!Server.INSTANCE) {
            Server.INSTANCE = new Server();
        }
        return Server.INSTANCE;
    }

    private readonly app: Express.Application;
    private readonly container: ServiceContainer;
    private readonly controllers: Controller[];

    public constructor() {
        this.app = this.createExpressApplication();
        this.container = this.createServiceContainer();
        this.controllers = this.createControllers();
    }

    public async start(port: number): Promise<void> {
        try {
            await this.container.db.connect();
            console.log('Connected to database');
        } catch (err) {
            console.error(err);
        }
        
        this.app.listen(port, () => console.log(`Server is listening on port ${port}`));
    }

    private createExpressApplication(): Express.Application {
        const app = Express();

        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(helmet());
        
        return app;
    }

    private createServiceContainer(): ServiceContainer {
        return new ServiceContainer();
    }

    private createControllers(): Controller[] {
        const controllers = [
            new PollController(this.container)
        ];

        // Ajout des routeurs Express de chaque contrôleur dans l'application Express
        for (const controller of controllers) {
            this.app.use(controller.rootPath, controller.router);
            
            console.log(`Routes for ${controller.rootPath} (${controller.constructor.name}) :`);
            for (const route of controller.routes) {
                console.log(`    - ${route.method.toUpperCase()} ${route.path} (${route.name})`);
            }
        }

        return controllers;
    }
}