import ServiceContainer from "./service-container";

/**
 * Classe gérant les services.
 * 
 * Chaque service doit hériter de cette classe.
 */
export default class Service {

    protected readonly container: ServiceContainer;

    /**
     * Construit un nouveau service.
     * 
     * @param container Conteneur de services
     */
    protected constructor(container: ServiceContainer) {
        this.container = container;
    }
}