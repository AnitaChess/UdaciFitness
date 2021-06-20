import React, {Component}                   from 'react';
import {View, Text, StyleSheet}             from 'react-native';
import {connect}                            from "react-redux";
import {white}                              from "../utils/colors";
import MetricCard                           from "./MetricCard";
import {addEntry}                           from "../actions";
import {removeEntry}                        from "../utils/api";
import {
    getDailyReminderValue,
    timeToString
}                                           from "../utils/helpers";
import TextButton                           from "./TextButton";

class EntryDetail extends Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.metrics && !nextProps.metrics.today;
    }

    reset = () => {
        const {remove, goBack, entryId} = this.props;

        remove();
        goBack();
        removeEntry(entryId);
    };

    render() {
        const {metrics} = this.props;

        return (
            <View style={styles.container}>
                <MetricCard metrics={metrics} />
                <TextButton onPress={this.reset} style={{margin: 20}}>
                    Reset
                </TextButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
   container: {
       flex: 1,
       backgroundColor: white,
       padding: 15
   }
});

const mapStateToProps = (state, {route}) => {
    const {entryId} = route.params;

    return {
        entryId,
        metrics: state[entryId][0]
    }
};

function mapDispatchToProps(dispatch, {route, navigation}) {
    const {entryId} = route.params;

    return {
        remove: () => dispatch(addEntry({
            [entryId]: timeToString() === entryId
                ? getDailyReminderValue()
                : null
        })),
        goBack: () => navigation.goBack()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail);
