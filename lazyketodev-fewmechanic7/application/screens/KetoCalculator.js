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
import { TextInput } from 'react-native-paper';
import { Grid, Row, Col } from 'react-native-easy-grid';
import AsyncStorage from '@react-native-async-storage/async-storage';

var styles = require('../../assets/files/Styles');
var { height, width } = Dimensions.get('window');



    
export default class KetoCalculatorScreen extends Component {
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

    async NextStep() {

        const navigateAction = NavigationActions.navigate({
            routeName: 'CalculatorStepOne',
         });
        try {
            await AsyncStorage.setItem(
                'test', 'test222'
            );
        } catch (error) {
            // Error saving data
        }
       
        this.props.navigation.dispatch(navigateAction);
    }

    render() {
        
        return (

            <Container style={styles.background_general}>

             
                <ScrollView>
                    <LinearGradient colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.5)', 'rgba(255,255,255,0.0)']} style={{ position: 'absolute', top: 0, zIndex: 100, paddingTop: 45, paddingHorizontal: 30, width: width }}>
                    </LinearGradient>
                    <StatusBar barStyle="dark-content" />
                    <LinearGradient colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.0)']} style={{ paddingTop: 45, paddingHorizontal: 30, width: width, marginBottom: 5 }}>

                        <Grid >
                            <Col style={{ alignItems: 'flex-start', alignContent: 'flex-start', justifyContent: 'flex-start' }}>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()} activeOpacity={1}>
                                    <Ionicons name="md-arrow-back" style={{ fontSize: 27, color: '#000' }} />
                                </TouchableOpacity>
                            </Col>
                            <Col size={2} style={{ alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>{Strings.ST113}</Text>
                            </Col>
                            <Col style={{ alignItems: 'flex-end', alignContent: 'flex-end', justifyContent: 'flex-end' }}>
                            </Col>
                        </Grid>
                    </LinearGradient>
                    
                    <View style={{ marginTop: 20 }}>
                        <TextInput
                            label="Email"
                            
                            
                        />
                        <Button
                            onPress={() => this.NextStep()}
                            title="Learn More"
                            color="#841584"
                            accessibilityLabel="Learn more about this purple button"
                        />
                    </View>
                </ScrollView>

            </Container>

        )
    }

}