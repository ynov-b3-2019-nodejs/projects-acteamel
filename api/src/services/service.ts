import ServiceContainer from "./service-container";

export default class Service {

    protected readonly container: ServiceContainer;

    protected constructor(container: ServiceContainer) {
        this.container = container;
    }
}