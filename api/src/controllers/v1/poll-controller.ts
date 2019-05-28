import { Method, RequestParams } from "../controller";
import ServiceContainer from "../../services/service-container";
import { Request, Response } from "express";
import V1Controller from "./v1-controller";
import { PollAttributes } from "../../models/poll-model";

/**
 * Classe gérant le contrôleur de la resource `Poll`.
 */
export default class PollController extends V1Controller {

    /**
     * Construit un nouveau contrôleur de la resource `Poll`.
     * 
     * @param container Conteneur de services
     */
    public constructor(container: ServiceContainer) {
        super(container, '/polls');

        this.showAll = this.showAll.bind(this);
        this.show = this.show.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.destroy = this.destroy.bind(this);

        this.registerRoute(Method.GET, '/', this.showAll);
        this.registerRoute(Method.GET, '/:id', this.show);
        this.registerRoute(Method.POST, '/', this.create);
        this.registerRoute(Method.PUT, '/:id', this.update);
        this.registerRoute(Method.DELETE, '/:id', this.destroy);
    }

    /**
     * Affiche toutes les resources.
     * 
     * Méthode : `GET`
     * Chemin : `/polls`
     * 
     * @async
     * @param req Requête Express
     * @param res Réponse Express
     */
    public async showAll(req: Request, res: Response): Promise<any> {
        const polls = await this.container.db.polls.find();
        
        return res.status(200).json({ polls });
    }

    /**
     * Affiche une resource via son identifiant.
     * 
     * Méthode : `GET`
     * Chemin : `/polls/:id`
     * 
     * @async
     * @param req Requête Express
     * @param res Réponse Express
     */
    public async show(req: Request, res: Response): Promise<any> {
        const params: RequestParams = req.params;

        try {
            const poll = await this.container.db.polls.findById(params.id);

            if (poll !== null) {
                return res.status(200).json({ poll });
            }

            return res.status(404).json({ error: 'Poll not found' });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    /**
     * Crée une nouvelle resource.
     * 
     * Méthode : `POST`
     * Chemin : `/polls`
     * 
     * @async
     * @param req Requête Express
     * @param res Réponse Express
     */
    public async create(req: Request, res: Response): Promise<any> {
        const body: PollAttributes = req.body;

        try {
            const poll = await this.container.db.polls.create({
                title: body.title,
                options: body.options,
                choices: body.choices
            });

            return res.status(201).json({ poll });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
    
    /**
     * Crée une nouvelle resource.
     * 
     * Méthode : `PUT`
     * Chemin : `/polls/:id`
     * 
     * @async
     * @param req Requête Express
     * @param res Réponse Express
     */
    public async update(req: Request, res: Response): Promise<any> {
        const params: RequestParams = req.params;
        const body: PollAttributes = req.body;

        try {
            const poll = await this.container.db.polls.findById(params.id);

            poll.title = body.title;
            poll.options = body.options;
            poll.choices = body.choices;

            await poll.save();

            return res.status(200).json({ poll });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    /**
     * Supprime une resource.
     * 
     * Méthode : `DELETE`
     * Chemin : `/polls/:id`
     * 
     * @async
     * @param req Requête Express
     * @param res Réponse Express
     */
    public async destroy(req: Request, res: Response): Promise<any> {
        const params: RequestParams = req.params;

        try {
            const result = await this.container.db.polls.deleteOne({ _id: params.id });

            if (result.ok && result.n > 0) {
                return res.status(204).json();
            }

            return res.status(404).json({ error: 'Poll not found' });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
}