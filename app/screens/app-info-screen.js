import React, {Component} from 'react';
import {styles} from "../shared/styles/global";
import {SafeAreaView} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';
import HeaderBar from '../component/subcomponent/header-bar';
import AppInfoMenu from "../component/app-info/app-info-menu";
import CGUComponent from "../component/app-info/cgu-component";
import {APP_INFO, CGU, ML} from "../shared/util/constants";
import MLComponent from "../component/app-info/ml-component";
import AppInfoComponent from "../component/app-info/app_info-component";

export default class AppInfoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            partShowed: null,
        }
    }

    componentDidMount(): void {
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <HeaderBar overrideBackPress={() => this.backPress()}
                           previousRoute={(this.state.partShowed !== null ? this.props.route.name : null)}
                           route={(this.state.partShowed !== null  ? this.state.partShowed : this.props.route.name)}
                           navigation={this.props.navigation}/>
                <Layout style={styles.fullScreen}>
                    {this.state.partShowed  === null && <AppInfoMenu clickedMenu={(menuClicked) => this._showInfo(menuClicked)}/>}
                    {this.state.partShowed === CGU && <CGUComponent/>}
                    {this.state.partShowed === ML && <MLComponent/>}
                    {this.state.partShowed === APP_INFO && <AppInfoComponent/>}
                </Layout>
            </SafeAreaView>
        );
    }
    /**
     * Display the corresponding details of the app infos with the passed part
     * @param infoToShow can be cgu, ml, app_info
     * @private
     */
    _showInfo(infoToShow) {
        this.setState({ partShowed: infoToShow})
    }
    /**
     * Override the headerbar back press to hide info part displayed
     */
    backPress() {
        if (this.state.partShowed !== null) {
            this.setState({partShowed: null});
        } else {
            this.props.navigation.goBack();
        }
    }
}