import * as Express from 'express';
import bodyParser = require('body-parser');
import helmet = require('helmet');
import cors = require('cors');
import ServiceContainer from './services/service-container';
import Controller from './controllers/controller';
import PollController from './controllers/v1/poll-controller';

/**
 * Classe gérant le serveur.
 * 
 * Cette classe est un singleton, l'accès se fait grâce à `Server.getInstance()`.
 */
export default class Server {

    private static INSTANCE: Server;

    /**
     * Retourne l'instance du serveur (singleton).
     * 
     * L'instance est créée lors du premier appel à cette méthode.
     */
    public static getInstance(): Server {
        if (!Server.INSTANCE) {
            Server.INSTANCE = new Server();
        }
        return Server.INSTANCE;
    }

    private readonly app: Express.Application;
    private readonly container: ServiceContainer;
    private readonly controllers: Controller[];

    /**
     * Construit un nouveau serveur.
     */
    private constructor() {
        this.app = this.createExpressApplication();
        this.container = this.createServiceContainer();
        this.controllers = this.createControllers();
    }

    /**
     * Démarre le serveur.
     * 
     * @async
     */
    public async start(): Promise<void> {
        try {
            await this.container.env.loadEnvironment();
        } catch (err) {
            console.error(err);
        }

        try {
            await this.container.db.connect();
            console.log('Connected to database');
        } catch (err) {
            console.error(err);
        }
        
        this.app.listen(process.env.API_PORT, () => console.log(`Server is listening on port ${process.env.API_PORT}`));

        this.container.socket.start();
        console.log(`WebSocket is listening on port ${process.env.WEBSOCKET_PORT}`)
    }

    /**
     * Crée l'application Express.
     * 
     * @returns Application Express créée
     */
    private createExpressApplication(): Express.Application {
        const app = Express();

        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(helmet());
        app.use(cors());
        
        return app;
    }

    /**
     * Crée le conteneur de services.
     * 
     * @returns Conteneur de services créé
     */
    private createServiceContainer(): ServiceContainer {
        return new ServiceContainer();
    }

    /**
     * Crée les contrôleurs.
     * 
     * Cette méthode crée également les routeurs Express (un par contrôleur) contenant les routes / endpoints.
     * 
     * @returns Contrôleurs créés
     */
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