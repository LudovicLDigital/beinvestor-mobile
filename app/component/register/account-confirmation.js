import React, {Component} from "react";
import {
    View,
    TouchableWithoutFeedback
} from "react-native";
import {styles, appColors, deviceWidth, deviceHeigth} from "../../shared/styles/global";
import InputField from '../subcomponent/form/input-field';
import { Text, Layout, Button, Icon} from '@ui-kitten/components';
import SectionDivider from '../../component/subcomponent/form/section-divider';
import AuthService from "../../shared/services/auth";
import {showInfoAlert, showToast} from "../../shared/util/ui-helpers";
const RefreshIcon = (style) => (
    <Icon name='refresh' {...style} />
);
/**
 * PROPS :
 * - mail : the user email linked
 * - navigationSys : the parent navigation
 * - route: the actual route with params
 */
export default class AccountConfirmation extends Component {
    haveChange: false;
    constructor(props) {
        super(props);
        this.state = {
            activationCode: null,
            mail: null
        };
        this._resendACode = this._resendACode.bind(this);
        this._activateAccount = this._activateAccount.bind(this);
    }

    componentDidMount(): void {
        this.setState({mail: this.props.mail});
        if (this.props.route && this.props.route.params) {
            const activationCode = this.props.route.params.activationCode;
            if (activationCode) {
                this.setState({activationCode: activationCode});
            }
        }
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        if (this.state.mail !== this.props.mail && !this.haveChange) {
            this.setState({mail: this.props.mail});
        }
    }

    render() {
        return (
            <Layout style={[{flex: 1, padding: 15, backgroundColor: appColors.white,}]}>
                <SectionDivider sectionName={'Activation du compte'}/>
                <Text  style={{textAlign: 'center', margin: deviceWidth/25}}>Veuillez rentrer le code d'activation reçu par mail ici</Text>
                <InputField style={{marginBottom: deviceHeigth/8}}
                    label={'Email'}
                            value={this.state.mail}
                            type={'email-address'}
                            validationRegex={/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/}
                            messageErrors={[['required', 'L\'email est requis'], ['pattern', 'L\'email n\'est pas valide']]}
                            onTextChange={(text) => this._changeMail(text)}/>
                <InputField style={{marginBottom: deviceHeigth/5}}
                            label={'Code d\'activation'}
                            value={this.state.activationCode}
                            onTextChange={(text) => this.setState({activationCode: text})}/>
                <Button style={{marginBottom: deviceHeigth/10}} appearance={'ghost'} status={'info'} icon={RefreshIcon} onPress={this._resendACode}>Je n'ai pas reçu de code, m'en renvoyer un</Button>
                <Button style={styles.backgroundSecondary} onPress={this._activateAccount}>Activation du compte</Button>
            </Layout>
        )
    }
    _changeMail(text) {
        this.haveChange = true;
        this.setState({mail: text})
    }
    _resendACode() {
        AuthService.resendActivation(this.state.mail).then((response) => {
            if (response === 202) {
                showToast('Code envoyé');
            } else {
                showInfoAlert(response.message);
            }
        });
    }
    _activateAccount() {
        const email = this.state.mail === null ? this.props.mail : this.state.mail;
        AuthService.activate(this.state.activationCode, email).then((response) => {
            if (!response.status) {
                this.props.navigationSys.popToTop();
                showToast('Compte activé, connectez vous');
            } else {
                showInfoAlert(response.message);
            }
        }).catch((error) => {
            console.error('ERROR AuthService.activate');
            console.error(error);
        });
    }
}