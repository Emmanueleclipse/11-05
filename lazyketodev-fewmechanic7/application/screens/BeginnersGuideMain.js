import React, { Component } from 'react';
import { NavigationActions, StackNavigator, withNavigation } from 'react-navigation';
import { ImageBackground, Dimensions, View, ScrollView, ActivityIndicator, TouchableOpacity, FlatList, Image, StatusBar, Linking } from 'react-native';
import { Container, Header, Content, Body, Text, Item, Input, FooterTab, Button, Left, Right, Title, List, ListItem, Thumbnail } from 'native-base';
import { Ionicons, Entypo } from '@expo/vector-icons';
import Strings from '../utils/Strings';
import { LinearGradient } from 'expo-linear-gradient';

import { Grid, Row, Col } from 'react-native-easy-grid';

var styles = require('./assets/files/Styles');
var { height, width } = Dimensions.get('window');

const data = `<div><h1>test</h1></div>`

export default class BeginnersGuideScreen extends Component {
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

    render() {

        return (

            <Container style={styles.background_general}>

                <LinearGradient colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.5)', 'rgba(255,255,255,0.0)']} style={{ position: 'absolute', top: 0, zIndex: 100, paddingTop: 45, paddingHorizontal: 30, width: width }}>
                </LinearGradient>
                <StatusBar barStyle="dark-content" />

                <ScrollView>

                    <LinearGradient colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.0)']} style={{ paddingTop: 45, paddingHorizontal: 30, width: width, marginBottom: 5 }}>

                        <Grid >
                            <Col style={{ alignItems: 'flex-start', alignContent: 'flex-start', justifyContent: 'flex-start' }}>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()} activeOpacity={1}>
                                    <Ionicons name="md-arrow-back" style={{ fontSize: 27, color: '#000' }} />
                                </TouchableOpacity>
                            </Col>
                            <Col size={2} style={{ alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>{Strings.ST7}</Text>
                            </Col>
                            <Col style={{ alignItems: 'flex-end', alignContent: 'flex-end', justifyContent: 'flex-end' }}>
                            </Col>
                        </Grid>
                    </LinearGradient>
                    <View style={{ margin: 10, backgroundColor: '#FFF' }}>
                        {/* <HTML html={item.directions} onLinkPress={(evt, href) => { Linking.openURL(data); }} /> */}
                        <Text>Test</Text>
                    </View>

                </ScrollView>

            </Container>

        )
    }

}