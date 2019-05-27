import { Router, RequestHandler } from "express";
import ServiceContainer from "../services/service-container";

export default class Controller {

    protected readonly container: ServiceContainer;
    public readonly router: Router;
    public readonly rootPath: string;
    public readonly routes: Route[];

    protected constructor(container: ServiceContainer, rootPath: string) {
        this.container = container;
        this.router = this.createExpressRouter();
        this.rootPath = rootPath;
        this.routes = [];
    }

    protected bindRoute(method: Method, path: string, ...handlers: RequestHandler[]): void {
        this.router[method](path, handlers);
        this.routes.push({
            name: `${this.constructor.name}#${handlers[handlers.length - 1].name}`,
            method,
            path,
            handlers
        });
    }

    private createExpressRouter(): Router {
        return Router();
    }
}



export interface Route {
    name: string;
    method: Method;
    path: string;
    handlers: RequestHandler[];
}



export enum Method {
    GET = 'get',
    POST = 'post',
    PATCH = 'patch',
    PUT = 'put',
    DELETE = 'delete'
}