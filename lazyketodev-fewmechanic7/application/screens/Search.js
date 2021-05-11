import React, {Component} from 'react';
import { NavigationActions, StackNavigator, withNavigation} from 'react-navigation';
import{ ImageBackground, Dimensions, View, ScrollView, ActivityIndicator, TouchableOpacity, FlatList, Image, StatusBar } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Text, Footer, Icon, Item, Input, FooterTab, Button, Left, Right, Title, List, ListItem, Thumbnail} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import ConfigApp from '../utils/ConfigApp';
import AppPreLoader from '../components/AppPreLoader';
import Strings from '../utils/Strings';
import { LinearGradient } from 'expo-linear-gradient';
import ColorsApp from '../utils/ColorsApp';
import BannerAd from '../components/BannerAd';
import {Grid, Row, Col } from 'react-native-easy-grid';
import ListEmpty from '../components/ListEmpty';
import {OptimizedFlatList} from 'react-native-optimized-flatlist';

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

export default class Search extends Component {
   static navigationOptions = {
  headerShown: false
};

  constructor(props) {
    super(props);
    const {params} = props.navigation.state;
    this.state = {
      isLoaded: true,
      string: params.string,
      word: params.string
    };
  }

    componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = (string) => {
    
       this.setState({string});

       return fetch(ConfigApp.URL+'recipes/getrecipes/0/50?search='+this.state.string)
         .then((response) => response.json())
         .then((responseJson) => {
        if (responseJson == 'false') {
        
        }else{
          this.setState({
            recipes: responseJson,
            isLoading: false,

        });
        }
         })
         .catch((error) => {
         });
     }



ListEmptyView = () => {
    return (
      <ListEmpty/>
    );
  }

  RecipeDetails (item) {
    const navigateAction = NavigationActions.navigate({
      routeName: 'RecipeDetailsScreen',
      params: {item}
    });
    this.props.navigation.dispatch(navigateAction);
  }

	render () {

    if (this.state.isLoading) {
      return (
        <ActivityIndicator style={{height: 80}} size="large" color="#DDD" />
      );
    }

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
    <Text style={{fontSize: 16, color: '#000', fontWeight: 'bold' }}>{Strings.ST19}</Text>
    </Col>
    <Col style={{alignItems: 'flex-end', alignContent: 'flex-end', justifyContent: 'flex-end'}}>
    </Col>
</Grid>
</LinearGradient>

<View style={{marginHorizontal: 10, marginTop: 10,marginBottom: 5}}>
<Item regular style={{borderRadius: 10}}>

      <Ionicons name='md-search' style={{fontSize: 20, marginTop: 4, color: '#333', marginLeft: 20}} />
      <Input placeholder={Strings.ST40} onChangeText={this.makeRemoteRequest.bind(this)} placeholderTextColor="#a4a4a4" style={{fontSize: 15, color: '#a4a4a4'}} />
</Item>

</View>

<View style={{marginHorizontal: 12, marginTop: 10,marginBottom: 5}}>
{this.state.word == '' && this.state.string == null ? <Text style={{fontSize: 14 }}>{Strings.ST108}</Text> : <Text style={{fontSize: 14 }}>{Strings.ST107} <Text style={{fontWeight: 'bold', fontSize: 14 }}> {this.state.string == null ? this.state.word : this.state.string }</Text> </Text>}
</View>

<List>

<OptimizedFlatList
          data={ this.state.recipes }
          refreshing="false"
          renderItem={({item}) =>
                
            <ListItem style={{paddingLeft: 0, marginLeft: 0, backgroundColor:'#FFF', opacity: 1, borderColor: 'rgba(0,0,0,0.05)', borderBottomWidth: 1}}  onPress={() => this.RecipeDetails(item)} >
              <Thumbnail size={80} source={{ uri: item.image }} style={{paddingLeft: 10, marginLeft: 10, borderRadius: 10}} />
              <Body style={{paddingLeft: 0, marginLeft: 0}}>
                <Text numberOfLines={1} style={{fontSize: 14, fontWeight: 'bold', marginBottom: 5}}>
                {item.name}
                </Text>
                <View style={{flexDirection: 'row', marginBottom: 5}}>
                <Image source={require('../../assets/images/cooktime.png')} style={{width: 15, height: 15, marginLeft: 12, marginRight: -8}} />
                <Text style={{ fontSize: 12, color: '#9e9e9e'}}>{item.cook_time + item.prep_time} Minutes</Text>
                <Image source={require('../../assets/images/calories.png')} style={{width: 15, height: 15, marginRight: -8}} />
                <Text style={{ fontSize: 12, color: '#9e9e9e'}}>{item.nutr_total_carbohydrate - item.nutr_dietary_fiber}g Carbs</Text>
                  <Image source={require('../../assets/images/calories.png')} style={{ width: 15, height: 15, marginRight: -8 }} />
                  <Text style={{ fontSize: 12, color: '#9e9e9e' }}>{item.viewed} Views</Text>
                </View>
              </Body>
              <Right>
                <Text note>
                <Icon name="ios-arrow-forward" style={{fontSize: 16}}/>
                </Text>
              </Right>
            </ListItem>
          
}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={this.ListEmptyView}

        /> 

</List>

<View style={{height: height * 0.10}}/>

</ScrollView>

<BannerAd/>

</Container>

		)
	}
}
