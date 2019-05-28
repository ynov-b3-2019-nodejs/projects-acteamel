import { Mongoose, Model } from "mongoose";
import Service from "./service";
import ServiceContainer from "./service-container";
import createPollModel, { PollInstance } from "../models/poll-model";

export default class DatabaseService extends Service {
    
    private readonly mongooseInstance: Mongoose;
    public readonly polls: Model<PollInstance>;

    public constructor(container: ServiceContainer) {
        super(container);
        this.mongooseInstance = this.createMongooseInstance();
        this.polls = createPollModel(this.mongooseInstance);
    }

    public async connect(): Promise<void> {
        await this.mongooseInstance.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, { useNewUrlParser: true });
    }

    public async disconnect(): Promise<void> {
        await this.mongooseInstance.disconnect();
    }

    private createMongooseInstance(): Mongoose {
        const mongooseInstance = new Mongoose();

        mongooseInstance.set('useCreateIndex', true);

        return mongooseInstance;
    }
}