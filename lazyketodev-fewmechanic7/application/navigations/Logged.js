import React from 'react';
import SideMenu from './SideMenu';
import Icon from 'react-native-vector-icons/Ionicons';
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from 'react-navigation-stack';
import {Dimensions, Text} from "react-native";
import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
var styles = require('../../assets/files/Styles');

var {height, width} = Dimensions.get('window');

import HomeScreen from '../screens/Home';
import RecipesCategoriesScreen from '../screens/Categories';
import RecipesByCategoryScreen from '../screens/RecipesByCategory';
import RecipeDetailsScreen from '../screens/RecipeDetails';
import GuideDetailScreen from '../screens/GuideDetail';
import SearchScreen from '../screens/Search';
import FavoritesScreen from "../screens/Favorites";
import LogoutScreen from "../screens/Logout";
import SettingsScreen from "../screens/Settings";
import TermsScreen from "../screens/Terms";
import AboutUsScreen from "../screens/AboutUs";
import ContactUsScreen from "../screens/ContactUs";
import VideoPlayerScreen from "../screens/VideoPlayer";
import KetoCalculatorScreen from "../screens/KetoCalculator";
import BeginnersGuideScreen from "../screens/BeginnersGuide";
import PremiumScreen from "../screens/Premium";
import RandomRecipeScreen from "../screens/RandomRecipe";
import ShoppingListScreen from "../screens/ShoppingList";
import CalculatorStepOne from "../screens/Calculator/StepOne"

//var user = firebase.auth().currentUser;
//console.log(user.uid)


const leftIcon = (navigation, icon) => <Icon
	name={icon}
	style={{marginLeft: 20}}
	size={27}
	color="white"
	onPress={() => navigation.navigate('DrawerOpen')}
/>;

const navigationOptions = {
  defaultNavigationOptions: {
    headerStyle: styles.headerStyle,
    headerBackTitle: null,
    headerTintColor: '#fff',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center',
      fontSize: 18,
      color: '#fff',
      fontWeight: 'bold'
    }
  }
};

const HomeNavigator = createStackNavigator(

{
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: ({navigation}) => ({
	  headerLeft: leftIcon(navigation, 'md-menu')
	})
  },
  RecipesCategoriesScreen: {
    screen: RecipesCategoriesScreen
  },
  RecipesByCategoryScreen: {
    screen: RecipesByCategoryScreen
  },
  RecipeDetailsScreen: {
    screen: RecipeDetailsScreen
  },
    GuideDetailScreen: {
      screen: GuideDetailScreen
    },
   SearchScreen: {
    screen: SearchScreen
  },
  FavoritesScreen: {
    screen: FavoritesScreen
  },
  LogoutScreen: {
    screen: LogoutScreen
  },
  SettingsScreen: {
    screen: SettingsScreen
  },
  AboutUsScreen: {
    screen: AboutUsScreen
  },
  TermsScreen: {
    screen: TermsScreen
  },
  ContactUsScreen: {
    screen: ContactUsScreen
  },
  VideoPlayerScreen: {
    screen: VideoPlayerScreen
  },
  KetoCalculatorScreen: {
    screen: KetoCalculatorScreen
  },
  BeginnersGuideScreen: {
    screen: BeginnersGuideScreen
  },
    PremiumScreen: {
      screen: PremiumScreen
    },
    RandomRecipeScreen: {
      screen: RandomRecipeScreen
    },
    ShoppingListScreen: {
      screen: ShoppingListScreen
    },
    CalculatorStepOne: {
      screen: CalculatorStepOne
    },

}, navigationOptions

);

const RootStack = createDrawerNavigator({
Home: {
    screen: HomeNavigator,
  },
}, {
  contentComponent: SideMenu,
  drawerWidth: width * .7,
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
});

export default createAppContainer(RootStack)