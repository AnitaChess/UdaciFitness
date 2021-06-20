import React, {Component}                   from 'react';
import {
    View, TouchableOpacity, Text,
    Platform, StyleSheet
}                                           from "react-native";
import {getMetricMetaInfo, timeToString}    from "../utils/helpers";
import UdaciSlider                          from "./UdaciSlider";
import UdaciSteppers                        from "./UdaciSteppers";
import DateHeader                           from "./DateHeader";
import {Ionicons}                           from '@expo/vector-icons';
import TextButton                           from "./TextButton";
import {submitEntry, removeEntry}           from "../utils/api";
import {connect}                            from "react-redux";
import {addEntry}                           from "../actions";
import {getDailyReminderValue}              from "../utils/helpers";
import {purple, white}                      from "../utils/colors";
import {CommonActions}                      from '@react-navigation/native';

function SubmitBtn ({onPress}) {
    return (
        <TouchableOpacity style={Platform.OS === "ios" ? styles.iosSubmitBtn : styles.AndroidSubmitBtn} onPress={onPress}>
            <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
    )
}

class AddEntry extends Component {
    state = {
        run: 0,
        bike: 0,
        swim: 0,
        eat: 0,
        sleep: 0
    };

    increment = (metric) => {
        const {max, step} = getMetricMetaInfo(metric);

        this.setState(prevState => {
            const count = prevState[metric] + step;
            return {
                ...prevState,
                [metric]: count > max ? max : count
            }
        });
    };

    decrement = (metric) => {
        const {step} = getMetricMetaInfo(metric);

        this.setState(prevState => {
            const count = prevState[metric] - step;
            return {
                ...prevState,
                [metric]: count < 0 ? 0 : count
            }
        });
    };

    slide = (metric, value) => {
        this.setState(() => ({
            [metric]: value
        }));
    };

    submit = () => {
        const key = timeToString();
        const entry = [this.state];

        this.props.dispatch(addEntry({
            [key]: entry
        }));

        this.setState(() => ({
            run: 0,
            bike: 0,
            swim: 0,
            eat: 0,
            sleep: 0
        }));

        this.toHome();

        submitEntry({key, entry});

        // Clear local notification
    };

    reset = () => {
        const key = timeToString();

        this.props.dispatch(addEntry({
            [key]: getDailyReminderValue()
        }));

        this.toHome();

        removeEntry({key});
    };

    toHome = () => {
        this.props.navigation.dispatch(CommonActions.goBack({
            key: 'AddEntry'
        }))
    };

    render() {
        const metaInfo = getMetricMetaInfo();
        const {alreadyLogged} = this.props;

        if (alreadyLogged) {
            return (
                <View style={styles.center}>
                    <Ionicons name={Platform.OS === "os" ? 'ios-happy-outline' : 'md-happy'} size={100} />
                    <Text>You already logged your information for today</Text>
                    <TextButton style={{padding: 10}} onPress={this.reset}>
                        Reset
                    </TextButton>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <DateHeader date={new Date().toLocaleDateString()} />
                {Object.keys(metaInfo).map(key => {
                    const {getIcon, type, ...rest} = metaInfo[key];
                    const value = this.state[key];

                    return (
                        <View key={key} style={styles.row}>
                            {getIcon()}
                            {type === 'slider'
                                ? (
                                    <UdaciSlider
                                        value={value}
                                        onChange={value => this.slide(key, value)}
                                        {...rest}
                                    />
                                )
                                : (
                                    <UdaciSteppers
                                        value={value}
                                        onIncrement={() => this.increment(key)}
                                        onDecrement={() => this.decrement(key)}
                                        {...rest}
                                    />
                                )}
                        </View>
                    )
                })}
                <SubmitBtn onPress={this.submit} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40
    },
    androidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 2,
        height: 45,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30
    }
});

const mapStateToProps = (state) => {
    const key = timeToString();

    return {
        alreadyLogged: state[key] && typeof state[key][0].today === "undefined"
    }
};

export default connect(mapStateToProps)(AddEntry);
