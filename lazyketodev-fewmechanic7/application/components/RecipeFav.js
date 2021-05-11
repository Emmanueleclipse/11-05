import React, {Component} from 'react';
import * as firebase from 'firebase';
import { NavigationActions, StackNavigator, withNavigation} from 'react-navigation';
import{TouchableOpacity, Dimensions, View, Image, ScrollView, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Container, Body, Thumbnail, Text, List, Right, ListItem} from 'native-base';
import ConfigApp from '../utils/ConfigApp';
import ListEmpty from './ListEmpty';
import Strings from '../utils/Strings';

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

class RecipeFav extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      recipes: []
    }

  }

  componentDidMount () {
    this.fetchRecipes();
  }

  RecipeDetails (item) {
    const navigateAction = NavigationActions.navigate({
      routeName: 'RecipeDetailsScreen',
      params: {item}
    });
    this.props.navigation.dispatch(navigateAction);
  }

ListEmptyView = () => {
    return (
      <ListEmpty/>
    );
  }

removeRecipe = async (id) => {
try {

var user = firebase.auth().currentUser;
uid = user.uid;

      const recipes = await AsyncStorage.getItem('recipes');
      let recipesFav = JSON.parse(recipes);
  
      recipesItems = recipesFav.filter(function (e) { return e.id !== id })

      await AsyncStorage.setItem('recipes', JSON.stringify(recipesItems));

      this.setState({
        ...this.state,
        recipes: recipesItems || []
      });
console.log(this.state.recipes)
    } catch (error) {

    }
  };

  render () {

    return (

<List>

<FlatList
          data={ this.state.recipes }
          refreshing="false"
          renderItem={({item}) =>
                
            <ListItem style={{paddingLeft: 0, marginLeft: 0, backgroundColor:'#FFF', opacity: 1, borderColor: 'rgba(0,0,0,0.05)', borderBottomWidth: 1}}  onPress={() => this.RecipeDetails(item)} >
              <Thumbnail size={80} source={{ uri: item.image }} style={{paddingLeft: 10, marginLeft: 10, borderRadius: 10}} />
              <Body style={{paddingLeft: 0, marginLeft: 0}}>
                <Text numberOfLines={3} style={{fontSize: 15, fontWeight: 'bold', marginBottom: 5}}>
                {item.name}
                </Text>
                <View style={{flexDirection: 'row', marginBottom: 5}}>
                <Image source={require('../../assets/images/cooktime.png')} style={{width: 15, height: 15, marginLeft: 12, marginRight: -8}} />
                  <Text style={{ fontSize: 12, color: '#9e9e9e' }}>{item.cook_time + item.prep_time} Minutes</Text>
                <Image source={require('../../assets/images/calories.png')} style={{width: 15, height: 15, marginRight: -8}} />
                  <Text style={{ fontSize: 12, color: '#9e9e9e' }}>{item.nutr_total_carbohydrate - item.nutr_dietary_fiber}g Carbs</Text>
                </View>
              </Body>
              <Right>
                <TouchableOpacity onPress={this.removeRecipe.bind(this, item.id)} activeOpacity={1}>
                  <Text note style={{ marginRight: 10}}>
                <Icon name="trash" style={{fontSize: 26}}/>
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

    async fetchRecipes () {
      var user = firebase.auth().currentUser;
      uid = user.uid;

      let recipesJSON= await AsyncStorage.getItem('recipes');
      let recipesFav = JSON.parse(recipesJSON);
      recipesItems = recipesFav.filter(function(e){
            return e.userId == uid
        })
      const recipesArray = recipesItems || [];
      this.setState({
        ...this.state,
        recipes: recipesArray
      });
  }

}

export default withNavigation(RecipeFav);
