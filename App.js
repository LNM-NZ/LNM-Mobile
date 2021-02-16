import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Nav from './src/nav';
import {Provider} from 'mobx-react';
import RootStore from './src/mobx/index';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class App extends Component {

  async componentDidMount(){
    // Obtain data from cache
    const userData = await AsyncStorage.getItem("userinfo");
    console.log("userData = " + userData);
    const userinfo = userData ? JSON.parse(userData) : {};
    // exist token
    if(userinfo.token){
      RootStore.setUserInfo(userinfo.mobile, userinfo.token, userinfo.userId);
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Provider RootStore={RootStore}>
          <Nav></Nav>
        </Provider>
      </View>
    )
  }
}
