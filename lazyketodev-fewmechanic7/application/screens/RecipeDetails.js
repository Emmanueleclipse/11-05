import React, { Component } from 'react';
import { NavigationActions, StackNavigator, withNavigation } from 'react-navigation';
import { ImageBackground, Dimensions, View, Platform, TouchableOpacity, ScrollView, FlatList, Linking, Image, StatusBar, LogBox, StyleSheet } from 'react-native';
import HTMLView from 'react-native-htmlview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { Container, Header, Content, Icon, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import { VictoryChart, VictoryAxis, VictoryBar } from 'victory-native';

import ConfigApp from '../utils/ConfigApp';
import Strings from '../utils/Strings';
import BannerAd from '../components/BannerAd';
import InterstitialAd from '../components/InterstitialAd';
import HTML from 'react-native-render-html';
import * as firebase from 'firebase';
import { LinearGradient } from 'expo-linear-gradient';
import ColorsApp from '../utils/ColorsApp';
import Modal from 'react-native-modalbox';
import WebView from 'react-native-webview';
import ItemForm from '../forms/ItemForm';
import ItemRating from '../components/ItemRating';
import Nutritional from '../components/Nutritional';
import ItemComments from '../forms/ItemComments';
import Box from '../components/Box';
import ToastModal from '../components/ToastModal';
import Toast from 'react-native-root-toast';
import { AdMobInterstitial } from 'expo-ads-admob';


import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.']);
var styles = require('../../assets/files/Styles');
var { height, width } = Dimensions.get('window');




