import { container } from "infrastructure";
import { injectable } from "inversify";

const subreddits = [
    "experienceddevs",
    "csharp",
    "angular",
    "javascript",
    "golang",
    "react",
    "node",
    "mongodb",
    "dotnet",
    "programmerhumor",
    "python",
    "linux",
    "programming",
    "technology",
    "webdev",
    "askprogramming",
    "startups",
    "cscareerquestions",
    "telecommuting",
    "cstheory",
];

interface RedditData {
    kind: string;
    data: RedditObjectData;
}

interface RedditObjectData {
    children?: RedditData[];
    subreddit?: string;
    title?: string;
    body?: string;
    ups?: number;
    downs?: number;
    author?: string;
    url?: string;
    permalink?: string;
}

export interface MessageResult {
    author: string;
    title: string;
    message: string;
    ups?: number;
    downs?: number;
}

@injectable()
export class MessageService {
    getMessageList(): string[] {
        return ["test1", "test2", "test3"];
    }

    async getRandom(): Promise<MessageResult> {
        let subreddit = this.getRandomArrayValue(subreddits);
        let postResponse = await fetch(`https://www.reddit.com/r/${subreddit}/.json`);
        let postData = (<RedditData>(await postResponse.json())).data;
        let post = this.getRandomArrayValue(postData.children).data;
        let commentResponse = await fetch(`https://www.reddit.com${post.permalink}.json`);
        let commentData = (<RedditData[]>(await commentResponse.json()))
            .filter(d => d.data.children && d.data.children.length > 0);
        let comment = this.getRandomArrayValue(commentData).data.children[0].data;

        return {
            author: comment.author,
            title: comment.title,
            message: comment.body,
            ups: comment.ups ?? 1,
            downs: comment.downs ?? 0
        };
    }

    private getRandomArrayValue<T>(array: T[]): T {
        return array[Math.floor((Math.random()*array.length))];
    }
}