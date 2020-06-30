import React, {Component} from "react";
import {TouchableWithoutFeedback, View,} from "react-native";
import {Autocomplete as UIKittenAutocomplete, AutocompleteItem, Icon} from '@ui-kitten/components';
import MatIcon from 'react-native-vector-icons/MaterialIcons';

/**
 * Use to resolve a bug when user enter terms the list isn't showed until the user blur and refocus the autocomplete component
 */
export const Autocomplete = React.forwardRef((props, ref) => {

    const autocompleteRef = React.useMemo(() => ref || React.createRef(), [ref]);
    const { length: dataLength } = props.data;

    React.useEffect(() => {
        const shouldBecomeVisible = (autocompleteRef.current?.isFocused() || false) && (dataLength || 0) > 0;
        if (autocompleteRef.current?.state.listVisible !== shouldBecomeVisible) {
            autocompleteRef.current?.setState({ listVisible: shouldBecomeVisible });
        }
    }, [dataLength]);

    return (
        <UIKittenAutocomplete
            ref={autocompleteRef}
            {...props}
        />
    );
});
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
    render() {
        const renderOption = (item, index) => (
            <AutocompleteItem
                key={index}
                title={item.title}
            />
        );
        const rightIcon = (props) => (
                <MatIcon size={20} name={'search'}/>
        );
        const onSelect = (index) => {
            this.setState({searchTerm: this.props.autocompleteList[index].title});
            this.props.onChoiceSelect(this.props.autocompleteList[index]);
        };
        const onChangeText = (query) => {
            this.setState({searchTerm: query});
            this.props.onTxtChange(query);
        };
        const ResetAutocompleteIcon = (props) => (
            <TouchableWithoutFeedback onPress={() => onChangeText(null)}>
                <MatIcon size={20} name={'close'}/>
            </TouchableWithoutFeedback>
        );
        return (
            <View style={this.props.style}>
                <Autocomplete
                    placeholder={this.props.placeholder}
                    value={this.state.searchTerm}
                    data={this.props.autocompleteList}
                    accessoryRight={ResetAutocompleteIcon}
                    accessoryLeft={rightIcon}
                    onChangeText={onChangeText}
                    onSelect={onSelect}>
                    {this.props.autocompleteList.map(renderOption)}
                </Autocomplete>
            </View>
        )
    }
}
