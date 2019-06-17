import Service from "./service";
import ServiceContainer from "./service-container";
import * as io from 'socket.io';

/**
 * Classe gérant le service de WebSocket.
 */
export default class WebSocketService extends Service {

    /**
     * Construit un nouveau service de WebSocket.
     * 
     * @param container Conteneur de services
     */
    public constructor(container: ServiceContainer) {
        super(container);
    }

    /**
     * Démarre le WebSocket.
     * 
     * Le WebSocket écoute sur le port définit dans le fichier `.env`.
     */
    public start(): void {
        const socket = io();

        socket.on('connection', clientSocket => {
            let refreshVotersInterval: NodeJS.Timeout;

            clientSocket.on('will-refresh-voters', data => {
                refreshVotersInterval = setInterval(() => {
                    this.container.db.polls.findById(data.pollId).then(poll => {
                        clientSocket.emit(`refresh-voters-${poll._id}`, {
                            choices: poll.choices.map(choice => ({
                                    name: choice.name,
                                    count: choice.voters.length
                                }
                            ))
                        });
                    });
                }, 1000);
            });

            clientSocket.on('disconnect', () => clearInterval(refreshVotersInterval));
        });

        socket.listen(process.env.WEBSOCKET_PORT);
    }
}