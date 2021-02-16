import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Svg from 'react-native-svg-uri';
import {mall, near, cheapest} from '../../../../resources/fonts/iconSvg';
import {px2Dp} from '../../../../utils/deviceUtil'

export default class FriendHead extends Component {
    render() {
        return (
            <View style={{flexDirection:"row", width:"80%", justifyContent:"space-around"}}>
                <TouchableOpacity style={{alignItems:"center"}}>
                    <View style={{width:px2Dp(70), height:px2Dp(70), borderRadius:px2Dp(35),
                    backgroundColor:"red", justifyContent:"center", alignItems:"center"}}>
                        <Svg width="40" height="40" fill="#fff" svgXmlData={mall} />
                    </View>
                    <Text style={{fontSize: px2Dp(18), marginTop:px2Dp(4),
                    color:"#ffffff9a" }}>Mall</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{alignItems:"center"}}>
                    <View style={{width:px2Dp(70), height:px2Dp(70), borderRadius:px2Dp(35),
                    backgroundColor:"#2db3f8", justifyContent:"center", alignItems:"center"}}>
                        <Svg width="40" height="40" fill="#fff" svgXmlData={near} />
                    </View>
                    <Text style={{fontSize: px2Dp(18), marginTop:px2Dp(4),
                    color:"#ffffff9a" }}>Near</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{alignItems:"center"}}>
                    <View style={{width:px2Dp(70), height:px2Dp(70), borderRadius:px2Dp(35),
                    backgroundColor:"#ecc768", justifyContent:"center", alignItems:"center"}}>
                        <Svg width="40" height="40" fill="#fff" svgXmlData={cheapest} />
                    </View>
                    <Text style={{fontSize: px2Dp(18), marginTop:px2Dp(4),
                    color:"#ffffff9a" }}>Cheap</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
