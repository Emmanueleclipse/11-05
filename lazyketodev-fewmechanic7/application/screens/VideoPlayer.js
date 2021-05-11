import React, {Component} from 'react';
import AppPreLoader from '../components/AppPreLoader';
import { NavigationActions, StackNavigator } from 'react-navigation';
import {Dimensions, StatusBar, Platform, View, TouchableOpacity} from 'react-native';
import ConfigApp from '../utils/ConfigApp';
import { WebView } from 'react-native-webview';
import { Container, Text, Button} from 'native-base';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');


export default class VideoP extends Component {
static navigationOptions = {
  headerShown: false
};


  render() {

  var UrlVideo = this.props.navigation.state.params.VideoLINK;

    return (

<Container style={{backgroundColor: '#000000'}}>

<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{position: 'absolute', right: 15, top: 40,zIndex: 9999}}>
          <View style={{width: 30, height: 50}}>
            <Icon name='close' style={{color: '#fff', fontSize: 24}} />
          </View>
</TouchableOpacity>

<WebView
source={{ uri: 'https://www.youtube.com/embed/'+UrlVideo+'?rel=0&autoplay=0&showinfo=0&controls=0&playsinline=1&modestbranding=1'}}
style={{ width: width, height: height * 0.30}}
/>

</Container>

   );

  }

}