import React, { Component } from 'react';
import { NavigationActions, StackNavigator, withNavigation } from 'react-navigation';
import { ImageBackground, Dimensions, View, ScrollView, ActivityIndicator, TouchableOpacity, FlatList, Image, StatusBar, Linking } from 'react-native';
import { Container, Header, Content, Body, Text, Item, Input, FooterTab, Button, Left, Right, Title, List, ListItem, Thumbnail } from 'native-base';
import { Ionicons, Entypo } from '@expo/vector-icons';
import ConfigApp from '../utils/ConfigApp';
import AppPreLoader from '../components/AppPreLoader';
import Strings from '../utils/Strings';
import { LinearGradient } from 'expo-linear-gradient';
import ColorsApp from '../utils/ColorsApp';
import BannerAd from '../components/BannerAd';
import { Grid, Row, Col } from 'react-native-easy-grid';

var styles = require('../../assets/files/Styles');
var { height, width } = Dimensions.get('window');

const html_beginnersGuide = `<link rel="stylesheet" href="https://lazyketo.app/app.css"><h1>Test</h1><a href="https://amazon.com">Amazon.com</a><br><ul><li>test</li><li>test 2</li></ul>`
const data = [
    {
        id: 1,
        name: 'Beginner\'s Guide',
        description: 'text',
        image: 'https://beta.lazyketo.app/uploads/recipeimage_20200122203802507.png',
        guide: html_beginnersGuide
    },
    {
        id: 2,
        name: 'Test 2',
        description: 'test2',
        image: 'https://beta.lazyketo.app/uploads/recipeimage_20200122203802507.png',
        guide: 'BeginnersGuideMain'
    },
    {
        id: 3,
        name: 'Test 3',
        description: 'test2',
        image: 'https://beta.lazyketo.app/uploads/recipeimage_20200122203802507.png',
        guide: 'BeginnersGuideMain'
    }
]

export default class BeginnersGuideMain extends Component {
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

    GuideDetail(item) {
        const navigateAction = NavigationActions.navigate({
            routeName: 'GuideDetailScreen',
            params: { item }
        });
        this.props.navigation.dispatch(navigateAction);
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
                                <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>Keto Beginner's Guide</Text>
                            </Col>
                            <Col style={{ alignItems: 'flex-end', alignContent: 'flex-end', justifyContent: 'flex-end' }}>
                            </Col>
                        </Grid>
                    </LinearGradient>
                    <View style={{ padding: 20, paddingTop: 10, backgroundColor: '#FFF' }}>
                    <FlatList
                        data={data}

                        refreshing="false"
                        renderItem={({ item }, index) =>


                            <TouchableOpacity onPress={() => this.GuideDetail(item)} activeOpacity={1} style={{ marginBottom: 15 }}>

                                <ImageBackground source={{ uri: item.image }} style={styles.guide_background_card}>
                                    <LinearGradient colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)']} style={styles.gradient_card}>
                                        {/* <LinearGradient colors={[ColorsApp.SECOND, ColorsApp.PRIMARY]} start={[0, 0]} end={[1, 0]} style={{ paddingHorizontal: 10, padding: 3, marginBottom: 5, borderRadius: 5, backgroundColor: ColorsApp.PRIMARY }}>
                                            <Text style={{ color: '#FFF', fontSize: 11 }}>{item.difficulty_text}</Text>
                                        </LinearGradient> */}
                                        <Text numberOfLines={3} style={styles.guide_title_card}>{item.name}</Text>
                                        <View style={{ flexDirection: 'row', marginTop: 3 }}>
                                            <Text style={{ fontSize: 12, color: '#fff' }}>{item.description}</Text>
                                        </View>

                                    </LinearGradient>
                                </ImageBackground>
                            </TouchableOpacity>
                        }
                        keyExtractor={(item, index) => index.toString()}


                    /></View>

                </ScrollView>

            </Container>

        )
    }

}