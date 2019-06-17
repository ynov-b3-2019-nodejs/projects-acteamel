import Controller from "../controller";
import ServiceContainer from "../../services/service-container";

/**
 * Classe gérant le contrôleur de la version 1 de l'API.
 * 
 * Ce contrôleur ajoute seulement un élément dans la route racine. Les contrôleurs de la version 1 doivent hériter de cette classe.
 */
export default class V1Controller extends Controller {

    /**
     * Construit un nouveau contrôleur de la version 1 de l'API.
     * 
     * @param container Conteneur de services
     * @param rootPath Route racine (exemple : `/polls` pour le contrôleur gérant la ressource `Poll`, ce qui donnera l'URL : `https://api.com/polls`)
     */
    protected constructor(container: ServiceContainer, rootPath: string) {
        super(container, `/v1${rootPath}`);
    }
}