import React, {Component} from 'react';
import{ Image, View, Text} from 'react-native';
import Strings from '../utils/Strings';

class NoData extends React.Component {

  render () {

    return (

    <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center' }}>
      <Text style={{fontSize: 16, marginBottom: 8}}>{Strings.ST66}</Text>
      <Text style={{fontSize: 14, marginBottom: 8, color: '#D1D1D1'}}>{Strings.ST67}</Text>
    </View>

    )
  }

}

export default NoData;
