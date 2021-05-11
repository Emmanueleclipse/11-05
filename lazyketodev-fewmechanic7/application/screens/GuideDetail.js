import React, { Component } from 'react';
import { NavigationActions, StackNavigator, withNavigation } from 'react-navigation';
import { ImageBackground, Dimensions, View, Platform, TouchableOpacity, ScrollView, FlatList, Linking, Image, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { Container, Header, Content, Icon, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import { VictoryChart, VictoryAxis, VictoryBar } from 'victory-native';

import ConfigApp from '../utils/ConfigApp';
import Strings from '../utils/Strings';
import BannerAd from '../components/BannerAd';
import HTML from 'react-native-render-html';
import * as firebase from 'firebase';
import { LinearGradient } from 'expo-linear-gradient';
import ColorsApp from '../utils/ColorsApp';
import Modal from 'react-native-modalbox';
import WebView from 'react-native-webview';
import ItemForm from '../forms/ItemForm';
import ItemRating from '../components/ItemRating';
import Nutritional from '../components/Nutritional';
import ItemComments from '../forms/ItemComments';
import Box from '../components/Box';
import ToastModal from '../components/ToastModal';
import Toast from 'react-native-root-toast';


import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';

var styles = require('../../assets/files/Styles');
var { height, width } = Dimensions.get('window');

const htmlStyles = {h1: {color: 'red'}}


export default class GuideDetail extends Component {
    static navigationOptions = {
        headerShown: false
    };

    constructor(props) {
        super(props);
        const { params } = props.navigation.state;

        this.state = {
            item: params.item
        };

    }

    render() {

        const { item } = this.state;
 
        //Get user
        var user = firebase.auth().currentUser;

        return (

            <Container style={styles.background_general}>

                <LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.0)']} style={{ position: 'absolute', top: 0, zIndex: 100, paddingTop: 45, paddingHorizontal: 30, width: width }}>
                </LinearGradient>
                <StatusBar barStyle="light-content" />

                <LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.0)']} style={{ position: 'absolute', top: 0, zIndex: 130, paddingTop: 45, paddingHorizontal: 30, width: width }}>

                    <Grid >
                        <Col style={{ alignItems: 'flex-start', alignContent: 'flex-start', justifyContent: 'flex-start' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()} activeOpacity={1}>
                                <Ionicons name="md-arrow-back" style={{ fontSize: 27, color: '#FFFFFF' }} />
                            </TouchableOpacity>
                        </Col>
                    </Grid>
                </LinearGradient>

                <ImageBackground source={{ uri: item.image }} style={{ height: height * 0.2, alignItems: 'flex-start', justifyContent: 'flex-end' }} resizeMode="cover">
                    <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.15)', 'rgba(0,0,0,0.55)']} style={{ height: height * 0.20, width: width, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: height * 0.045 }}>
                        
                        
                        
                        
                        <Text numberOfLines={2} style={{
                            fontSize: 26, fontWeight: 'bold', color: '#FFF', marginLeft: 5, marginTop: 2, marginBottom: 5, shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 8,
                            },
                            shadowOpacity: 0.46,
                            shadowRadius: 11.14,

                            elevation: 17 }}>{item.name}</Text>
                        
                    </LinearGradient>
                </ImageBackground>
                <ScrollView>

                    <View style={{ margin: 0, backgroundColor: '#FFF' }}>
                                <View style={{ marginHorizontal: width * 0.05 }}>
                                
                            <HTML tagStyles = { htmlStyles } html={item.guide} onLinkPress={(evt, href) => { Linking.openURL(href); }} />
                                </View>
                    </View>
                    
                </ScrollView>

                <Modal style={[styles.modal, styles.modal3]} position={"center"} ref='modal3' swipeArea={20} swipeToClose={this.state.swipeToClose} onClosed={this.onClose} onOpened={this.onOpen} onClosingState={this.onClosingState} isDisabled={this.state.isDisabled} coverScreen={true}>
                    <View style={{ marginTop: 8, marginBottom: 8 }}>
                        <ItemForm itemId={this.state.item.id} closeModal={() => this.closeModal()} />
                    </View>
                </Modal>

                <BannerAd />

            </Container>

        );
    }


}