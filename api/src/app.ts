import Server from './server';

const port = 8080;

Server.getInstance().start(port).then(() => console.log(`Server is listening on port ${port}`));