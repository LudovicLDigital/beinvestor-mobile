import React, { Component } from 'react';
import {styles, appColors} from "../shared/styles/global";
import GroupService from '../shared/services/entities/groups-service';
import GroupList from '../component/group/group-list';
import { SafeAreaView } from 'react-native';
import { Layout } from '@ui-kitten/components';
import HeaderBar from '../component/subcomponent/header-bar';
import SearchBar from "../component/subcomponent/search-bar";
import {DismissKeyboard} from "../shared/util/ui-helpers";

export default class SearchGroupScreen extends Component {

    constructor(props) {
        super(props);
        this.groupService = new GroupService();
        this.state = {
            groups: [],
            searchedTerm: null
        };
        this.isFavRoute = (this.props.route && this.props.route.params) ? this.props.route.params.isFavRoute : false;
        this.searchPlaceholder = `Rechercher un groupe ${this.isFavRoute ? 'favoris' : 'ou une ville'} `
    }

    componentDidMount(): void {
        this.recover();
    }
    searchTerm(text) {
        this.setState({
            searchedTerm: text
        });
        if (text && text.toString().length > 2) {
            // this.groupService.
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
                    <Layout style={[{flex: 1}, styles.fullScreen]}>
                        <SearchBar placeholder={this.searchPlaceholder}
                                   textSubmitted={(submitted) => this.haveSubmitSearch(submitted)}
                                   textChange={(text) => this.searchTerm(text)}/>
                        <GroupList groups={this.state.groups}/>
                    </Layout>
                </DismissKeyboard>
            </SafeAreaView>
        );
    }

    async recover() {
        this.groupService.getAllGroups().then((groups) => {
            this.setState({
                groups: groups
            })
        }).catch((error) => {
            console.log(error);
        });
    }
}