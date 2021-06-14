import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {FontAwesome, Entypo} from '@expo/vector-icons';

function UdaciSteppers({value, unit, step, max, onIncrement, onDecrement}) {
    return (
        <View>
            <View>
                <TouchableOpacity onPress={onDecrement}>
                    <FontAwesome name='minus' color='black' size={30} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onIncrement}>
                    <FontAwesome name='plus' color='black' size={30} />
                </TouchableOpacity>
            </View>
            <View>
                <Text>{value}</Text>
                <Text>{unit}</Text>
            </View>
        </View>
    )
}

export default UdaciSteppers;
