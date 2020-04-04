import React, {Component} from "react";
import {
    Text,
    View
} from "react-native";
import {styles, appColors} from "../../shared/styles/global";
import { Icon, Input } from '@ui-kitten/components';

/**
 * PROPS :
 * - placeholder : placeholder for the input
 * - textChange(return string) : call back for the input enterred value
 * - textSubmitted( return boolean) : call back to fired event on search bar submittion
 * - style : styles
 */
export default class SearchBar extends Component {
    constructor(props) {
        super(props);
    }
    emitTextValue(text) {
        if (this.props.textChange)  {
            this.props.textChange(text);
        }
    }
    emitSubmitted() {
        if (this.props.textSubmitted) {
            this.props.textSubmitted(true);
        }
    }
    render() {
        return (
            <View style={[{flex: 1}, this.props.style]}>
                <Input placeholder={this.props.placeholder}
                       icon={(style) => {
                           return (<Icon {...style} name='search-outline'/>)
                       }}
                       onSubmitEditing={() => this.emitSubmitted()}
                       onChangeText={text => this.emitTextValue(text)}/>
            </View>
        )
    }
}