import DatabaseService from "./database-service";
import EnvironmentService from "./environment-service";

export default class ServiceContainer {

    private static readonly DEFAULT_OPTIONS: ServiceContainerOptions = {
        loadAll: false
    }

    private _env: EnvironmentService;
    private _db: DatabaseService;

    public constructor(options: ServiceContainerOptions = ServiceContainer.DEFAULT_OPTIONS) {
        if (options.loadAll) {
            this.env;
            this.db;
        }
    }

    public get env() {
        if (!this._env) {
            this._env = new EnvironmentService(this);
            console.log(`Loaded service ${this._env.constructor.name}`);
        }
        return this._env;
    }

    public get db() {
        if (!this._db) {
            this._db = new DatabaseService(this);
            console.log(`Loaded service ${this._db.constructor.name}`);
        }
        return this._db;
    }
}



export interface ServiceContainerOptions {
    loadAll?: boolean;
}