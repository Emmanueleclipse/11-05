import React, {Component} from 'react';
import { NavigationActions, StackNavigator, withNavigation} from 'react-navigation';
import{ ImageBackground, Dimensions, View, ScrollView, ActivityIndicator, TouchableOpacity, FlatList, Image, StatusBar, Linking } from 'react-native';
import { Container, Header, Content, Body, Text, Item, Input, FooterTab, Button, Left, Right, Title, List, ListItem, Thumbnail} from 'native-base';
import { Ionicons, Entypo } from '@expo/vector-icons';
import ConfigApp from '../utils/ConfigApp';
import AppPreLoader from '../components/AppPreLoader';
import Strings from '../utils/Strings';
import { LinearGradient } from 'expo-linear-gradient';
import ColorsApp from '../utils/ColorsApp';
import BannerAd from '../components/BannerAd';
import {Grid, Row, Col } from 'react-native-easy-grid';

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

export default class Settings extends Component {
   static navigationOptions = {
  headerShown: false
};


constructor(props) {

    super(props);

    this.state = {
      loading: true,
      rated: false
    }

  }

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render () {

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
    <Text style={{fontSize: 16, color: '#000', fontWeight: 'bold' }}>{Strings.ST7}</Text>
    </Col>
    <Col style={{alignItems: 'flex-end', alignContent: 'flex-end', justifyContent: 'flex-end'}}>
    </Col>
</Grid>
</LinearGradient>

<Grid>

<Row style={{flexDirection:'column', justifyContent: 'center', alignItems: 'center',  backgroundColor: '#FFF', height: height * 0.30, padding:30, paddingBottom: 0}}>
<Image
      source={require('../../assets/images/logo_dark.png')}
      style={{flex: 1, width: 130, height: 130}}
      resizeMode='contain'/>
</Row>

</Grid>

<View style={{padding: 45, paddingTop: 30}}>

<List>
            <ListItem icon style={{marginLeft: 0, borderBottomWidth: 0}} onPress={this.navigateToScreen('AboutUsScreen')}>
              <Left style={{borderBottomWidth: 0}}>
              </Left>
              <Body style={{borderBottomWidth: 0}}>
                <Text>{Strings.ST9}</Text>
              </Body>
              <Right style={{borderBottomWidth: 0}}>
              </Right>
            </ListItem>

            <ListItem icon style={{marginLeft: 0, borderBottomWidth: 0}} onPress={this.navigateToScreen('ContactUsScreen')}>
              <Left style={{borderBottomWidth: 0}}>
              </Left>
              <Body style={{borderBottomWidth: 0}}>
                <Text>{Strings.ST75}</Text>
              </Body>
              <Right style={{borderBottomWidth: 0}}>
              </Right>
            </ListItem>

            <ListItem icon style={{marginLeft: 0, borderBottomWidth: 0}} onPress={this.navigateToScreen('TermsScreen')}>
              <Left style={{borderBottomWidth: 0}}>
              </Left>
              <Body style={{borderBottomWidth: 0}}>
                <Text>{Strings.ST82}</Text>
              </Body>
              <Right style={{borderBottomWidth: 0}}>
              </Right>
            </ListItem>
     
          </List>

</View>

<View style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', paddingTop: 10}}>
<TouchableOpacity onPress={ ()=>{ Linking.openURL(ConfigApp.FACEBOOK)}}><Entypo name="facebook-with-circle" style={styles.socialIcon}/></TouchableOpacity>
<TouchableOpacity onPress={ ()=>{ Linking.openURL(ConfigApp.YOUTUBE)}}><Entypo name="youtube-with-circle" style={styles.socialIcon}/></TouchableOpacity>
<TouchableOpacity onPress={ ()=>{ Linking.openURL(ConfigApp.TWITTER)}}><Entypo name="twitter-with-circle" style={styles.socialIcon}/></TouchableOpacity>
<TouchableOpacity onPress={ ()=>{ Linking.openURL(ConfigApp.INSTAGRAM)}}><Entypo name="instagram-with-circle" style={styles.socialIcon}/></TouchableOpacity>

</View>

</ScrollView>

</Container>

    )
  }

}