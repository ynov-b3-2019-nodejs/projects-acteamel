import Controller from "../controller";
import ServiceContainer from "../../services/service-container";

export default class V1Controller extends Controller {

    protected constructor(container: ServiceContainer, rootPath: string) {
        super(container, `/v1${rootPath}`);
    }
}