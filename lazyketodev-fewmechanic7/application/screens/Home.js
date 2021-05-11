import React, {Component} from 'react';
import * as firebase from 'firebase';
import { NavigationActions } from 'react-navigation';
import { DrawerActions } from "react-navigation-drawer";
import{ ImageBackground, Dimensions, View, ScrollView, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Text, Footer, Icon, Item, Input, FooterTab, Button, Left, Right, Title, List, ListItem, Thumbnail} from 'native-base';
import {Grid, Row, Col } from 'react-native-easy-grid';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import SwiperFlatList from 'react-native-swiper-flatlist';
import ConfigApp from '../utils/ConfigApp';
import RecipesHome from '../components/RecipesHome';
import GridRecipesHome from '../components/GridRecipesHome';
import CategoriesHome from '../components/CategoriesHome';
import ChefsHome from '../components/ChefsHome';
import GridView from 'react-native-super-grid';
import Strings from '../utils/Strings';
import NativeBannerAd from '../components/NativeBannerAd';
import RectBannerAd from '../components/RectBannerAd';
import ColorsApp from '../utils/ColorsApp';

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');
const equalWidth =  (width / 2 );



export default class Home extends Component {
  static navigationOptions = {
  headerShown: false
};

  constructor(props) {
    super(props);
    this.state = {
      string: ''
    };
    
  }

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  }

  categories() {

    const navigateAction = NavigationActions.navigate({
      routeName: 'RecipesCategoriesScreen'
    });
    this.props.navigation.dispatch(navigateAction);
    
  }

  search=(string)=>
{
      this.props.navigation.navigate('SearchScreen', { string: this.state.string });    
}

  render () {

    return (

<Container style={styles.background_general}>

<LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.0)']} style={{position: 'absolute', top: 0, zIndex: 100, paddingTop: 45, paddingHorizontal: 30, width: width}}>
</LinearGradient>


<ScrollView>


<LinearGradient colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.0)']} style={{position: 'absolute', top: 0, zIndex: 100, paddingTop: 45, paddingHorizontal: 30, width: width}}>

<Grid >
    <Col style={{alignItems: 'flex-start', alignContent: 'flex-start', justifyContent: 'flex-start'}}>
      <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} activeOpacity={1}>
<Ionicons name="md-menu" style={{fontSize: 27, color: '#FFFFFF'}}/>
</TouchableOpacity>
    </Col>
    <Col style={{alignItems: 'flex-end', alignContent: 'flex-end', justifyContent: 'flex-end'}}>
    <TouchableOpacity onPress={this.search.bind(this)} activeOpacity={1}>
<Ionicons name="md-search" style={{fontSize: 27, color: '#FFFFFF'}}/>
</TouchableOpacity>
    </Col>
</Grid>
</LinearGradient>


<ImageBackground source={require('../../assets/images/header.jpg')} style={{flexDirection:'column',height: height * 0.35, alignItems: 'center', justifyContent: 'center' }}>
<Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 5 , marginTop: 20}}>{Strings.ST38}</Text>
<Text style={{color: '#fff', fontSize: 18, fontWeight: '300' }}>{Strings.ST39}</Text>
</ImageBackground>

<View style={{position: 'relative', marginTop: -25, zIndex: 100, alignItems: 'center', alignContent: 'center', justifyContent: 'center' }} >
<Item rounded style={styles.itemSearch}>
      <TouchableOpacity onPress={this.search.bind(this, this.state.string)} activeOpacity={1}>
      <LinearGradient colors={[ColorsApp.SECOND, ColorsApp.PRIMARY]} start={[0, 0]} end={[1, 0]} style={styles.homesearch} activeOpacity={1}>
      <Ionicons name='md-search' style={{fontSize: 20, color: '#FFF'}} />
      </LinearGradient>
      </TouchableOpacity> 
            <Input placeholder={Strings.ST40} onChangeText={string => this.setState({string})} placeholderTextColor="#a4a4a4" style={{fontSize: 15, color: '#a4a4a4'}} />
</Item>
</View>

          <ListItem icon style={{borderBottomWidth: 0}}>
            <Body style={{borderBottomWidth: 0}}>
              <Text style={{fontSize: 14, fontWeight: 'bold', color: 'rgba(0,0,0,0.6)' }}>{Strings.ST10.toUpperCase()}</Text>
            </Body>
          </ListItem>

<RecipesHome/>


          <ListItem icon style={{borderBottomWidth: 0, marginTop: 12}}>
            <Body style={{borderBottomWidth: 0}}>
              <Text style={{fontSize: 14, fontWeight: 'bold', color: 'rgba(0,0,0,0.6)' }}>{Strings.ST11.toUpperCase()}</Text>
            </Body>
            <Right style={{borderBottomWidth: 0}}>
                  <TouchableOpacity onPress={this.categories.bind(this)} activeOpacity={1}>
                  <View style={{padding: 3, paddingRight: 11, paddingLeft: 11, borderWidth: 1, borderRadius: 50, borderColor: 'rgba(0,0,0,0.2)'}}>
                  
                  <Text style={{fontSize: 10, color: 'rgba(0,0,0,0.2)'}}> {Strings.ST43.toUpperCase()} <Ionicons active name="ios-arrow-forward" /></Text>
                  </View>
                  </TouchableOpacity>
            </Right>
          </ListItem>


        <CategoriesHome/>

        <View style={{alignItems: 'center', alignContent: 'center', justifyContent: 'center', marginVertical: 5}}>
        <NativeBannerAd/>
        </View>


          <ListItem icon style={{borderBottomWidth: 0}}>
            <Body style={{borderBottomWidth: 0}}>
              <Text style={{fontSize: 14, fontWeight: 'bold', color: 'rgba(0,0,0,0.6)' }}>{Strings.ST12.toUpperCase()}</Text>
            </Body>
            <Right style={{borderBottomWidth: 0}}>
                  <TouchableOpacity onPress={this.search.bind(this)} activeOpacity={1}>
                  <View style={{padding: 3, paddingRight: 11, paddingLeft: 11, borderWidth: 1, borderRadius: 50, borderColor: 'rgba(0,0,0,0.2)'}}>
                  
                  <Text style={{fontSize: 10, color: 'rgba(0,0,0,0.2)'}}> {Strings.ST43.toUpperCase()} <Ionicons active name="ios-arrow-forward" /></Text>
                  </View>
                  </TouchableOpacity>
            </Right>
          </ListItem>

        
<GridRecipesHome/>
          <View style={{
            marginTop: height * 0.05,
            justifyContent: 'center',
            alignItems: 'center'}}>
          <RectBannerAd />
     </View>




 <View style={{height: height * 0.05}}>
    </View>

</ScrollView>

</Container>


    )
  }
}