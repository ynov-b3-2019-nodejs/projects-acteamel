import * as env from 'dotenv';
import Service from "./service";
import ServiceContainer from "./service-container";

export default class EnvironmentService extends Service {

    public constructor(container: ServiceContainer) {
        super(container);
    }

    public async loadEnvironment(): Promise<void> {
        const result = env.config();

        if (result.error) {
            throw result.error;
        }
    }
}