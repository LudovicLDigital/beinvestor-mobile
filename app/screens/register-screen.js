import React, {Component} from "react";
import {
    Text,
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
import {showToast} from "../shared/util/ui-helpers";

export default class RegisterScreen extends Component {
    viewPager;
    userToRegister;
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            buttonStepTitle: 'Suivant',
            step1: false,
            step2: false,
            step3: false,
        };
        this.userToRegister = {};
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: appColors.white}}>
                <ViewPager
                    ref={(pager) => this.viewPager = pager}
                    style={{flex: 1}}
                    initialPage={0}
                    orientation={'horizontal'}
                    scroll={'scroll'}
                    onPageSelected={(e) => this.onPageSelected(e)}
                    showPageIndicator={true}>
                    <UserRegisterStep stepIsdone={this.state.step1} stepValue={(userValue) => this.setFirstStepValues(userValue)} key={"1"}/>
                    <UserInfoRegisterStep stepIsdone={this.state.step2} stepValue={(userData) => this.setSecondStepValues(userData)} key={"2"}/>
                    <AccountConfirmation stepIsdone={this.state.step3}  key={"3"}/>
                </ViewPager>
                <View style={[{padding: 10}, styles.flexRowAlignCenter, styles.flexRowBetween]}>
                    <Button
                        style={(this.state.page > 0 || this.state.page > 1) ? styles.backgroundSecondary : null}
                        disabled={(this.state.page <= 0 || this.state.page > 1)}
                        onPress={() => this.move(-1)}>Retour</Button>
                    <Button
                        style={this.state.page < 3 ? styles.backgroundPrimary : null}
                        disabled={this.state.page > 2}
                        onPress={() => this.move(1)}>{this.state.buttonStepTitle}</Button>
                </View>
            </View>
        )
    }

    onPageSelected(e: PageSelectedEvent) {
        this.setState({page: e.nativeEvent.position});
    };

    move(delta: number) {
        if (delta > 0) {
            switch (this.state.page) {
                case 0:
                    this.setState({
                        step1: true,
                        buttonStepTitle: 'Terminer'
                    });
                    break;
                case 1:
                    this.setState({
                        step2: true
                    });
                    break;
            }
        } else {
            switch (this.state.page) {
                case 2:
                    this.setState({
                        step2: false,
                        buttonStepTitle: 'Suivant'
                    });
                    break;
                case 3:
                    this.setState({
                        step3: false,
                        buttonStepTitle: 'Terminer'
                    });
                    break;
            }
        }
        const page = this.state.page + delta;
        this.go(page);
    };
    setFirstStepValues(userV) {
        this.userToRegister.mail = userV.mail;
        this.userToRegister.login = userV.login;
        this.userToRegister.password = userV.password;
    }
    setSecondStepValues(userV) {
        this.userToRegister.phone = userV.phone;
        this.userToRegister.userInfo = {};
        this.userToRegister.userInfo.firstName = userV.firstName;
        this.userToRegister.userInfo.lastName = userV.lastName;
        this.userToRegister.userInfo.birthDate = userV.birthDate;
        AuthService.register(this.userToRegister).then((user) => {
            console.log(user);
            if (user.id) {
                this.setState({
                    buttonStepTitle: 'Plus tard'
                });
            } else {
                this.go(1);
            }
        }).catch((error) => {
            console.error(error);
            this.setState({
                step2: false
            });
            showToast('L\'inscription a échoué');
        })
    }
    go(page: number) {
        if(this.viewPager) {
            this.viewPager.setPage(page);
        }
    };

}