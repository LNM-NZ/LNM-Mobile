import React, {Component} from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/account/login';
import Demo from './pages/demo'
import UserInfo from './pages/account/userinfo';
import Tabbar from './tabbar';
import {inject, observer} from 'mobx-react';

const Stack = createStackNavigator();

@inject("RootStore")
@observer
class Nav extends Component {
  
  constructor(props){
    super();
    this.state = {
      initialRouteName: props.RootStore.token ? "Tabbar" : "Login"
    }
  }

  render() { 
    const {initialRouteName} = this.state;
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="none" initialRouteName={initialRouteName}>
        <Stack.Screen name="Tabbar" component={Tabbar} />
          <Stack.Screen name="Demo" component={Demo} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="UserInfo" component={UserInfo} />
        </Stack.Navigator>
      </NavigationContainer>
     );
  }
}



export default Nav;