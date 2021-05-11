import React from 'react';
import { ViewStyle } from 'react-native';
import { View } from 'react-native';

const Box = ({ children, style }) => {
    return (
        <View
            marginH-16
            marginB-16
            style={{
                borderRadius: 6,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 3,
                ...style,
            }}
            backgroundColor={Colors.white}>
            {children}
        </View>
    );
};

export default Box;
