import ServiceContainer from "./service-container";

export default class Service {

    protected readonly container: ServiceContainer;

    public constructor(container: ServiceContainer) {
        this.container = container;
    }
}