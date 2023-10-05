import React, {Component} from "react";
import {View} from "react-native";
import {styles} from "../../shared/styles/global";
import Pdf from 'react-native-pdf';

/**
 * Component to display user's friendly the "condition générales d'utilisation" section
 */
export default class CGUComponent extends Component {
    constructor(props) {
        super(props);
        this.pdf = React.createRef();
    }

    render() {
        let source = {uri:'bundle-assets://pdf/CGU.pdf', cache: true};
        return (
            <View style={[{flex: 1}]}>
                <Pdf
                    ref={(pdf)=>{this.pdf = pdf;}}
                    source={source}
                    onError={(error)=>{console.log(error);}}
                    style={styles.pdf}/>
            </View>
        )
    }
}