import { Method } from "../controller";
import ServiceContainer from "../../services/service-container";
import { Request, Response } from "express";
import V1Controller from "./v1-controller";
import { PollInstance } from "../../models/poll-model";

/**
 * Classe gérant le contrôleur de la ressource `Poll`.
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
        this.addVoter = this.addVoter.bind(this);

        this.registerRoute(Method.GET, '/', this.showAll);
        this.registerRoute(Method.GET, '/:id', this.show);
        this.registerRoute(Method.POST, '/', this.create);
        this.registerRoute(Method.PATCH, '/:id/choices/:choiceId/addVoter', this.addVoter);
    }

    /**
     * Affiche tous les sondages.
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
     * Affiche un sondage via son identifiant.
     * 
     * Cette méthode est un handler :
     * - Méthode : `GET`
     * - Chemin : `/polls/:id`
     * 
     * @async
     * @param req Requête Express
     * @param res Réponse Express
     */
    public async show(req: Request, res: Response): Promise<any> {
        const params = req.params;

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
     * Crée un nouveau sondage.
     * 
     * Cette méthode est un handler :
     * - Méthode : `POST`
     * - Chemin : `/polls`
     * 
     * @async
     * @param req Requête Express
     * @param res Réponse Express
     */
    public async create(req: Request, res: Response): Promise<any> {
        const body = req.body;

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
     * Ajoute un voteur à un choix d'un sondage.
     * 
     * Cette méthode est un handler :
     * - Méthode : `PATCH`
     * - Chemin : `/polls/:id/choice/:choiceId`
     * 
     * @async
     * @param req Requête Express
     * @param res Réponse Express
     */
    public async addVoter(req: Request, res: Response): Promise<any> {
        const params = req.params;

        try {
            const poll = await this.container.db.polls.findById(params.id);
            const choice = poll.choices.find(choice => choice._id.toString() === params.choiceId);
            
            if (poll.options.ipChecking && this.containsIp(poll, req.ip)) {
                return res.status(403).json({ error: 'You have already voted' });
            }

            choice.voters.push({ ip: req.ip });
            await poll.save();

            return res.status(200).json({ poll });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    /**
     * Vérifie si une IP a déjà vôté au sondage spécifié.
     * 
     * @param poll Sondage à vérifier
     * @param ip IP à vérifier
     * @returns Vrai si l'IP a déjà voté, faux autrement
     */
    private containsIp(poll: PollInstance, ip: string): boolean {
        for (const choice of poll.choices) {
            for (const voter of choice.voters) {
                if (voter.ip === ip) {
                    return true;
                }
            }
        }
        return false;
    }
}