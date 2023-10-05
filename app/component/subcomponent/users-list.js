import React, {Component} from "react";
import {FlatList, StyleSheet, View} from "react-native";
import {Avatar, Text} from '@ui-kitten/components';
import {appColors, styles} from "../../shared/styles/global";

const usersListStyle = StyleSheet.create({
    userViewContainer: {flex: 1, marginBottom: 15, paddingBottom: 15, borderBottomColor: appColors.primaryLight, borderBottomWidth: 1}

})
function UserItem({user}) {
    if (user) {
        return (
            <View style={[usersListStyle.userViewContainer, styles.flexRowAlignCenter]} >
                <Avatar style={{marginRight: 15}} size={'large'} source={require('../../assets/icon.png')}/>
                <Text>{user.firstName + '  ' + user.lastName}</Text>
            </View>
        )
    } else return null;
}
/**
 * PROPS :
 * - usersList : the list of user to display
 */
export default class UsersList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FlatList style={{flex: 1, padding: 15, backgroundColor: appColors.white }} data={this.props.usersList} keyExtractor={(item, index) => item.id.toString()}
                      renderItem={(item) =>
                          <UserItem
                              user={item.item}
                          />
                      }/>
        )
    }
}