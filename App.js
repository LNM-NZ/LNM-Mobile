import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Nav from './src/nav';
import {Provider} from 'mobx-react';
import RootStore from './src/mobx/index'

export default class App extends Component {
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
