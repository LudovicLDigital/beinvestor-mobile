import React, {Component, useState} from "react";
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
export default function BeInvestorAutoComplete ({autocompleteList, placeholder, style, onChoiceSelect, onTxtChange }) {
    const [searchTerm, setsearchTerm] = useState('');
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
        if (autocompleteList.length > 0) {
            setsearchTerm(autocompleteList[index].title);
            onChoiceSelect(autocompleteList[index]);
        }
    };
    const onChangeText = (query) => {
        setsearchTerm(query);
        onTxtChange(query);
    };
    const ResetAutocompleteIcon = (props) => (
        <TouchableWithoutFeedback onPress={() => onChangeText(null)}>
            <MatIcon size={20} name={'close'}/>
        </TouchableWithoutFeedback>
    );
    return (
        <View style={style}>
            <Autocomplete
                placeholder={placeholder}
                value={searchTerm}
                data={autocompleteList}
                accessoryRight={ResetAutocompleteIcon}
                accessoryLeft={rightIcon}
                onChangeText={onChangeText}
                onSubmitEditing={() => onSelect(0)}
                onSelect={onSelect}>
                {autocompleteList.map(renderOption)}
            </Autocomplete>
        </View>
    )
}
