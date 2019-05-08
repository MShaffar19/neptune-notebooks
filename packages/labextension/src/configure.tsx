import {ReactElementWidget, ToolbarButtonComponent} from '@jupyterlab/apputils';
import {NeptuneConnection, setGlobalApiToken} from "./connection";
import {NeptuneConnectionInfoDialog} from "./dialog";
import {NeptuneContent} from "./content";
import {NeptuneSession} from "./kernel";
import * as React from "react";

export class NeptuneConfigure extends ReactElementWidget {

    constructor(content: NeptuneContent, session: NeptuneSession, connection: NeptuneConnection) {
        super(<ConfigureButton content={content} session={session} connection={connection}/>);
    }

}

class ConfigureButton extends React.Component<ConfigureButtonProps, ConfigureButtonState> {

    constructor(props: Readonly<ConfigureButtonProps>) {
        super(props);
        this.state = {
            isConfigurationValid: false
        };
        this.validateConfiguration();
    }

    render(): React.ReactElement<any> {
        let label = null;
        if (!this.state.isConfigurationValid) {
            label = 'Configure'
        }
        return (
            <ToolbarButtonComponent className='btn-neptune-configure'
                                    label={label}
                                    onClick={this.onConnectButtonClick}
                                    tooltip='Connect to Neptune'/>
        );
    }

    private validateConfiguration = () => {
        let {connection, content} = this.props;
        content.validateMetadata()
            .then(() => connection.validate())
            .then(() => this.setState({isConfigurationValid: true}))
            .catch(() => this.setState({isConfigurationValid: false}));
    };

    private onConnectButtonClick = () => {
        let {content, session, connection} = this.props;
        new NeptuneConnectionInfoDialog(content, session, connection.getParams())
            .show()
            .then(params => {
                if (params !== null) {
                    connection.setParams(params);
                    setGlobalApiToken(params.apiToken);
                    return content.updateMetadata({
                        notebookId: params.notebookId
                    }).then(() => this.validateConfiguration());
                }
            });
    };

}

interface ConfigureButtonProps {

    content: NeptuneContent;
    session: NeptuneSession;
    connection: NeptuneConnection;

}

interface ConfigureButtonState {

    isConfigurationValid: boolean;

}
