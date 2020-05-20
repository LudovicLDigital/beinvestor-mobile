import React, {Component} from "react";
import {
    TouchableWithoutFeedback
} from "react-native";
import { Icon, Tooltip } from '@ui-kitten/components';
import {styles, appColors} from "../../shared/styles/global";

/**
 * PROPS :
 * - messageInfo : the message to display on the tooltips
 * - sizeIcon: a number for width and height
 */
export default class TooltipsHelper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    render() {
        const renderToggleButton = () => (
            <TouchableWithoutFeedback onPress={() => this.setState({visible:true})}>
                <Icon style={{width: (this.props.sizeIcon ?  this.props.sizeIcon : 32), height: (this.props.sizeIcon ?  this.props.sizeIcon : 32) }} fill={appColors.primary} name={'info-outline'}/>
            </TouchableWithoutFeedback>
        );

        return (
            <Tooltip
                anchor={renderToggleButton}
                visible={this.state.visible}
                placement={'top end'}
                onBackdropPress={() => this.setState({visible:false})}>
                {this.props.messageInfo}
            </Tooltip>
        );
    }
}