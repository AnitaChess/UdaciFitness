import React                                from 'react';
import {
    View, Text, TouchableOpacity,
    StyleSheet, Platform
}                                           from 'react-native';
import {FontAwesome, Entypo}                from '@expo/vector-icons';
import {white, gray, purple}                from "../utils/colors";

function UdaciSteppers({value, unit, step, max, onIncrement, onDecrement}) {
    return (
        <View style={[styles.row, {justifyContent: "space-between"}]}>
            {Platform.OS === "ios" ? (
                    <View style={{flexDirection: "row"}}>
                        <TouchableOpacity
                            style={[styles.iosBtn, {borderTopRightRadius: 0, borderBottomRightRadius: 0}]}
                            onPress={onDecrement}
                        >
                            <Entypo name='minus' color={purple} size={30} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.iosBtn, {borderTopLeftRadius: 0, borderBottomLeftRadius: 0}]}
                            onPress={onIncrement}
                        >
                            <Entypo name='plus' color={purple} size={30} />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={{flexDirection: "row"}}>
                        <TouchableOpacity
                            style={[styles.androidBtn, {borderTopRightRadius: 0, borderBottomRightRadius: 0}]}
                            onPress={onDecrement}
                        >
                            <FontAwesome name='minus' color={white} size={30} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.androidBtn, {borderTopLeftRadius: 0, borderBottomLeftRadius: 0}]}
                            onPress={onIncrement}
                        >
                            <FontAwesome name='plus' color={white} size={30} />
                        </TouchableOpacity>
                    </View>
                )}

            <View style={styles.metricCounter}>
                <Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
                <Text style={{fontSize: 18, color: gray}}>{unit}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1
    },
    iosBtn: {
        backgroundColor: white,
        borderColor: purple,
        borderWidth: 1,
        borderRadius: 3,
        padding: 5,
        paddingLeft: 25,
        paddingRight: 25
    },
    androidBtn: {
        margin: 5,
        borderRadius: 2,
        padding: 10,
        backgroundColor: purple
    },
    metricCounter: {
        width: 85,
        justifyContent: "center",
        alignItems: 'center'
    }
});

export default UdaciSteppers;
