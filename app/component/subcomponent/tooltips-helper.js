import React, {Component} from "react";
import {TouchableWithoutFeedback} from "react-native";
import {Icon, Tooltip} from '@ui-kitten/components';
import {appColors} from "../../shared/styles/global";
import {showInfoAlert} from "../../shared/util/ui-helpers";

/**
 * PROPS :
 * - messageInfo : the message to display on the tooltips
 * - sizeIcon: a number for width and height
 * - showAsAlert
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
            <TouchableWithoutFeedback onPress={() => this._showHelper()}>
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

    _showHelper() {
        if (!this.props.showAsAlert) {
            this.setState({visible: true})
        } else {
            showInfoAlert(this.props.messageInfo, true);
        }
    }
}