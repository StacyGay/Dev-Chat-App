import { container } from "infrastructure";
import React, { useEffect, useRef } from "react";
import { MessageService, MessageResult } from "services";
import styles from 'styles/messages.module.scss'

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

export default class MessagesIndex extends React.Component<MessageProps, MessageState> {
    messageService: MessageService = container.get(MessageService);
    state: MessageState = {
        isLoading: true,
        error: false,
        messages: [],
    };

    messagesContainerRef: React.MutableRefObject<HTMLDivElement>;
    private _messageStreamSet: boolean;

    constructor(props: MessageProps) {
        super(props);

        this.messagesContainerRef  = React.createRef();
    }

    async componentDidMount(): Promise<void> {
        if (!this._messageStreamSet) {
            this.setRandomInterval(() => {
                this.getMessage();
            }, 500, 5000);
            this._messageStreamSet = true;
        }

        this.scrollToBottom();
    }

    componentDidUpdate(): void {
        this.scrollToBottom();
    }

    setRandomInterval(intervalFunction: () => any, minDelay: number, maxDelay: number) {
        let timeout: NodeJS.Timeout;
      
        const runInterval = () => {
          const timeoutFunction = () => {
            intervalFunction();
            runInterval();
          };
      
          const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
      
          timeout = setTimeout(timeoutFunction, delay);
        };
      
        runInterval();
      
        return {
          clear() { clearTimeout(timeout) },
        };
      };

    async getMessage(): Promise<void> {
        try {
            let task = this.messageService.getMessage();
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

    
    scrollToBottom(): void {
        this.messagesContainerRef!.current!.scrollTop = this.messagesContainerRef!.current!.scrollHeight;
    }

    render(): JSX.Element {
        const {isLoading, error, errorMessage, data, messages} = this.state;
        return (
            <div id={'messagesContainer'} ref={this.messagesContainerRef} className={styles.messagesContainer}>
                {isLoading && <div>Loading...</div>}
                {isLoading && error && <div>Error {errorMessage}</div>}
                {!isLoading && !error && 
                    messages.map(m => (
                        <div key={m.id} className={styles.messageCard}>
                            <h2 className={styles.messageAuthor}>{m.author}:</h2>
                            <p className={styles.messageBody}>
                                {m.message || m.title}
                            </p>
                        </div>
                    ))
                }
            </div>
        );
    }
}