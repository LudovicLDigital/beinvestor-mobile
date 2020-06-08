import React, {Component} from "react";
import {
    View
} from "react-native";
import {Text} from '@ui-kitten/components';
import {styles, appColors} from "../../shared/styles/global";
import Pdf from 'react-native-pdf';

/**
 * Component to display user's friendly the "condition générales d'utilisation" section
 */
export default class CGUComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const source = {uri:require('../../assets/CGU.pdf'),cache:true};
        return (
            <View style={[{flex: 1}]}>
                <Pdf
                    source={source}
                    onLoadComplete={(numberOfPages,filePath)=>{
                        console.log(`number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages)=>{
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error)=>{
                        console.log(error);
                    }}
                    onPressLink={(uri)=>{
                        console.log(`Link presse: ${uri}`)
                    }}
                    style={styles.fullScreen}/>
            </View>
        )
    }
}