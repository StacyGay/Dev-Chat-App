import { container } from "infrastructure";
import React from "react";
import { MessageService } from "services";
import styles from "styles/messages.module.scss";
import { StringUtils } from "utilities/stringUtils";

type NewMessageProps = {

};

type NewMessageState = {
    input: string;
}

export class NewMessage extends React.Component<NewMessageProps, NewMessageState> {
    messageService: MessageService = container.get(MessageService);
    state: NewMessageState = {
        input: ""
    };

    constructor(props: NewMessageProps) {
        super(props);
        // this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({input: e.target.value});
    }

    handleKeyboard = (e: React.KeyboardEvent): void => {
        if (e.key != 'Enter') return;
        this.createNewMessage(this.state.input);
    }

    createNewMessage(message: string): void {
        if (!message) return;

        this.messageService.addMessage({
            id: StringUtils.newGuid(),
            author: "Me",
            message: this.state.input,
            me: true,
        });

        this.setState({input: ""});
    }

    render(): React.ReactNode {
        const {input} = this.state;

        return <div className={styles.inputArea}>
            {/* <input value={this.input} onInput={e => this.setInput(e.target)} /> */}
            <input value={input} onChange={this.handleChange} onKeyPress={this.handleKeyboard} />
            <button>+</button>
        </div>
    }
}