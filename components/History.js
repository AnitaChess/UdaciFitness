import React, {Component}               from 'react';
import {
    View, Text, StyleSheet,
    Platform, TouchableOpacity
}                                       from 'react-native';
import {connect}                        from "react-redux";
import {receiveEntries, addEntry}       from "../actions";
import {
    timeToString,
    getDailyReminderValue
}                                       from "../utils/helpers";
import {fetchCalendarResults}           from "../utils/api";
import {Agenda as UdaciFitnessCalendar} from 'react-native-calendars'
import {white}                          from "../utils/colors";
import MetricCard                       from "./MetricCard";
import AppLoading                       from 'expo-app-loading';

class History extends Component {
    state = {
        ready: false
    };

    componentDidMount() {
        const {dispatch} = this.props;

        fetchCalendarResults()
            .then(entries => dispatch(receiveEntries(entries)))
            .then(({entries}) => {
                if (!entries[timeToString()]) {
                    dispatch(
                        addEntry({
                            [timeToString()]: getDailyReminderValue()
                        })
                    );
                }
            })
            .then(() => this.setState({
                ready: true
            }));
    }

    renderItem = (item) => {
        const {today, ...metrics} = item;
        const {entries} = this.props;
        const keys = Object.keys(entries);
        const values = Object.values(entries).map(el => el[0]);
        const index = values.indexOf(item);
        const key = keys[index];

        const formattedDate = key && new Date(key).toLocaleDateString();

        return (
            <View style={styles.item}>
                {today ? (
                    <View>
                        <Text style={styles.noDataText}>
                            {today}
                        </Text>
                    </View>
                ) : (
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("EntryDetail", {entryId: key})}>
                        <MetricCard metrics={metrics} date={formattedDate} />
                    </TouchableOpacity>
                )}
            </View>
        )
    };

    renderEmptyDay() {
        return (
            <View style={styles.item}>
                <Text style={styles.noDataText}>
                    You didn't log any data on this day.
                </Text>
            </View>
        )
    };

    render() {
        const {entries} = this.props;
        const {ready} = this.state;

        if (ready === false) {
            return <AppLoading />
        }

        return (
            <UdaciFitnessCalendar
                items={entries}
                renderItem={this.renderItem}
                renderEmptyDay={this.renderEmptyDay}
            />
        )
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: white,
        borderRadius: Platform.OS === "ios" ? 16 : 2,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        }
    },
    noDataText: {
        fontSize: 20,
        paddingTop: 20,
        paddingBottom: 20
    }
});

const mapStateToProps = (entries) => {
    return {
        entries
    }
};

export default connect(mapStateToProps)(History);
