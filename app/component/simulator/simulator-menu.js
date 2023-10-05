import React, {Component} from "react";
import {View} from "react-native";
import {BANK, ESTATE, FISCALITY, RENT, SITUATION} from "../../shared/util/constants";
import {InteractiveIconLabel} from "../subcomponent/ui-tools/ui-object";

/**
 * PROPS :
 * - clickedMenu : return the menu clicked
 */
export default class SimulatorMenu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <InteractiveIconLabel onPressFunction={() => this.props.clickedMenu(ESTATE)} icon={"location-city"} label={"Bien à analyser"} displayRequiredStar={true}  />
                <InteractiveIconLabel onPressFunction={() => this.props.clickedMenu(RENT)} icon={"local-atm"} label={"Loyers"} displayRequiredStar={true}  />
                <InteractiveIconLabel onPressFunction={() => this.props.clickedMenu(FISCALITY)} icon={"money-off"} label={"Charges"}   />
                <InteractiveIconLabel onPressFunction={() => this.props.clickedMenu(BANK)} icon={"euro-symbol"} label={"Emprunt bancaire"} />
                <InteractiveIconLabel onPressFunction={() => this.props.clickedMenu(SITUATION)} icon={"assignment-ind"} label={"Votre situation"}  />
            </View>
        )
    }
}