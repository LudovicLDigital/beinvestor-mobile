import React, {useEffect, useState} from "react";
import {TouchableWithoutFeedback, View,} from "react-native";
import {Autocomplete as UIKittenAutocomplete, AutocompleteItem} from '@ui-kitten/components';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import {showToast} from "../../shared/util/ui-helpers";
import GouvAdressService from "../../shared/services/gouv-adresse-service";

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
export default function BeInvestorAutoComplete ({autocompleteList, placeholder, style, onChoiceSelect, onTxtChange, preFilledField, placement }) {
    const [searchTerm, setsearchTerm] = useState('');
    const [previousTerm, setPreviousTerm] = useState(preFilledField);
    useEffect(() => {
        if (previousTerm !== null && searchTerm !== '') {
            setPreviousTerm(null)
        }
    }, [searchTerm]);
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
        <TouchableWithoutFeedback onPress={() => onChangeText("")}>
            <MatIcon size={20} name={'close'}/>
        </TouchableWithoutFeedback>
    );
    function valueSetted() {
        return (previousTerm !== null && previousTerm) ? previousTerm : searchTerm
    }
    return (
        <View style={style}>
            <Autocomplete
                placement={placement}
                placeholder={placeholder}
                value={valueSetted()}
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

/**
 * Component to autocomplete city search (FR only)
 * @param style pass a specific style you want to apply
 * @param onChoiceSelect pass a callback for when a city in the autocomplete is selected
 * @param preFilledCity is a city previous setted during another autocomplete filling
 * @param placement position of the autocomplete combobox
 * @param onlyDistrict if must hide city containing district (hide the city alone name)
 * @returns {*}
 * @constructor
 */
export function BeInvestorCityAutoComplete({ style, onChoiceSelect, preFilledCity, placement, onlyDistrict }) {
    const [cities, setCities] = useState([]);
    const [citySelected, setCitySelected] = useState(preFilledCity ? preFilledCity : null);
    const gouvAdressService = new GouvAdressService(onlyDistrict);
    useEffect(() => {
        if (onChoiceSelect) {
            onChoiceSelect(citySelected);
        }
    }, [citySelected]);
    function _onTxtChange(text) {
        if (text && text.trim() !== '' && text.trim().length > 2) {
            gouvAdressService.getAdressesCorresponding(text).then((results) => {
                setCities(results);
            }).catch((error) => {
                showToast('ERROR FROM GOUV API');
                console.error(error);
            })
        } else if (text === null) {
            setCities([])
        }
    }

    return (
        <BeInvestorAutoComplete
            placement={placement}
            style={style}
            preFilledField={(preFilledCity !== null && preFilledCity) ? preFilledCity.title : null}
            autocompleteList={cities}
            onChoiceSelect={(item) => setCitySelected(item)}
            onTxtChange={(text) => _onTxtChange(text)}
            placeholder={'Rechercher une ville'}/>
    );
}
