import React, { Component } from 'react';
import {styles, appColors} from "../../shared/styles/global";
import GroupService from '../../shared/services/entities/groups-service';
import GroupList from '../../component/group/group-list';
import { SafeAreaView, View } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import HeaderBar from '../../component/subcomponent/header-bar';
import SearchBar from "../../component/subcomponent/search-bar";
import {DismissKeyboard, showToast} from "../../shared/util/ui-helpers";
import {PAGINATION_SIZE} from "../../shared/util/constants";
export default class SearchGroupScreen extends Component {
    page = 0;
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
        this._prepareListenerForNavigation(this.props.navigation);
    }
    _prepareListenerForNavigation(navigation) {
        navigation.addListener('focus', () => this._loadData(false)); // CALL WHEN USER NAVIGATE TO
        navigation.addListener('blur', () => this._searchTerm(null)); // CALL WHEN NAVIGATE TO ANOTHER PAGE
    }
    _loadData(isARefresh) {
        if(this.isFavRoute) {
            this.setState({
                searchedTerm: null,
                groups: []
            });
            this.groupService.getAllGroupsOfCurrentUser({
                page: this.page,
                numberItem: 5
            }).then((groups) => {
                if (groups.results && groups.results.length > 0) {
                    this._fillCityOfGroups(groups.results);
                }
            }).catch((error) => {
                console.error(error);
                showToast('Erreur lors de la récupération de vos groupes ');
            });
        } else if (isARefresh && !this.isFavRoute) {
            this._searchTerm(this.state.searchedTerm);
        }
    }
    _fillCityOfGroups(groups) {
        if (groups && groups.length > 0) {
            for (let i = 0; i < groups.length; i++) {
                this.groupService.getCityOfGroup(groups[i].id).then(async (city) => {
                    groups[i].city = city[0];
                    groups[i].currentUserIsMember = await this.groupService.currentIsMember(groups[i].id);
                    this.setState({groups: groups});
                }).catch((error) => {
                    console.error(error);
                    showToast('Erreur lors de la récupération de la ville du groupe: ' + group[i].name);
                });
            }
        }
    }
    _searchTerm(text) {
        this.setState({
            searchedTerm: text,
            groups: []
        });
        if (text && text.toString().length > 2) {
            this.groupService.searchGroupByTerm(text, {
                page: this.page,
                    numberItem: PAGINATION_SIZE
            }).then(async (groups) => {
                this._fillCityOfGroups(groups.results);
            }).catch((error) => {
                console.log('ERROR TO searchGroupByTerm');
                console.log(error);
                showToast('Une erreur est survenue lors de la recherche...')
            })
        }
    }
    haveSubmitSearch(submitted) {
        if (submitted) {
            this._searchTerm(this.state.searchedTerm);
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
                                    textChange={(text) => this._searchTerm(text)}/>
                        <View style={{flex: 15}}>
                            {(this.state.groups && this.state.groups.length > 0) ?
                                <GroupList {...this.props} updateList={() => this.updateList()} isdisplayingUserGroups={this.isFavRoute} groups={this.state.groups}/>
                                :
                                <Text category={'h4'} style={[styles.boldedTitle, {textAlign: 'center', marginTop: 35}]}>Aucun groupe à afficher</Text>
                            }
                        </View>
                    </Layout>
                </DismissKeyboard>
            </SafeAreaView>
        );
    }

    updateList() {
        this._loadData(true);
    }
}