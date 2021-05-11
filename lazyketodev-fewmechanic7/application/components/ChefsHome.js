import React, {PureComponent} from 'react';
import { NavigationActions, StackNavigator, withNavigation} from 'react-navigation';
import{ ImageBackground, Dimensions, View, ScrollView, ActivityIndicator, TouchableOpacity, FlatList,Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Text, Footer, Icon, Item, Input, FooterTab, Button, Left, Right, Title, List, ListItem, Thumbnail} from 'native-base';
import Icono from 'react-native-vector-icons/Ionicons';
import SwiperFlatList from 'react-native-swiper-flatlist';
import ConfigApp from '../utils/ConfigApp';
import GridView from 'react-native-super-grid';
import Strings from '../utils/Strings';
import { LinearGradient } from 'expo-linear-gradient';
import ColorsApp from '../utils/ColorsApp';

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

class ChefsHome extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      chefs:[]
    };
  }


    componentDidMount() {
    
       return fetch(ConfigApp.URL+'json/data_chefs.php')
         .then((response) => response.json())
         .then((responseJson) => {
           this.setState({
             chefs: responseJson.filter((e, index) => { return index < 6 })
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


	render () {

		return (

<View style={{margin: 5}}>
        <FlatList
          data={ this.state.chefs }
          refreshing="false"
          numColumns={3}
          renderItem={({item}) => 
                <TouchableOpacity onPress={this.RecipesByChef.bind(this, item.chef_id, item.chef_title)} activeOpacity={1} style={{flex: 1, marginHorizontal: 5, marginBottom: 10, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={{uri: ConfigApp.URL+'images/'+item.chef_image}} style={{ height: 80,  width: 80, marginBottom: 10, borderRadius: 80/2 }} imageStyle={{borderRadius: 80/2}}/>
                <Text numberOfLines={1} style={{  color: '#9e9e9e', fontSize: 11, marginBottom: 5 }}>{item.chef_title}</Text>
                </TouchableOpacity>
}
        keyExtractor={(item, index) => index.toString()}

        />
</View>

		)
	}
}

export default withNavigation(ChefsHome);
