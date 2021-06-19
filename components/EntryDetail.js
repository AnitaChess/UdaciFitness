import React, {Component} from 'react';
import {View, Text} from 'react-native';

class EntryDetail extends Component {
    render() {
        return (
            <View>
                <Text>
                    EntryDetail - {JSON.stringify(this.props.navigation)}
                </Text>
            </View>
        )
    }
}

export default EntryDetail;
