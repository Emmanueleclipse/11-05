import React, { Component } from 'react';
import { NavigationActions, StackNavigator } from 'react-navigation';
import AppPreLoader from '../components/AppPreLoader';
import { ImageBackground, Dimensions, View, TouchableOpacity, FlatList, Button, ActivityIndicator, Image, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Container, Text, Body, Right, List, ListView, Thumbnail, ListItem } from 'native-base';
import ConfigApp from '../utils/ConfigApp';
import Strings from '../utils/Strings';
import BannerAd from '../components/BannerAd';
import { Grid, Row, Col } from 'react-native-easy-grid';
import ColorsApp from '../utils/ColorsApp';


var styles = require('../../assets/files/Styles');
var { height, width } = Dimensions.get('window');

export default class RandomRecipe extends Component {
    static navigationOptions = {
        headerShown: false
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        };
       
        
    }
    
    componentDidMount() {

        return fetch(ConfigApp.URL + 'recipes/randomrecipes/20', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                const recipeIndex = responseJson.recipes;
                this.setState({
                    recipes: recipeIndex,
                    isLoading:false
                }, function () {
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }


    RecipeDetails(item) {
        const navigateAction = NavigationActions.navigate({
            routeName: 'RecipeDetailsScreen',
            params: { item }
        });
        this.props.navigation.dispatch(navigateAction);
    }

    refreshScreen() {
        this.setState({ lastRefresh: Date(Date.now()).toString() })
    }

    search = (string) => {
        this.props.navigation.navigate('SearchScreen', { string: '' });
    }

    async loadMore() {
        this.setState({ isLoading: true });
        if (this.state.isLoading === true) {
            /// Avoid make another request is there's happening a request right now
console.log('loading true')
            return;
        }
        console.log(this.state.isLoading)
        
        console.log(this.state.isLoading)
        fetch(ConfigApp.URL + 'recipes/randomrecipes/20', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                const recipeIndex = responseJson.recipes;
                //console.log('load more pls')
                //console.log(recipeIndex)
                let stateRecipes = this.state.recipes

                this.setState({
                    recipes: stateRecipes.concat(recipeIndex),
                    isLoading: false
                }, function () {

                });
            })
            .catch((error) => {
                console.error(error);
            });
            

    }

    render() {

      

        const { params } = this.props.navigation.state;
        console.log(this.state.recipes)

        return (
            
            <Container style={styles.background_general}>

                <LinearGradient colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.5)', 'rgba(255,255,255,0.0)']} style={{ position: 'absolute', top: 0, zIndex: 100, paddingTop: 45, paddingHorizontal: 30, width: width }}>
                </LinearGradient>
                <StatusBar barStyle="dark-content" />

                <ScrollView>

                    <LinearGradient colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.0)']} style={{ paddingTop: 45, paddingHorizontal: 30, width: width, marginBottom: 5 }}>

                        <Grid>
                            <Col style={{ alignItems: 'flex-start', alignContent: 'flex-start', justifyContent: 'flex-start' }}>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()} activeOpacity={1}>
                                    <Ionicons name="md-arrow-back" style={{ fontSize: 27, color: '#000' }} />
                                </TouchableOpacity>
                            </Col>
                            <Col size={2} style={{ alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>Random Recipe</Text>
                            </Col>
                            <Col style={{ alignItems: 'flex-end', alignContent: 'flex-end', justifyContent: 'flex-end' }}>
                                <TouchableOpacity onPress={this.search.bind(this)} activeOpacity={1}>
                                    <Ionicons name="md-search" style={{ fontSize: 27, color: '#000' }} />
                                </TouchableOpacity>
                            </Col>
                        </Grid>
                    </LinearGradient>

                    <View style={{ padding: 20, paddingTop: 10, backgroundColor: '#FFF' }}>
                    <Text style={{ fontWeight: 'bold' }}>Here are a few recipes we think you'll enjoy...</Text>
                    </View>
                    <View style={{ padding: 20, paddingTop: 10, backgroundColor: '#FFF' }}>

                        <FlatList
                            data={this.state.recipes}
                            // onEndReached={() => (this.loadMore())}
                            // onEndReachedThreshold={0.3}
                            refreshing="false"
                            renderItem={({ item }, index) =>

                            
                                <TouchableOpacity onPress={() => this.RecipeDetails(item)} activeOpacity={1} style={{ marginBottom: 15 }}>
                               
                                    <ImageBackground source={{ uri: item.image }} style={styles.background_card}>
                                        <LinearGradient colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.6)']} style={styles.gradient_card}>
                                            <LinearGradient colors={[ColorsApp.SECOND, ColorsApp.PRIMARY]} start={[0, 0]} end={[1, 0]} style={{ paddingHorizontal: 10, padding: 3, marginBottom: 5, borderRadius: 5, backgroundColor: ColorsApp.PRIMARY }}>
                                                <Text style={{ color: '#FFF', fontSize: 11 }}>{item.difficulty_text}</Text>
                                            </LinearGradient>
                                            <Text numberOfLines={3} style={styles.title_card}>{item.name}</Text>
                                            <View style={{ flexDirection: 'row', marginTop: 3 }}>
                                                <Image source={require('../../assets/images/cooktime.png')} style={{ width: 15, height: 15, marginRight: 5 }} />
                                                <Text style={{ fontSize: 12, color: '#fff', marginRight: 5 }}>{item.cook_time + item.prep_time} minutes</Text>
                                                <Image source={require('../../assets/images/calories.png')} style={{ width: 15, height: 15, marginRight: 5 }} />
                                                <Text style={{ fontSize: 12, color: '#fff' }}>{item.nutr_total_carbohydrate - item.nutr_dietary_fiber}g Carbs</Text>
                                            </View>

                                        </LinearGradient>
                                    </ImageBackground>
                                </TouchableOpacity>
                            }
                            keyExtractor={(item, index) => index.toString()}


                        />
                        
                    </View>
                    <Button
                        onPress={() => this.loadMore()}
                        title="Load More"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                    
                    <View style={{ height: height * 0.10 }} />

                </ScrollView>

                <BannerAd />

            </Container>
        );
    }
}

