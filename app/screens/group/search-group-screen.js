import React, { Component } from 'react';
import {styles, appColors} from "../../shared/styles/global";
import GroupService from '../../shared/services/entities/groups-service';
import GroupList from '../../component/group/group-list';
import { SafeAreaView, View } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import HeaderBar from '../../component/subcomponent/header-bar';
import SearchBar from "../../component/subcomponent/search-bar";
import {DismissKeyboard, showToast} from "../../shared/util/ui-helpers";
export default class SearchGroupScreen extends Component {
    constructor(props) {
        super(props);
        this.groupService = new GroupService();
        this.state = {
            groups: [],
            searchedTerm: null
        };
        this.isFavRoute = (this.props.route && this.props.route.params) ? this.props.route.params.isFavRoute : false;
        this.searchPlaceholder = `Rechercher ${this.isFavRoute ? 'dans vos groupes' : 'un groupe ou une ville'} `
    }
    componentDidMount(): void {
        this.prepareListenerForNavigation(this.props.navigation);
    }
    prepareListenerForNavigation(navigation) {
        navigation.addListener('focus', () => this.loadData()); // CALL WHEN USER NAVIGATE TO
        navigation.addListener('blur', () => this.searchTerm(null)); // CALL WHEN NAVIGATE TO ANOTHER PAGE
    }
    loadData() {
        if(this.isFavRoute) {
            this.groupService.getAllGroupsOfCurrentUser().then((groups) => {
                if (groups && groups.length > 0) {
                    this.fillCityOfGroups(groups);
                }
            }).catch((error) => {
                console.error(error);
                showToast('Erreur lors de la récupération de vos groupes ');
            });
        }
    }
    fillCityOfGroups(groups) {
        if (groups && groups.length > 0) {
            for (let i = 0; i < groups.length; i++) {
                this.groupService.getCityOfGroup(groups[i].id).then(async (city) => {
                    groups[i].city = city[0];
                    groups[i].members = await this.groupService.getMembersOfGroup(groups[i].id);
                    this.setState({groups: groups});
                }).catch((error) => {
                    console.error(error);
                    showToast('Erreur lors de la récupération de la ville du groupe: ' + group[i].name);
                });
            }
        }
    }
    searchTerm(text) {
        this.setState({
            searchedTerm: text
        });
        if (text && text.toString().length > 2) {
            this.groupService.searchGroupByTerm(text).then(async (groups) => {
                this.fillCityOfGroups(groups);
            }).catch((error) => {
                console.log('ERROR TO searchGroupByTerm');
                console.log(error);
                showToast('Une erreur est survenue lors de la recherche...')
            })
        }
    }
    haveSubmitSearch(submitted) {
        if (submitted) {
            this.searchTerm(this.state.searchedTerm);
        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <HeaderBar route={this.props.route.name} navigation={this.props.navigation}/>
                <DismissKeyboard>
                    <Layout style={{flex:1}}>
                        <SearchBar  style={{flex: 1, zIndex: 100}}
                                    placeholder={this.searchPlaceholder}
                                    textSubmitted={(submitted) => this.haveSubmitSearch(submitted)}
                                    textChange={(text) => this.searchTerm(text)}/>
                        <View style={{flex: 15}}>
                            {(this.state.groups && this.state.groups.length > 0) ?
                                <GroupList {...this.props} isdisplayingUserGroups={this.isFavRoute} groups={this.state.groups}/>
                                :
                                <Text category={'h4'} style={[styles.boldedTitle, {textAlign: 'center', marginTop: 35}]}>Aucun groupe à afficher</Text>
                            }
                        </View>
                    </Layout>
                </DismissKeyboard>
            </SafeAreaView>
        );
    }
}