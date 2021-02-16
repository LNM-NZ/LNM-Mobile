import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { ImageHeaderScrollView} from 'react-native-image-header-scroll-view';
import {px2Dp} from '../../../utils/deviceUtil';
import FriendHead from './components/FriendHead';
import Visitors from './components/Visitors';
import TodayBest from './components/TodayBest'

export default class index extends Component {
    render() {
        return (
          <ImageHeaderScrollView
            maxHeight={px2Dp(130)}
            minHeight={px2Dp(44)}
            headerImage={require("../../../resources/headfriend.png")}
            renderForeground={() => (
              <View style={{ height: px2Dp(130), justifyContent: "center", alignItems: "center" }} >
                <StatusBar backgroundColor="transparent" translucent={true} />
                <FriendHead />
              </View>
            )}
          >
            <View style={{ height: 1000 }}>
              <Visitors />
              <View style={{height:px2Dp(3),backgroundColor:"#ccc"}}>
                
              </View>
              <TodayBest />
            </View>
          </ImageHeaderScrollView>
        );
      }
}
