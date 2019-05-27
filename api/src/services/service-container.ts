import DatabaseService from "./database-service";

export default class ServiceContainer {

    private static readonly DEFAULT_OPTIONS: ServiceContainerOptions = {
        loadAll: false
    }

    private _db: DatabaseService;

    public constructor(options: ServiceContainerOptions = ServiceContainer.DEFAULT_OPTIONS) {
        if (options.loadAll) {
            this.db;
        }
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