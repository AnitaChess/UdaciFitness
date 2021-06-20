import React, {Component}                   from 'react';
import {View, Text, StyleSheet}             from 'react-native';
import {connect}                            from "react-redux";
import {white}                              from "../utils/colors";
import MetricCard                           from "./MetricCard";

class EntryDetail extends Component {
    static navigationOptions = ({route}) => {
        const {entryId} = route.params;

        const year = entryId.slice(0, 4);
        const month = entryId.slice(5, 7);
        const day = entryId.slice(8);

        return {
            title: `${month}/${day}/${year}`
        }
    };

    render() {
        const {entryId, metrics} = this.props;

        return (
            <View style={styles.container}>
                <MetricCard metrics={metrics} />
                <Text>
                    EntryDetail - {this.props.route.params.entryId}
                </Text>
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

export default connect(mapStateToProps)(EntryDetail);
