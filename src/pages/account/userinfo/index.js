import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import {px2Dp} from '../../../utils/deviceUtil';
import SvgUri from 'react-native-svg-uri';
import {male, female} from '../../../resources/fonts/iconSvg'


export default class index extends Component {
    render() {
        return (
            <View style={{backgroundColor: "#fff", flex: 1, padding: px2Dp(20)}}>
                <Text style={{fontSize: px2Dp(20), color:"#666", fontWeight:"bold"}}> Provide Your Information </Text>
                <Text style={{fontSize: px2Dp(20), color:"#666", fontWeight:"bold"}}> Known by others easily </Text>
                <View style={{marginTop: px2Dp(20)}}>
                    <View style={{width:"60%", flexDirection:"row", alignSelf:"center", justifyContent:"space-around"}}>
                        <TouchableOpacity style={{width: px2Dp(60), height:px2Dp(60), borderRadius:px2Dp(34), backgroundColor:"#eee", justifyContent:"center", alignItems:"center"}}>
                            <SvgUri svgXmlData={male} width="34" height="34" />
                        </TouchableOpacity>
                        <TouchableOpacity style={{width: px2Dp(60), height:px2Dp(60), borderRadius:px2Dp(34), backgroundColor:"#eee", justifyContent:"center", alignItems:"center"}}>
                            <SvgUri svgXmlData={female} width="34" height="34" />
                        </TouchableOpacity>
                        
                    </View>
                </View>
            </View>
        )
    }
}
