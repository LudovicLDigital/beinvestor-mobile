import React, {Component} from "react";
import {
    View,
    SafeAreaView
} from "react-native";
import {styles, appColors} from "../../shared/styles/global";
import {Layout, Text, Button} from "@ui-kitten/components/ui/index";
import HeaderBar from "../../component/subcomponent/header-bar";
import TooltipsHelper from "../../component/subcomponent/tooltips-helper";
import Thermometer from "../../component/subcomponent/animation/thermometer";

/**
 * PARAM :
 * - resultDatas : the datas result from api
 */
export default class SimulatorResultScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: null,
        }
    }


    componentDidMount(): void {
        if (this.props.route && this.props.route.params) {
            const result = this.props.route.params.resultDatas;
            if (result) {
                if (result && result !== null) {
                    this.setState({result: result})
                }
            }
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <HeaderBar previousRoute={(this.state.isEditingApart ? this.props.route.name : null)} route={(this.props.route.name)} navigation={this.props.navigation}/>
                <Layout style={styles.fullScreen}>
                    <View style={styles.flexRowAlignCenter}>
                        <Button>Nouveau calcul</Button>
                        <Thermometer/>
                        <View style={styles.flexCenter}>
                            <TooltipsHelper/>
                            {this.state.result &&  <Text>Rentabilité brute : {this.state.result.result.rentaBrutte}</Text>}
                            {this.state.result && <Text>Rentabilité nette : {this.state.result.result.rentaNet}</Text>}
                        </View>
                    </View>
                </Layout>
            </SafeAreaView>
        )
    }
}