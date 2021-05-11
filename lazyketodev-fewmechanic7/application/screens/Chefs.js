import React, {Component} from 'react';
import { NavigationActions, StackNavigator } from 'react-navigation';
import{ ImageBackground, Dimensions, View, ScrollView, SafeAreaView, TouchableOpacity, FlatList, Image, StatusBar} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Text, Footer, Icon, FooterTab, Button, Left, Right, Title, List, ListItem, Thumbnail} from 'native-base';
import {Grid, Row, Col } from 'react-native-easy-grid';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import ConfigApp from '../utils/ConfigApp';
import AppPreLoader from '../components/AppPreLoader';
import Strings from '../utils/Strings';
import BannerAd from '../components/BannerAd';

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');
const equalWidth =  (width / 2 );

export default class ChefsScreen extends Component {
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
    
       return fetch(ConfigApp.URL+'json/data_chefs.php')
         .then((response) => response.json())
         .then((responseJson) => {
           this.setState({
             isLoading: false,
             chefs: responseJson
           }, function() {
           });
         })
         .catch((error) => {
           console.error(error);
         });
     }

RecipesByChef=(chef_id, chef_title)=>
{
      this.props.navigation.navigate('RecipesByChefScreen', { IdChef: chef_id, TitleChef: chef_title });    
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
    <Text style={{fontSize: 16, color: '#000', fontWeight: 'bold' }}>{Strings.ST3}</Text>
    </Col>
    <Col style={{alignItems: 'flex-end', alignContent: 'flex-end', justifyContent: 'flex-end'}}>
    <TouchableOpacity onPress={this.search.bind(this)} activeOpacity={1}>
<Ionicons name="md-search" style={{fontSize: 27, color: '#000'}}/>
</TouchableOpacity>
    </Col>
</Grid>
</LinearGradient>

<View style={{padding: 5, paddingTop: 10, backgroundColor: '#FFF'}}>

        <FlatList
          data={ this.state.chefs }
          refreshing="false"
          numColumns={3}
          renderItem={({item}) => 
                <TouchableOpacity onPress={this.RecipesByChef.bind(this, item.chef_id, item.chef_title)} activeOpacity={1} style={{flex: 1, marginHorizontal: 5, marginBottom: 15, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={{uri: ConfigApp.URL+'images/'+item.chef_image}} style={{ height: 80,  width: 80, marginBottom: 10, borderRadius: 80/2 }} imageStyle={{borderRadius: 80/2}}/>
                <Text numberOfLines={1} style={{  color: '#9e9e9e', fontSize: 11, marginBottom: 5 }}>{item.chef_title}</Text>
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