import { container } from "infrastructure";
import { injectable } from "inversify";

@injectable()
export class MessageService {
    getMessageList(): string[] {
        return ["test1", "test2", "test3"];
    }
}

container.bind<MessageService>(MessageService).toSelf();