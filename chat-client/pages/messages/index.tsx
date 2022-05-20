import { container } from "infrastructure";
import React, { useEffect } from "react";
import { MessageService, MessageResult } from "services";

type MessageProps = {
    message?: MessageResult;
}

type MessageState = {
    isLoading: boolean;
    data?: MessageResult;
    messages: MessageResult[];
    error: boolean;
    errorMessage?: string;
}

export default class Messages extends React.Component<MessageProps, MessageState> {
    messageService: MessageService = container.get(MessageService);
    state: MessageState = {
        isLoading: true,
        error: false,
        messages: [],
    };

    async componentDidMount(): Promise<void> {
        setInterval(() => {
            this.getMessage();
        }, 3000);
    }

    async getMessage(): Promise<void> {
        try {
            let task = this.messageService.getRandom();
            let message = await task;
            this.setState(previousState => ({
                isLoading: false,
                data: message,
                messages: Array.isArray(previousState?.messages) 
                    ? [...previousState.messages, message] 
                    : [message]
            }));
        } catch (ex) {
            this.setState({
                isLoading: false,
                error: true,
                errorMessage: ex.toString()
            });
        }
    }

    // static async getInitialProps(): Promise<any> {
    //     return {};
    // }

    render(): JSX.Element {
        const {isLoading, error, errorMessage, data, messages} = this.state;
        return (
            <div>
                {isLoading && <div>Loading...</div>}
                {isLoading && error && <div>Error {errorMessage}</div>}
                {!isLoading && !error && 
                    messages.map(m => (
                        <div>
                            <h3>{m.author}:</h3>
                            <p>
                                {m.message || m.title}
                            </p>
                        </div>
                    ))
                }
            </div>
        );
    }
}