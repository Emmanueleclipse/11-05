import React, {PureComponent} from 'react';
import { NavigationActions, StackNavigator, withNavigation} from 'react-navigation';
import{ ImageBackground, Dimensions, View, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import { Container, Text} from 'native-base';
import Icono from 'react-native-vector-icons/Ionicons';
import Carousel from 'react-native-snap-carousel';
import ConfigApp from '../utils/ConfigApp';
import AppPreLoader from './AppPreLoader';
import Strings from '../utils/Strings';
import ColorsApp from '../utils/ColorsApp';
import ItemRating from './ItemRating';

var {height, width} = Dimensions.get('window');

class RecipesHome extends React.PureComponent {


  constructor(props) {
    super(props);
    this.state = {
      recipes:[]
    };
    this._carousel = {};
  }


    componentDidMount() {
    
       return fetch('https://beta.lazyketo.app/recipes/getrecipes?category=0')
         .then((response) => response.json())
         .then((responseJson) => {
           this.setState({
             recipes: responseJson
           }, function() {
			   
           });
         })
         .catch((error) => {
           console.error(error);
         });
     }

  RecipeDetails (item) {
    const navigateAction = NavigationActions.navigate({
      routeName: 'RecipeDetailsScreen',
      params: {item}
    });
    this.props.navigation.dispatch(navigateAction);
  }

    _renderItem ({item, index}) {
        return (
            <TouchableOpacity onPress={() => this.RecipeDetails(item)} activeOpacity={1} style={{flex: 1, marginRight: 10}}>
    <ImageBackground source={{uri: item.image}} style={{ height: 140,  width: width*0.7, borderTopLeftRadius: 10, borderTopRightRadius: 10, overflow: 'hidden'}} imageStyle={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, overflow: 'hidden' }}>
    </ImageBackground>
    <View style={{ padding: 6,  width: width*0.7, borderColor: '#EEE', borderTopWidth: 0, borderWidth: 1, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
    <Text numberOfLines={1} style={{ color: '#000', fontSize: 14, fontWeight: 'bold', marginBottom: 5}}>{item.name}</Text>
    <View style={{flexDirection: 'column', marginBottom: 5}}>
    <Text style={{ fontSize: 13, color: '#a4a4a4', marginBottom: 5}}>{item.difficulty}</Text>
    <Text style={{ fontSize: 13, color: '#a4a4a4', marginBottom: 5}}>{item.nutr_total_carbohydrate-item.nutr_dietary_fiber}g Carbs</Text>
    </View>

    </View>
    </TouchableOpacity>
        );
    }

	render () {
    
		return (

            <Carousel
              ref={(c) => { this._carousel = c; }}
              data={this.state.recipes}
              renderItem={({item}) =>
                <TouchableOpacity onPress={() => this.RecipeDetails(item)} activeOpacity={1} style={{flex: 1, marginRight: 10}}>
    <ImageBackground source={{uri: item.image}} style={{ height: 140,  width: width*0.7, borderTopLeftRadius: 10, borderTopRightRadius: 10, overflow: 'hidden'}} imageStyle={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, overflow: 'hidden' }}>
    </ImageBackground>
    <View style={{ padding: 6,  width: width*0.7, borderColor: '#EEE', borderTopWidth: 0, borderWidth: 1, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
    <Text numberOfLines={1} style={{ color: '#000', fontSize: 14, fontWeight: 'bold', marginBottom: 5}}>{item.name}</Text>
    <View style={{flexDirection: 'column', marginBottom: 5}}>
                      <Text style={{ fontSize: 13, color: '#a4a4a4', marginBottom: 5 }}>{item.nutr_total_carbohydrate - item.nutr_dietary_fiber}g Carbs per serving</Text>
    </View>

    </View>
    </TouchableOpacity>

              }
              sliderWidth={width}
              itemWidth={width*0.7}
          layout={'default'}
          firstItem={1}
          loop={true}
          activeSlideOffset={2}
            />

		)
	}
}

export default withNavigation(RecipesHome);
