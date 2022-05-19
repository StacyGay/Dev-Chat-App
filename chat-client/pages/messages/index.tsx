import React from "react";

export default class Messages extends React.Component {
    static async getInitialProps(): Promise<any> {
        return {};
    }

    render(): JSX.Element {
        return <div>test</div>;
    }
}