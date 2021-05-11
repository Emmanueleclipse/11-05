import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {Dimensions, ScrollView, View, Image, TouchableOpacity} from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Left, Thumbnail, Button, Body, Right, Switch } from 'native-base';
import Strings from '../utils/Strings';
import { SimpleLineIcons } from '@expo/vector-icons';


var {height, width} = Dimensions.get('window');
var styles = require('../../assets/files/Styles');

class SideMenu extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  }

  search=(string)=>
{
      this.props.navigation.navigate('SearchScreen', { string: '' });    
}

  render () {
    return (
      <View style={styles.container_menu}>
        <View style={styles.sideMenu}>
                  </View>

        <ScrollView>

                <ListItem style={styles.item_menu} onPress={this.navigateToScreen('RecipesCategoriesScreen')} icon>
              <Left style={{borderBottomWidth: 0}}>
                <SimpleLineIcons name="tag" style={styles.iconSidemenu}/>
            </Left>
            <Body style={{borderBottomWidth: 0}}>
                <Text style={styles.text_menu}>{Strings.ST2.toUpperCase()}</Text>
              </Body>
              <Right style={{borderBottomWidth: 0}}>
                <SimpleLineIcons name="arrow-right" style={styles.icon_menu} />
              </Right>
            </ListItem>

                <ListItem style={styles.item_menu} onPress={this.search.bind(this)} icon>
              <Left style={{borderBottomWidth: 0}}>
                <SimpleLineIcons name="magnifier" style={styles.iconSidemenu}/>
            </Left>
            <Body style={{borderBottomWidth: 0}}>
                <Text style={styles.text_menu}>{Strings.ST4.toUpperCase()}</Text>
              </Body>
              <Right style={{borderBottomWidth: 0}}>
                <SimpleLineIcons name="arrow-right" style={styles.icon_menu} />
              </Right>
            </ListItem>
          <ListItem style={styles.item_menu} onPress={this.navigateToScreen('RandomRecipeScreen')} icon>
            <Left style={{ borderBottomWidth: 0 }}>
              <SimpleLineIcons name="shuffle" style={styles.iconSidemenu} />
            </Left>
            <Body style={{ borderBottomWidth: 0 }}>
              <Text style={styles.text_menu}>{Strings.ST110.toUpperCase()}</Text>
            </Body>
            <Right style={{ borderBottomWidth: 0 }}>
              <SimpleLineIcons name="arrow-right" style={styles.icon_menu} />
            </Right>
          </ListItem>
          <ListItem style={styles.item_menu} onPress={this.navigateToScreen('ShoppingListScreen')} icon>
            <Left style={{ borderBottomWidth: 0 }}>
              <SimpleLineIcons name="basket" style={styles.iconSidemenu} />
            </Left>
            <Body style={{ borderBottomWidth: 0 }}>
              <Text style={styles.text_menu}>{Strings.ST112.toUpperCase()}</Text>
            </Body>
            <Right style={{ borderBottomWidth: 0 }}>
              <SimpleLineIcons name="arrow-right" style={styles.icon_menu} />
            </Right>
          </ListItem>
          
                <ListItem style={styles.item_menu} onPress={this.navigateToScreen('FavoritesScreen')} icon>
              <Left style={{borderBottomWidth: 0}}>
                <SimpleLineIcons name="heart" style={styles.iconSidemenu}/>
            </Left>
            <Body style={{borderBottomWidth: 0}}>
                <Text style={styles.text_menu}>{Strings.ST6.toUpperCase()}</Text>
              </Body>
              <Right style={{borderBottomWidth: 0}}>
                <SimpleLineIcons name="arrow-right" style={styles.icon_menu} />
              </Right>
            </ListItem>
          <ListItem style={styles.item_menu} onPress={this.navigateToScreen('PremiumScreen')} icon>
            <Left style={{ borderBottomWidth: 0 }}>
              <SimpleLineIcons name="diamond" style={styles.iconSidemenu} />
            </Left>
            <Body style={{ borderBottomWidth: 0 }}>
              <Text style={styles.text_menu}>{Strings.ST111.toUpperCase()}</Text>
            </Body>
            <Right style={{ borderBottomWidth: 0 }}>
              <SimpleLineIcons name="arrow-right" style={styles.icon_menu} />
            </Right>
          </ListItem>
          <ListItem style={styles.item_menu} onPress={this.navigateToScreen('BeginnersGuideScreen')} icon>
            <Left style={{ borderBottomWidth: 0 }}>
              <SimpleLineIcons name="book-open" style={styles.iconSidemenu} />
            </Left>
            <Body style={{ borderBottomWidth: 0 }}>
              <Text style={styles.text_menu}>{Strings.ST109.toUpperCase()}</Text>
            </Body>
            <Right style={{ borderBottomWidth: 0 }}>
              <SimpleLineIcons name="arrow-right" style={styles.icon_menu} />
            </Right>
          </ListItem>
          <ListItem style={styles.item_menu} onPress={this.navigateToScreen('KetoCalculatorScreen')} icon>
            <Left style={{ borderBottomWidth: 0 }}>
              <SimpleLineIcons name="calculator" style={styles.iconSidemenu} />
            </Left>
            <Body style={{ borderBottomWidth: 0 }}>
              <Text style={styles.text_menu}>{Strings.ST113.toUpperCase()}</Text>
            </Body>
            <Right style={{ borderBottomWidth: 0 }}>
              <SimpleLineIcons name="arrow-right" style={styles.icon_menu} />
            </Right>
          </ListItem>
                <ListItem style={styles.item_menu} onPress={this.navigateToScreen('SettingsScreen')} icon>
              <Left style={{borderBottomWidth: 0}}>
                <SimpleLineIcons name="settings" style={styles.iconSidemenu}/>
            </Left>
            <Body style={{borderBottomWidth: 0}}>
                <Text style={styles.text_menu}>{Strings.ST7.toUpperCase()}</Text>
              </Body>
              <Right style={{borderBottomWidth: 0}}>
                <SimpleLineIcons name="arrow-right" style={styles.icon_menu} />
              </Right>
            </ListItem>

            <ListItem style={styles.item_menu} onPress={this.navigateToScreen('LogoutScreen')} icon>
              <Left style={{borderBottomWidth: 0}}>
                <SimpleLineIcons name="login" style={styles.iconSidemenu}/>
            </Left>
            <Body style={{borderBottomWidth: 0}}>
                <Text style={styles.text_menu}>{Strings.ST8.toUpperCase()}</Text>
              </Body>
              <Right style={{borderBottomWidth: 0}}>
                <SimpleLineIcons name="arrow-right" style={styles.icon_menu} />
              </Right>
            </ListItem>
 
        </ScrollView>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;