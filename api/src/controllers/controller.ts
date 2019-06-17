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
    public readonly endpoints: Endpoint[];

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
        this.endpoints = [];
    }

    /**
     * Enregistre un endpoint.
     * 
     * Cette méthode doit être appelée dans le constructeur du contrôleur pour chaque endpoint.
     * 
     * @param method Méthode HTTP
     * @param path Chemin
     * @param handlers Fonctions exécutées lorsque l'endpoint est déclenché
     */
    protected registerEndpoint(method: Method, path: string, ...handlers: RequestHandler[]): void {
        this.router[method](path, this.triggerEndpointHandler, handlers);
        this.endpoints.push({
            name: `${this.constructor.name}#${handlers[handlers.length - 1].name}`,
            method,
            path,
            handlers
        });
    }

    /**
     * Log un message d'information lorsqu'un endpoint est déclenché.
     * 
     * À chaque fois qu'un utilisateur va appeler l'API, sa requête sera loggée.
     * 
     * Cette méthode est un handler.
     * 
     * @param req Requête Express
     * @param res Réponse Express
     * @param next Handler suivant
     */
    private async triggerEndpointHandler(req: Request, res: Response, next: NextFunction): Promise<any> {
        console.log(`Triggered handler ${req.method} ${req.originalUrl} from ${req.ip}`);
        return next();
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
 * Interface gérant les endpoints.
 */
export interface Endpoint {
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