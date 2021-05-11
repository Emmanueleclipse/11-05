import React, {Component} from 'react';
import { NavigationActions, StackNavigator } from 'react-navigation';
import{ ImageBackground, Dimensions, View, Platform, ScrollView, SafeAreaView, TouchableOpacity, FlatList, Image, StatusBar} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Text, Footer, Icon, FooterTab, Button, Left, Right, Title, List, ListItem, Thumbnail} from 'native-base';
import {Grid, Row, Col } from 'react-native-easy-grid';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import ConfigApp from '../utils/ConfigApp';
import AppPreLoader from '../components/AppPreLoader';
import Strings from '../utils/Strings';
import BannerAd from '../components/BannerAd';
import NativeBannerAd from '../components/NativeBannerAd';

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');
const equalWidth =  (width / 2 );

export default class Categories extends Component {
static navigationOptions = {
  headerShown: false
};

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    
    return fetch(ConfigApp.URL +'recipes/getcategories')
         .then((response) => response.json())
         .then((responseJson) => {
           this.setState({
             isLoading: false,
             categories: responseJson
           }, function() {
           });
         })
         .catch((error) => {
           console.error(error);
         });
     }

RecipesByCategory=(id, name)=>
{
      this.props.navigation.navigate('RecipesByCategoryScreen', { IdCategory: id, TitleCategory: name });    
}

  search=(string)=>
{
      this.props.navigation.navigate('SearchScreen', { string: '' });    
}

  render () {

      if (this.state.isLoading) {
      return (
        <AppPreLoader/>
      );
    }

    const { params } = this.props.navigation.state;

    return (

<Container style={styles.background_general}>

<LinearGradient colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.5)', 'rgba(255,255,255,0.0)']} style={{position: 'absolute', top: 0, zIndex: 100, paddingTop: 45, paddingHorizontal: 30, width: width}}>
</LinearGradient>
<StatusBar barStyle="dark-content"/>

<ScrollView>

<LinearGradient colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.0)']} style={{paddingTop: 45, paddingHorizontal: 30, width: width, marginBottom: 5}}>

<Grid >
    <Col style={{alignItems: 'flex-start', alignContent: 'flex-start', justifyContent: 'flex-start'}}>
      <TouchableOpacity onPress={() => this.props.navigation.goBack()} activeOpacity={1}>
<Ionicons name="md-arrow-back" style={{fontSize: 27, color: '#000'}}/>
</TouchableOpacity>
    </Col>
        <Col size={2} style={{alignItems: 'center', alignContent: 'center', justifyContent: 'center'}}>
    <Text style={{fontSize: 16, color: '#000', fontWeight: 'bold' }}>{Strings.ST2}</Text>
    </Col>
    <Col style={{alignItems: 'flex-end', alignContent: 'flex-end', justifyContent: 'flex-end'}}>
    <TouchableOpacity onPress={this.search.bind(this)} activeOpacity={1}>
<Ionicons name="md-search" style={{fontSize: 27, color: '#000'}}/>
</TouchableOpacity>
    </Col>
</Grid>
</LinearGradient>

<View style={{padding: 20, paddingTop: 10, backgroundColor: '#FFF'}}>

        <FlatList
          data={ this.state.categories }
          refreshing="false"
          numColumns={2}
          renderItem={({item}) => 
                <TouchableOpacity onPress={this.RecipesByCategory.bind(this, item.id, item.name)} activeOpacity={1} style={{flex: 1, marginHorizontal: 5}}>
                <ImageBackground source={{uri: item.image}} style={{ height: 110,  width: null, marginBottom: 10, borderRadius: 10}} imageStyle={{borderRadius: 10}}>
                    <LinearGradient colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.5)']} style={{ height: 110,  width: null, alignItems: 'center', justifyContent: 'center', borderRadius: 10  }}>
                            <Text numberOfLines={1} style={{color: '#FFF', fontWeight: 'bold', fontSize: 14 }}>{item.name.toUpperCase()}</Text>
                    </LinearGradient>
                </ImageBackground>
                </TouchableOpacity>
                
}
        keyExtractor={(item, index) => index.toString()}

        />
</View>
       
<View style={{height: height * 0.10}}/>

</ScrollView>

<BannerAd/>

</Container>


    )
  }
}