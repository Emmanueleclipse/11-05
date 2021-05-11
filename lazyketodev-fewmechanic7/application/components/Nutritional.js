import React, { Component } from 'react';
import { Container, Header, Content, Icon, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Item } from 'native-base';
import { View } from 'react-native';
import ConfigApp from '../utils/ConfigApp';
import { AdMobBanner } from 'expo-ads-admob';
import { isIphoneX } from 'react-native-device-detection';
const Device = require('react-native-device-detection');

var styles = require('../../assets/files/Styles');

class Nutritional extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            recipes: []
        };
        
    }



    render() {

        return (

            <View>
               <Text>{item.id}r</Text>
            </View>

        )
    }

}

export default Nutritional;
