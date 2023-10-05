import React, {Component} from "react";
import {TouchableWithoutFeedback, View} from "react-native";
import {Input} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
                       accessoryLeft={(props) => {
                           return (
                               <TouchableWithoutFeedback >
                                   <Icon size={20} name={'search'}/>
                               </TouchableWithoutFeedback>)
                       }}
                       onSubmitEditing={() => this.emitSubmitted()}
                       onChangeText={text => this.emitTextValue(text)}/>
            </View>
        )
    }
}