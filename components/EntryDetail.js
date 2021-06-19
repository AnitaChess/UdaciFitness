import React, {Component}       from 'react';
import {View, Text}             from 'react-native';

class EntryDetail extends Component {
    render() {
        return (
            <View>
                <Text>
                    EntryDetail - {this.props.route.params.entryId}
                </Text>
            </View>
        )
    }
}

export default EntryDetail;
