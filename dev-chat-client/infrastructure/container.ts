import { Container } from "inversify";
import "reflect-metadata";
import { MessageService } from "services/message-service";

const container = new Container();
container.bind(MessageService).toSelf().inSingletonScope();

export { container };