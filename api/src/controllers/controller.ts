import { Router, RequestHandler, NextFunction, Response, Request } from "express";
import ServiceContainer from "../services/service-container";

/**
 * Classe gérant les contrôleurs.
 * 
 * Un contrôleur permet de gérer des routes / endpoints grâce à son routeur Express en traitant des requêtes et en envoyant des réponses.
 * Il peut s'occuper d'une action en particulier ou d'une ressource.
 * 
 * Chaque contrôleur doit hériter de cette classe.
 */
export default class Controller {

    protected readonly container: ServiceContainer;
    public readonly router: Router;
    public readonly rootPath: string;
    public readonly routes: Route[];

    /**
     * Construit un nouveau contrôleur.
     * 
     * @param container Conteneur de services
     * @param rootPath Route racine (exemple : `/polls` pour le contrôleur gérant la ressource `Poll`, ce qui donnera l'URL : `https://api.com/polls`)
     */
    protected constructor(container: ServiceContainer, rootPath: string) {
        this.container = container;
        this.router = this.createExpressRouter();
        this.rootPath = rootPath;
        this.routes = [];
    }

    /**
     * Enregistre une route.
     * 
     * Cette méthode doit être appelée dans le constructeur du contrôleur pour chaque route.
     * 
     * @param method Méthode HTTP
     * @param path Chemin
     * @param handlers Fonctions exécutées lorsque la route est déclenchée
     */
    protected registerRoute(method: Method, path: string, ...handlers: RequestHandler[]): void {
        this.router[method](path, handlers);
        this.routes.push({
            name: `${this.constructor.name}#${handlers[handlers.length - 1].name}`,
            method,
            path,
            handlers
        });
    }

    /**
     * Crée le routeur Express du contrôleur.
     * 
     * @returns Routeur Express créé
     */
    private createExpressRouter(): Router {
        return Router();
    }
}



/**
 * Interface gérant les routes.
 */
export interface Route {
    name: string;
    method: Method;
    path: string;
    handlers: RequestHandler[];
}



/**
 * Énumération regroupant les différentes méthodes HTTP.
 * 
 * Chaque clé de l'énumération contient comme valeur le nom de la fonction à exécuter sur le routeur Express.
 */
export enum Method {
    GET = 'get',
    POST = 'post',
    PATCH = 'patch',
    PUT = 'put',
    DELETE = 'delete'
}



/**
 * Interface regroupant les différents paramètres des requêtes.
 */
export interface RequestParams {
    id: string;
}