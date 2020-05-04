import React, {Component} from "react";
import {
    View
} from "react-native";
import { Button } from '@ui-kitten/components';
import {styles, appColors} from "../shared/styles/global";
import ViewPager from '@react-native-community/viewpager';
import UserRegisterStep from "../component/register/user-step";
import UserInfoRegisterStep from "../component/register/user-info-step";
import AccountConfirmation from "../component/register/account-confirmation";
import {PageSelectedEvent} from "@react-native-community/viewpager/js/types";
import AuthService from "../shared/services/auth";
import {showInfoAlert, showToast} from "../shared/util/ui-helpers";
import Loader from "../component/subcomponent/loader";

export default class RegisterScreen extends Component {
    viewPager;
    userToRegister;
    formHasErrorStep1: false;
    formHasErrorStep2: false;
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            step1: false,
            step2: false,
            awaitCreate: false,
            userMail: null,
            loaderHeight: null,
        };
        this.userToRegister = {};
        this.viewPager = React.createRef();
    }
    setErrorOnForm(stepError, value) {
        switch (stepError) {
            case 1:
                this.formHasErrorStep1 = value;
                this.setState({
                    step1: !value
                });
                break;
            case 2:
                this.formHasErrorStep2 = value;
                this.setState({
                    step2: !value
                });
                break;
        }
    }
    render() {
        return (
            <View style={{flex: 1, backgroundColor: appColors.white}} onLayout={(event) => { this._setEndViewForLoader(event.nativeEvent.layout) }}>
                <Loader isDisplayed={this.state.awaitCreate} parentHeight={this.state.loaderHeight} loadTitle={'Création de votre compte...'}/>
                <ViewPager
                    ref={this.viewPager}
                    style={{flex: 1}}
                    initialPage={0}
                    orientation={'horizontal'}
                    scroll={'scroll'}
                    scrollEnabled={false}
                    onPageSelected={(e) => this.onPageSelected(e)}
                    showPageIndicator={true}>
                    <UserRegisterStep stepIsdone={this.state.step1} hasError={(hasError) => this.setErrorOnForm(1, hasError)} stepValue={(userValue) => this.setFirstStepValues(userValue)} key={"1"}/>
                    <UserInfoRegisterStep stepIsdone={this.state.step2} hasError={(hasError) => this.setErrorOnForm(2, hasError)} stepValue={(userData) => this.setSecondStepValues(userData)} key={"2"}/>
                    <AccountConfirmation navigationSys={this.props.navigation} mail={this.state.userMail}  key={"3"}/>
                </ViewPager>
                <View style={[{padding: 10}, styles.flexRowAlignCenter, styles.flexRowBetween]} >
                    <Button
                        style={(this.state.page > 0) ? styles.backgroundSecondary : null}
                        disabled={(this.state.page <= 0 || this.state.awaitCreate)}
                        onPress={() => this.move(-1)}>{this.state.page < 2 ? 'Retour' : 'Plus Tard'}</Button>
                    <Button
                        style={[(this.state.page < 3 ? styles.backgroundPrimary : null), {display: (this.state.page >= 2 ? 'none' : null)}]}
                        disabled={(this.state.page > 2 || this.state.awaitCreate)}
                        onPress={() => this.move(1)}>{'Suivant'}</Button>
                </View>
            </View>
        )
    }


    _setEndViewForLoader(layout) {
        const {height} = layout;
        this.setState({
            loaderHeight: height
        })
    }
    onPageSelected(e: PageSelectedEvent) {
        this.setState({page: e.nativeEvent.position});
    };

    async move(delta: number) {
        switch (this.state.page) {
            case 0:
                await this.setState({step1: delta > 0});
                break;
            case 1:
                await this.setState({step2: delta > 0});
                break;
        }
        const page = this.state.page + delta;
        if (this.state.page >= 2 && delta < 0) {
            this._ignoreConfirmationConnectUser()
        } else if (this.state.page > 0 && this.state.page < 2 && delta < 0) {
                this.go(page);
        }
    };
    setFirstStepValues(userV) {
        this.userToRegister.mail = userV.mail;
        this.userToRegister.login = userV.login;
        this.userToRegister.password = userV.password;
        if (!this.formHasErrorStep1) {
            this.setState({step1: true, userMail: this.userToRegister.mail});
            this.go(1);
        }
    }
    setSecondStepValues(userV) {
        this.setState({step2: true, awaitCreate: true});
        this.userToRegister.phone = userV.phone;
        this.userToRegister.userInfo = {};
        this.userToRegister.userInfo.firstName = userV.firstName;
        this.userToRegister.userInfo.lastName = userV.lastName;
        this.userToRegister.userInfo.birthDate = userV.birthDate;
        if (!this.formHasErrorStep2) {
            this._validateAndSaveData();
            this.go(2);
        }
    }
    _validateAndSaveData() {
        if (this.userToRegister.mail && this.userToRegister.login && this.userToRegister.password && !this.formHasErrorStep1 && !this.formHasErrorStep2) {
            AuthService.register(this.userToRegister).then((response) => {
                if (response.id) {
                    this.setState({
                        awaitCreate: false
                    });
                } else {
                    showInfoAlert(response.message);
                    this.setState({
                        awaitCreate: false,
                        step1: false,
                        step2: false
                    });
                    this.go(0);
                }
            }).catch((error) => {
                console.error(error);
                this.setState({
                    step2: false,
                    awaitCreate: false
                });
                showToast('L\'inscription a échoué');
            });
        } else {
            showToast('Certains champs sont invalides et/ou requis')
        }
    }
    go(page: number) {
        if(this.viewPager.current) {
            this.viewPager.current.setPage(page);
        }
    };

    _ignoreConfirmationConnectUser() {
        this.props.navigation.popToTop();
    }
}