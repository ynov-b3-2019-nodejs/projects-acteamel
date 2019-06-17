import DatabaseService from "./database-service";
import EnvironmentService from "./environment-service";
import WebSocketService from "./websocket-service";

/**
 * Classe gérant le conteneur de services.
 * 
 * Le conteneur de services contient tous les services de l'API. Il permet d'accéder à ceux-ci un peu partout, notament dans les contrôleurs et dans les services eux-même.
 * Par défaut, un service est chargé lors de son premier appel.
 */
export default class ServiceContainer {

    private static readonly DEFAULT_OPTIONS: ServiceContainerOptions = {
        loadAll: false
    }

    private _env: EnvironmentService;
    private _db: DatabaseService;
    private _socket: WebSocketService;

    /**
     * Construit un nouveau conteneur de services.
     * 
     * @param options Options
     */
    public constructor(options: ServiceContainerOptions = ServiceContainer.DEFAULT_OPTIONS) {
        if (options.loadAll) {
            this.env;
            this.db;
            this.socket;
        }
    }

    /**
     * Service des variables d'environnement.
     */
    public get env() {
        if (!this._env) {
            this._env = new EnvironmentService(this);
            console.log(`Loaded service ${this._env.constructor.name}`);
        }
        return this._env;
    }

    /**
     * Service de la base de données.
     */
    public get db() {
        if (!this._db) {
            this._db = new DatabaseService(this);
            console.log(`Loaded service ${this._db.constructor.name}`);
        }
        return this._db;
    }

    /**
     * Service de WebSocket.
     */
    public get socket() {
        if (!this._socket) {
            this._socket = new WebSocketService(this);
            console.log(`Loaded service ${this._socket.constructor.name}`);
        }
        return this._socket;
    }
}



/**
 * Interface regroupant les différentes options du conteneur de services.
 */
export interface ServiceContainerOptions {
    loadAll?: boolean;
}