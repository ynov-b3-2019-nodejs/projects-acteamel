import { Mongoose, Model } from "mongoose";
import Service from "./service";
import ServiceContainer from "./service-container";
import createPollModel, { PollInstance } from "../models/poll-model";

/**
 * Classe gérant le service de la base de données.
 * 
 * Ce service permet d'intégarir avec la base de données.
 */
export default class DatabaseService extends Service {
    
    private readonly mongooseInstance: Mongoose;
    public readonly polls: Model<PollInstance>;

    /**
     * Construit un nouveau service de bases de données.
     * 
     * @param container Conteneur de services
     */
    public constructor(container: ServiceContainer) {
        super(container);
        this.mongooseInstance = this.createMongooseInstance();
        this.polls = createPollModel(this.mongooseInstance);
    }

    /**
     * Effectue une connexion vers la base de données.
     * 
     * La configuration de la connexion est géré dans les variables d'environnement :
     * - `DB_HOST`
     * - `DB_PORT`
     * - `DB_NAME`
     * 
     * @async
     */
    public async connect(): Promise<void> {
        await this.mongooseInstance.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, { useNewUrlParser: true });
    }

    /**
     * Effectue une déconnexion de la base de données.
     * 
     * @async
     */
    public async disconnect(): Promise<void> {
        await this.mongooseInstance.disconnect();
    }

    /**
     * Crée l'instance de Mongoose.
     * 
     * @returns Instance de Mongoose
     */
    private createMongooseInstance(): Mongoose {
        const mongooseInstance = new Mongoose();

        mongooseInstance.set('useCreateIndex', true);

        return mongooseInstance;
    }
}