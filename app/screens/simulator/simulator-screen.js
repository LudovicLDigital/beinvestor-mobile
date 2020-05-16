import React, { Component } from 'react';
import {styles, appColors} from "../../shared/styles/global";
import { SafeAreaView, View} from 'react-native';
import { Text, Layout} from '@ui-kitten/components';
import HeaderBar from '../../component/subcomponent/header-bar';
import SimulatorMenu from "../../component/simulator/simulator-menu";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {BANK, ESTATE, FISCALITY} from "../../shared/util/constants";
export default class SimulatorScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditingApart: false,
            partShowed: false
        }
    }

    componentDidMount(): void {
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <HeaderBar overrideBackPress={() => this.backPress()} route={this.props.route.name} navigation={this.props.navigation}/>
                <Layout style={styles.fullScreen}>
                    {!this.state.isEditingApart && <SimulatorMenu clickedMenu={(menuClicked) => this.showForm(menuClicked)}/>}
                    {this.state.partShowed === ESTATE && <Text>BIEN</Text>}
                    {this.state.partShowed === FISCALITY && <Text>FISCALITY</Text>}
                    {this.state.partShowed === BANK && <Text>BANK</Text>}
                    <Icon.Button name="insert-chart" backgroundColor={appColors.success} style={{justifyContent: 'center'}}>
                        Évaluer mon projet
                    </Icon.Button>
                </Layout>
            </SafeAreaView>
        );
    }
    showForm(formToShow) {
        this.setState({isEditingApart: true, partShowed: formToShow})
    }

    backPress() {
        if (this.state.isEditingApart) {
            this.setState({isEditingApart: false});
        } else {
            this.props.navigation.goBack();
        }
    }
}