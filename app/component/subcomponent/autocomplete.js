import React, {Component} from "react";
import {
    View
} from "react-native";
import { Autocomplete, Icon} from '@ui-kitten/components';
import {styles, appColors} from "../../shared/styles/global";

const ResetAutocompleteIcon = (style) => (
    <Icon {...style} name='close' />
);
/**
 * PROPS :
 * - autocompleteList : the list of string to display in autocomplete
 * - placeholder : placeholder to display
 * - style: the style for autocomplete
 * - onChoiceSelect : call back when user click on a choice of the autocomplete
 * - onTxtChange : call back when user enterred new characters
 */
export default class BeInvestorAutoComplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ''
        }
    }
    selectValue(item) {
        this.setState({searchTerm: item.title});
        this.props.onChoiceSelect(item);
    }
    emitText(text) {
        this.setState({searchTerm: text});
        this.props.onTxtChange(text);
    }
    render() {
        return (
            <View style={this.props.style}>
                <Autocomplete
                    placeholder={this.props.placeholder}
                    value={this.state.searchTerm}
                    data={this.props.autocompleteList}
                    icon={ResetAutocompleteIcon}
                    onIconPress={() => this.emitText(null)}
                    onChangeText={(text) => this.emitText(text)}
                    onSelect={(item) => this.selectValue(item)}>
                </Autocomplete>
            </View>
        )
    }
}