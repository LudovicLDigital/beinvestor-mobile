import React, {Component} from "react";
import {TouchableWithoutFeedback, View} from "react-native";
import {Card, Icon, Text} from '@ui-kitten/components';
import {appColors, styles} from "../../../shared/styles/global";
import SectionDivider from "../../subcomponent/form/section-divider";

/**
 * PROPS :
 * - title : the title of the card
 * - containerStyle: style for the main Container
 *  Accept childrens
 */
export default class SimulatorCardResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            iconDisplayed: 'arrow-ios-downward',
            haveOpenThePan: false
        }
    }

    render() {
        return (
            <Card style={[{flex: 1}, this.props.containerStyle]}>
                <TouchableWithoutFeedback onPress={() => this._togglePan()}>
                    <View style={[styles.flexRowAlignCenter, {justifyContent: 'space-between'}]}>
                        <Text category={'h5'}>{this.props.title}</Text>
                        <Icon width={24} height={24} fill={appColors.dark} name={this.state.iconDisplayed}/>
                    </View>
                </TouchableWithoutFeedback>
                {this.state.haveOpenThePan && <SectionDivider containerStyle={{marginTop: 5, marginBottom: 5}}/>}
                {this.state.haveOpenThePan && this.props.children}
            </Card>
        )
    }

    _togglePan() {
        this.setState({
            haveOpenThePan: !this.state.haveOpenThePan,
            iconDisplayed: this.state.haveOpenThePan ? 'arrow-ios-downward' : 'arrow-ios-upward'
        })
    }
}