export default class RecipeDetails extends Component {
  static navigationOptions = {
    headerShown: false
  };

  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    
    this.state = {
      item: params.item,
      mute: false,
      iconColor: 'white',
      shouldPlay: false,
      shoppingColor: 'black',
      shopping_list: []
    };
   

  }

  // saveRecipes is the onPress function for the favorite heart icon located on each recipeDetail page. It sends all of the recipe information to
  saveRecipes = async (recipe_id, name, image, category_title, cook_time, ingredients, directions, nutr_total_carbohydrate, nutr_dietary_fiber, default_servings, difficulty_text, prep_time, uid) => {
    const { item } = this.state;
    
    //console.log(this.state.favorited)
    if (this.state.favorited === true) {
      try {
        let recipeId = recipe_id

        
        const recipes = await AsyncStorage.getItem('recipes');

        let recipesFav = JSON.parse(recipes);

        recipesItems = recipesFav.filter(function (e) { 
          //console.log('e.id: '+e.id)
          //console.log('recipe ' +recipeId)
          return e.id !== recipeId && e.userId == uid })
        
        await AsyncStorage.setItem('recipes', JSON.stringify(recipesItems))

        Toast.show('Removed', { duration: Toast.durations.SHORT, position: Toast.positions.CENTER, shadow: false, animation: true })
        this.setState({
          ...this.state,
          recipes: recipesItems || [],
          favorited: false,
          iconColor: 'white',
          
        });
        
      } catch (error) {

      }
    }
    else {
      try {
        let recipe = {
          userId: uid,
          id: recipe_id,
          recipe_id: recipe_id,
          name: name,
          image: image,
          category_title: 'Keto',
          cook_time: cook_time,
          recipe_description: 'A Delicious Keto Recipes',
          ingredients: ingredients,
          directions: directions,
          nutr_total_carbohydrate: nutr_total_carbohydrate,
          nutr_dietary_fiber: nutr_dietary_fiber,
          default_servings: default_servings,
          difficulty_text: difficulty_text,
          prep_time: prep_time,

        }

        const recipes = await AsyncStorage.getItem('recipes') || '[]';
        let recipesFav = JSON.parse(recipes);
        let recipesItems = recipesFav.filter(function (e) { return e.id !== recipe_id && e.userId == uid })
        recipesItems.push(recipe);
 
        AsyncStorage.setItem('recipes', JSON.stringify(recipesItems)).then(() => {

          Toast.show(Strings.ST53, { duration: Toast.durations.SHORT, position: Toast.positions.CENTER, shadow: false, animation: true })
          this.setState({
            iconColor: ColorsApp.TEAL,
            favorited: true
          });

          // firebase.database().ref('/users/' + uid).set({
          //   recipes: JSON.stringify(recipesItems)
          // }).then(() => console.log('Data sent successfully'))


        });


      } catch (error) {

        console.log(error);
      }
      
    }

    
  };
  
  
 
  getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('recipes')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  }

  async addShoppingList(value, title) {
    
    var found = this.state.shopping_list.some(function (el) {
      return el.ingredient == value;
    });
    let tmp = this.state.shopping_list;
    let recipeStateId = this.state.item.id;
    if (!found) {
      
      tmp.push({ recipeId: this.state.item.id, recipeName: this.state.item.name, ingredient: value, uniqueId: recipeStateId + value  });
       this.setState({ shopping_list: tmp })     
      AsyncStorage.setItem('shopping_list', JSON.stringify(tmp));
    }
    console.log(this.state.shopping_list)

  }


   async iconColor() {
    const recipes = await AsyncStorage.getItem('recipes') || '[]';
    let recipesFav = JSON.parse(recipes);

     const { item } = this.state;
     

  
    let found = recipesFav.find( (arr, i) => {
      return arr.id === item.id
    })  
    if (found != null ) {
      //console.log('FOUND!')
      this.setState({ 
        iconColor: ColorsApp.TEAL,
        favorited: true
       });
      
    }
  }

  
  initAds = async () => {

    

    try {
      const INTERSTITIAL_ID = Platform.OS == "ios" ? ConfigApp.IOS_INTERSTITIAL_ID : ConfigApp.ANDROID_INTERSTITIAL_ID;
      const INTERSTITIAL_COUNT = ConfigApp.INTERSTITIAL_COUNT;
      const value = await AsyncStorage.getItem('play_ad_times')
      if (value !== null) {
        //Change value below to change number of interstitial each
        if (value == INTERSTITIAL_COUNT) {
          await AsyncStorage.setItem('play_ad_times', "1"); //If three times back to one times and play once
          AdMobInterstitial.setAdUnitID(INTERSTITIAL_ID); // Test ID, Replace with your-admob-unit-id
          await AdMobInterstitial.requestAdAsync();
          await AdMobInterstitial.showAdAsync();
        } else {
          var temp = parseInt(value) + 1;
          await AsyncStorage.setItem('play_ad_times', temp.toString());
        }
        // value previously stored
      } else {
        //first time in
        await AsyncStorage.setItem('play_ad_times', "1"); //Set time 1

        AdMobInterstitial.setAdUnitID(INTERSTITIAL_ID); // Test ID, Replace with your-admob-unit-id
        await AdMobInterstitial.requestAdAsync();
        await AdMobInterstitial.showAdAsync();
      }
    } catch (e) {
      // error reading value
      await AsyncStorage.setItem('play_ad_times', "1");
    }

  };

  componentDidMount() {
    //this.initAds();
   this.iconColor();

    AsyncStorage.getItem('shopping_list').then((value) => {

      if (value != null) {
        var arr = JSON.parse(value)
        //console.log(arr)
        if (arr.length > 0) {
          this.setState({ shopping_list: arr })
        }
      }
    }
    );

    //Fix Typo
    // var user = firebase.auth().currentUser;
    // uid = user.uid;
    // firebase.database().ref(`/users/${uid}`).on('value', (snapshot) => {
    //   const recipes = snapshot.val();
    //   this.setState({ recipes: recipes.recipes })
    // });
  }

  render() {

    const { item } = this.state;
    const directionsStyle = StyleSheet.create({
      ul: {
 backgroundColor: 'red'
      },
      a: {
        fontWeight: '500',
        color: '#FF3366', // make links coloured pink
      },
    });
    

    //Determine serving text for nutritional information
      let _servingText = function () {
        if (item.default_servings > 1) {
          return `Servings`
        }
        else {
        return `Serving`
        }
      }
    let servingText = _servingText();

    //Get user
    var user = firebase.auth().currentUser;

    let iconColor = this.state.iconColor;
    let shoppingColor = this.state.shoppingColor;
   
    return (
      
      <Container style={styles.background_general}>

        <LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.0)']} style={{ position: 'absolute', top: 0, zIndex: 100, paddingTop: 45, paddingHorizontal: 30, width: width }}>
        </LinearGradient>
        <StatusBar barStyle="light-content" />

        <LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.0)']} style={{ position: 'absolute', top: 0, zIndex: 130, paddingTop: 45, paddingHorizontal: 30, width: width }}>

          <Grid >
            <Col style={{ alignItems: 'flex-start', alignContent: 'flex-start', justifyContent: 'flex-start' }}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()} activeOpacity={1}>
                <Ionicons name="md-arrow-back" style={{
                  fontSize: 27, color: '#FFFFFF', shadowOffset: {
                    width: 0,
                    height: 8,
                  },
                  shadowOpacity: 0.46,
                  shadowRadius: 11.14,

                  elevation: 17 }} />
              </TouchableOpacity>
            </Col>
            <Col style={{ alignItems: 'flex-end', alignContent: 'flex-end', justifyContent: 'flex-end' }}>
              <TouchableOpacity onPress={this.saveRecipes.bind(this, item.recipe_id, item.name, item.image, item.category_title, item.cook_time, item.ingredients, item.directions, item.nutr_total_carbohydrate, item.nutr_dietary_fiber, item.default_servings, item.difficulty_text, item.prep_time, user.uid)}>
                <Ionicons name="md-heart" style={{
                  fontSize: 27, color: iconColor, shadowOffset: {
                    width: 0,
                    height: 8,
                  },
                  shadowOpacity: 0.46,
                  shadowRadius: 11.14,

                  elevation: 17}} />
                
              </TouchableOpacity>
            </Col>
          </Grid>
        </LinearGradient>

        <ImageBackground source={{ uri: item.image }} style={{ height: height * 0.40, alignItems: 'flex-start', justifyContent: 'flex-end' }} resizeMode="cover">
          <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.15)', 'rgba(0,0,0,0.55)']} style={{ height: height * 0.30, width: width, paddingHorizontal: 20, alignItems: 'flex-start', justifyContent: 'flex-end', paddingBottom: 20 }}>
            <View style={{ flexDirection: 'row' }}>
              <LinearGradient colors={[ColorsApp.SECOND, ColorsApp.PRIMARY]} start={[0, 0]} end={[1, 0]} style={{ paddingHorizontal: 10, padding: 5, borderRadius: 5, marginBottom: 7, backgroundColor: ColorsApp.PRIMARY }}>
                <Text style={{ color: '#FFF', fontSize: 11 }}>{item.difficulty_text}</Text>
              </LinearGradient>
            </View>
            <Text numberOfLines={2} style={{
              fontSize: 18, fontWeight: 'bold', color: '#FFF', marginBottom: 5, shadowOffset: {
                width: 0,
                height: 8,
              },
              shadowOpacity: 0.46,
              shadowRadius: 11.14,

              elevation: 17 }}>{item.name}</Text>
            <ItemRating itemId={item.recipe_id} starSize={18} starWidth={95} style={{
              shadowOffset: {
                width: 0,
                height: 8,
              },
              shadowOpacity: 0.46,
              shadowRadius: 11.14,

              elevation: 17}}/>
          </LinearGradient>
        </ImageBackground>
        <ScrollView>

          <Grid style={{ marginTop: 20, marginBottom: 10 }}>
            <Col style={{ alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>

              <Image source={require('../../assets/images/cooktime.png')} style={{ width: 30, height: 30, marginBottom: 7 }} resizeMode="contain" />

              <Text style={{ fontSize: 14, marginBottom: 3, color: 'rgba(0,0,0,0.5)' }}>{Strings.ST16}</Text>
              <Text style={{ fontSize: 14, fontWeight: 'bold', }}>{item.cook_time} Minutes</Text>

            </Col>

            <Col style={{ alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>

              <Image source={require('../../assets/images/servings.png')} style={{ width: 30, height: 30, marginBottom: 7 }} resizeMode="contain" />
              <Text style={{ fontSize: 14, marginBottom: 3, color: 'rgba(0,0,0,0.5)' }}>{Strings.ST15}</Text>
              <Text style={{ fontSize: 14, fontWeight: 'bold', }}>{item.default_servings} {servingText}</Text>

            </Col>

            <Col style={{ alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>

              <Image source={require('../../assets/images/calories.png')} style={{ width: 30, height: 30, marginBottom: 7 }} resizeMode="contain" />
              <Text style={{ fontSize: 14, marginBottom: 3, color: 'rgba(0,0,0,0.5)' }}>{'Net Carbs'}</Text>
              <Text style={{ fontSize: 14, fontWeight: 'bold', }}>{item.nutr_total_carbohydrate - item.nutr_dietary_fiber}g</Text>

            </Col>

          </Grid>

          <View style={{ marginHorizontal: 20 }}>

          </View>


          <Collapse isCollapsed={true}>
            <CollapseHeader>
              <LinearGradient colors={[ColorsApp.SECOND, ColorsApp.PRIMARY]} start={[0, 0]} end={[1, 0]} style={styles.collapseStyle}>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 13 }}>{Strings.ST21.toUpperCase()}</Text>
              </LinearGradient>
            </CollapseHeader>
            <CollapseBody>
              <View style={{ margin: 0, backgroundColor: '#FFF' }}>
                <View style={{ marginHorizontal: 10 }}>
                  {/* <FlatList
                    style={{ backgroundColor: 'white', marginTop: 0, marginBottom: 0 }}
                    data={item.ingredients}
                    key={(item) => item.id}
                    renderItem={(item) => {
                      <Text>{item}</Text>
                    }}
                    keyExtractor={(item, index) => item.id}></FlatList> */}

                  <List>

                    <FlatList
                      data={item.ingredients}
                      refreshing="false"
                      key={(item) => item.id}
                      renderItem={({ item }) =>

                        <ListItem style={{ paddingLeft: 0, marginLeft: 0, backgroundColor: '#FFF', opacity: 1, borderColor: 'rgba(0,0,0,0.05)', borderBottomWidth: 1 }} >
                          <Body style={{ paddingLeft: 0, marginLeft: 0 }}>
                            <Text numberOfLines={2} style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 1 }}>
                              {item}
                            </Text>
                          </Body>
                          <Right>
                            <Text note>
                              <Icon onPress={() => this.addShoppingList(item, this.props.recipe_name)} type="FontAwesome" name="shopping-cart" style={{ fontSize: 22, color: shoppingColor }} />
                              <Text>+</Text>
                            </Text>
                          </Right>
                        </ListItem>

                      }
                      keyExtractor={(item, index) => index.toString()}

                    />

                  </List>
                </View>

              </View>
            </CollapseBody>
          </Collapse>

          <Collapse isCollapsed={true}>
            <CollapseHeader>
              <LinearGradient colors={[ColorsApp.SECOND, ColorsApp.PRIMARY]} start={[0, 0]} end={[1, 0]} style={styles.collapseStyle}>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 13 }}>{Strings.ST22.toUpperCase()}</Text>
              </LinearGradient>
            </CollapseHeader>
            <CollapseBody>
              <View style={{ margin: 10, backgroundColor: '#FFF' }}>
                <HTML html={item.directions}  onLinkPress={(evt, href) => { Linking.openURL(href); }} />
                {/* <HTMLView
                  value={item.directions}
                  stylesheet={directionsStyle}
                /> */}
              </View>
            </CollapseBody>
          </Collapse>

          <Collapse isCollapsed={true}>
            <CollapseHeader>
              <LinearGradient colors={[ColorsApp.SECOND, ColorsApp.PRIMARY]} start={[0, 0]} end={[1, 0]} style={styles.collapseStyle}>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 13 }}>{Strings.ST114.toUpperCase()}</Text>
              </LinearGradient>
            </CollapseHeader>
            <CollapseBody>
              <View style={{ margin: 10, backgroundColor: '#FFF' }}>

                <Text>This recipe makes {item.default_servings} {servingText}.</Text>

              </View>
            </CollapseBody>
          </Collapse>


          <View style={{ height: 1, backgroundColor: '#EEE', width: width }}></View>


          <View style={{ marginBottom: 20, backgroundColor: '#FFF' }}>
            <ListItem icon style={{ borderBottomWidth: 0 }}>
              <Body style={{ borderBottomWidth: 0 }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'rgba(0,0,0,0.4)' }}>{Strings.ST50.toUpperCase()}</Text>
              </Body>
              <Right style={{ borderBottomWidth: 0 }}>
                <TouchableOpacity onPress={() => this.refs.modal3.open()} activeOpacity={1}>
                  <View style={{ padding: 3, paddingRight: 11, paddingLeft: 11, borderWidth: 1, borderRadius: 50, borderColor: 'rgba(0,0,0,0.3)' }}>
                    <Text style={{ fontSize: 10, color: 'rgba(0,0,0,0.4)' }}> {Strings.ST83.toUpperCase()} <Ionicons active name="ios-add" /></Text>
                  </View>
                </TouchableOpacity>
              </Right>
            </ListItem>

            <View style={{ height: 1, backgroundColor: '#EEE', width: width, marginBottom: 5 }}></View>

            <View style={{ margin: 15, marginTop: 0 }}>

              <ItemComments itemId={item.id} />

            </View>
            <View style={{ height: height * 0.10 }}>
            </View>
          </View>

        </ScrollView>

        <Modal style={[styles.modal, styles.modal3]} position={"center"} ref='modal3' swipeArea={20} swipeToClose={this.state.swipeToClose} onClosed={this.onClose} onOpened={this.onOpen} onClosingState={this.onClosingState} isDisabled={this.state.isDisabled} coverScreen={true}>
          <View style={{ marginTop: 8, marginBottom: 8 }}>
            <ItemForm itemId={this.state.item.id} closeModal={() => this.closeModal()} />
          </View>
        </Modal>

        <BannerAd />

      </Container>

    );
  }


}


