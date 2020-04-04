import React, { Component } from 'react';
import {styles, appColors} from "../shared/styles/global";
import GroupService from '../shared/services/entities/groups-service';
import GroupList from '../component/group/group-list';
import { SafeAreaView, View } from 'react-native';
import { Layout } from '@ui-kitten/components';
import HeaderBar from '../component/subcomponent/header-bar';
import SearchBar from "../component/subcomponent/search-bar";
import {DismissKeyboard, showToast} from "../shared/util/ui-helpers";

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
        if(this.isFavRoute) {
            this.groupService.getAllGroupsOfCurrentUser().then((groups) => {
                if (groups && groups.length > 0) {
                    this.fillCityOfGroups(groups);
                }
            }).catch((error) => {
                console.error(error);
                showToast('Erreur lors de la récupération de vos groupes ');
            });
        } else {
            this.searchTerm('clermont')
        }
    }
    fillCityOfGroups(groups) {
        for(let i = 0; i < groups.length; i++) {
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
    searchTerm(text) {
        this.setState({
            searchedTerm: text
        });
        if (text && text.toString().length > 3) {
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
                        <SearchBar  style={{flex: 1}}
                                    placeholder={this.searchPlaceholder}
                                    textSubmitted={(submitted) => this.haveSubmitSearch(submitted)}
                                    textChange={(text) => this.searchTerm(text)}/>
                        <View style={{flex: 15}}>
                            <GroupList groups={this.state.groups}/>
                        </View>
                    </Layout>
                </DismissKeyboard>
            </SafeAreaView>
        );
    }
}