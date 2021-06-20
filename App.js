import 'react-native-gesture-handler';
import React, {Component}                   from 'react';
import {Platform, StatusBar, View}          from 'react-native';
import {createStore}                        from "redux";
import reducer                              from './reducers';
import {Provider}                           from "react-redux";
import History                              from "./components/History";
import AddEntry                             from "./components/AddEntry";
import {NavigationContainer}                from '@react-navigation/native';
import {createBottomTabNavigator}           from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator}      from '@react-navigation/material-top-tabs';
import {purple, white}                      from "./utils/colors";
import {FontAwesome, Ionicons}              from "@expo/vector-icons";
import Constants                            from "expo-constants";
import {createStackNavigator}               from '@react-navigation/stack';
import EntryDetail                          from "./components/EntryDetail";
import Live                                 from "./components/Live";
import {setLocalNotification}               from "./utils/helpers";

function UdaciStatusBar({backgroundColor, ...props}) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
        </View>
    )
}

const Tabs =
    Platform.OS === "ios"
        ? createBottomTabNavigator()
        : createMaterialTopTabNavigator();

const TabNav = () => (
    <Tabs.Navigator
        initialRouteName="AddEntry"
        screenOptions={({route}) => ({
            tabBarIcon: ({color, size}) => {
                let icon;
                if (route.name === "Add Entry") {
                    icon = (
                        <FontAwesome name="plus-square" size={size} color={color} />
                    );
                } else if (route.name === "History") {
                    icon = (
                        <Ionicons name="ios-bookmarks" size={size} color={color} />
                    );
                } else if (route.name === "Live") {
                    icon = (
                        <Ionicons name="ios-speedometer" size={size} color={color} />
                    );
                }
                return icon;
            }
        })}
        tabBarOptions={{
            header: null,
            activeTintColor: Platform.OS === "ios" ? purple : white,
            showIcon: true,
            style: {
                height: 80,
                backgroundColor: Platform.OS === "ios" ? white : purple,
                shadowColor: "rgba(0, 0, 0, 0.24)",
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowRadius: 6,
                shadowOpacity: 1
            }
        }}
    >
        <Tabs.Screen name="History" component={History} />
        <Tabs.Screen name="Add Entry" component={AddEntry} />
        <Tabs.Screen name="Live" component={Live} />
    </Tabs.Navigator>
);

const Stack = createStackNavigator();
const MainNav = () => (
    <Stack.Navigator headerMode="screen">
        <Stack.Screen
            name="Home"
            component={TabNav}
            options={{headerShown: false}}
        />
        <Stack.Screen
            name="EntryDetail"
            component={EntryDetail}
            options={({route}) => {
                const {entryId} = route.params;

                const year = entryId.slice(0, 4);
                const month = entryId.slice(5, 7);
                const day = entryId.slice(8);

                return {
                    headerTintColor: white,
                    headerStyle: {
                        backgroundColor: purple,
                    },
                    title: `${month}/${day}/${year}`
                }
            }}
        />
    </Stack.Navigator>
);

class App extends Component {
    componentDidMount() {
        setLocalNotification();
    }

    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={{flex: 1}}>
                    <NavigationContainer>
                        <UdaciStatusBar backgroundColor={purple} barStyle="light-content"/>
                        <MainNav/>
                    </NavigationContainer>
                </View>
            </Provider>
        );
    }
}

export default App;
