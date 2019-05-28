import * as env from 'dotenv';
import Service from "./service";
import ServiceContainer from "./service-container";

/**
 * Classe gérant le service des variables d'environnement.
 */
export default class EnvironmentService extends Service {

    /**
     * Construit un nouveau service des variables d'environnement.
     * 
     * @param container Conteneur de services
     */
    public constructor(container: ServiceContainer) {
        super(container);
    }

    /**
     * Charge les variables d'environnement depuis le fichier `.env` à la racine du projet.
     * 
     * @async
     */
    public async loadEnvironment(): Promise<void> {
        const result = env.config();

        if (result.error) {
            throw result.error;
        }
    }
}