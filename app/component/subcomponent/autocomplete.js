import React, {Component} from "react";
import {TouchableWithoutFeedback, View,} from "react-native";
import {Autocomplete, AutocompleteItem, Icon} from '@ui-kitten/components';
import MatIcon from 'react-native-vector-icons/MaterialIcons';

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
        const ResetAutocompleteIcon = (props) => (
            <TouchableWithoutFeedback onPress={() => this.emitText(null)}>
                <Icon {...props} name='close' />
            </TouchableWithoutFeedback>
        );
        return (
            <View style={this.props.style}>
                <Autocomplete
                    placeholder={this.props.placeholder}
                    value={this.state.searchTerm}
                    data={this.props.autocompleteList}
                    accessoryRight={ResetAutocompleteIcon}
                    accessoryLeft={() => {return(<MatIcon size={20} name={'search'}/>)}}
                    onChangeText={(text) => this.emitText(text)}
                    onSelect={(item) => this.selectValue(item)}>
                    {this.props.autocompleteList.map((item, index) => {
                        return (
                            <AutocompleteItem key={index} label={item.title}/>
                        )
                    })}
                </Autocomplete>
            </View>
        )
    }
}