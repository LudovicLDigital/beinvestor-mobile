import React, {Component} from "react";
import {styles, appColors} from "../../shared/styles/global";
import {FlatList, Text, View} from 'react-native';
import { Card } from 'react-native-elements';
function GroupItem({group}) {
    if (group) {
        return (
            <View style={styles.fullScreen}>
                <Card title={group.name}>
                    <Text>Favoris, nombre de membre, ville etc...</Text>
                </Card>
            </View>
        )
    } else return null;
}
/**
 * PROPS :
 * - groups: the list of group
 */
export default class GroupList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.fullScreen}>
                <FlatList data={this.props.groups} keyExtractor={(item, index) => index.toString()}
                          renderItem={(item) => <GroupItem group={item.item}/>}/>
            </View>
        )
    }
}