import { Method } from "../controller";
import ServiceContainer from "../../services/service-container";
import { Request, Response } from "express";
import V1Controller from "./v1-controller";

export default class PollController extends V1Controller {

    public constructor(container: ServiceContainer) {
        super(container, '/polls');

        this.showAll = this.showAll.bind(this);
        this.show = this.show.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.destroy = this.destroy.bind(this);

        this.bindRoute(Method.GET, '/', this.showAll);
        this.bindRoute(Method.GET, '/:id', this.show);
        this.bindRoute(Method.POST, '/', this.create);
        this.bindRoute(Method.PUT, '/:id', this.update);
        this.bindRoute(Method.DELETE, '/:id', this.destroy);
    }

    public async showAll(req: Request, res: Response): Promise<any> {
        const polls = await this.container.db.polls.find();
        
        return res.status(200).json({ polls });
    }

    public async show(req: Request, res: Response): Promise<any> {
        const params: {
            id: string;
        } = req.params;

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

    public async create(req: Request, res: Response): Promise<any> {
        const body: {
            title: string;
        } = req.body;

        try {
            const poll = await this.container.db.polls.create({
                title: body.title
            });

            return res.status(201).json({ poll });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    public async update(req: Request, res: Response): Promise<any> {
        const params: {
            id: string;
        } = req.params;
        const body: {
            title: string;
        } = req.body;

        try {
            const poll = await this.container.db.polls.findById(params.id);

            if (body.title !== undefined) {
                poll.title = body.title;
            }

            await poll.save();

            return res.status(200).json({ poll });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    public async destroy(req: Request, res: Response): Promise<any> {
        const params: {
            id: string;
        } = req.params;

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