import React, { Component } from 'react';
import * as firebase from 'firebase';
import { NavigationActions, StackNavigator, withNavigation } from 'react-navigation';
import { TouchableOpacity, Dimensions, View, Image, ScrollView, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Container, Body, Thumbnail, Text, List, Right, ListItem } from 'native-base';
import ConfigApp from '../utils/ConfigApp';
import ListEmpty from './ListEmpty';
import Strings from '../utils/Strings';

var styles = require('../../assets/files/Styles');
var { height, width } = Dimensions.get('window');

class ShopList extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            shopping_list: []
        }



    }

    componentDidMount() {
        this.fetchRecipes();
    }

    groupShoppingList() {

    }

    ListEmptyView = () => {
        return (
            <ListEmpty />
        );
    }

    removeItem = async (ingredient, recipeId, uniqueId) => {

        //console.log('ingredient: '+ingredient+' recipeid: '+recipeId)
        try {

            const shoppingList = await AsyncStorage.getItem('shopping_list');
            //console.log(shoppingList)
            let shoppingListItemsFirst = JSON.parse(shoppingList);
            //console.log(shoppingList)
            let shoppingListItems = shoppingListItemsFirst.filter(function (e) {
                console.log('recipe id ' + e.recipeId)
                console.log('recipe ingredient: ' + e.ingredient)

                return e.uniqueId !== uniqueId
            })
            //console.log(shoppingListItems)
            await AsyncStorage.setItem('shopping_list', JSON.stringify(shoppingListItems))

            this.setState({
                ...this.state,
                shopping_list: shoppingListItems || []
            });
            //console.log(this.state.shopping_list)
        } catch (error) {
            console.log(error)
        }
    };

    render() {

        return (

            <List>

                <FlatList
                    data={this.state.shopping_list}
                    refreshing="false"
                    renderItem={({ item }) =>

                        <ListItem style={{ paddingLeft: 0, marginLeft: 0, backgroundColor: '#FFF', opacity: 1, borderColor: 'rgba(0,0,0,0.05)', borderBottomWidth: 1 }} >
                            <Body style={{ paddingLeft: 0, marginLeft: 0 }}>
                                <Text numberOfLines={3} style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 5 }}>
                                    {item.ingredient}
                                </Text>
                            </Body>
                            <Right>
                                <TouchableOpacity onPress={this.removeItem.bind(this, item.ingredient, item.recipeId, item.uniqueId)} activeOpacity={1}>
                                    <Text note style={{ marginRight: 10 }}>
                                        <Icon name="trash" style={{ fontSize: 26 }} />
                                    </Text>
                                </TouchableOpacity>
                            </Right>
                        </ListItem>

                    }
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={this.ListEmptyView}


                />

            </List>

        )
    }

    async fetchRecipes() {
        var user = firebase.auth().currentUser;
        uid = user.uid;

        let recipesJSON = await AsyncStorage.getItem('shopping_list');
        let recipesFav = JSON.parse(recipesJSON);
        recipesItems = recipesFav
        const recipesArray = recipesItems || [];
        this.setState({
            ...this.state,
            shopping_list: recipesArray
        });
    }

}

export default withNavigation(ShopList);
