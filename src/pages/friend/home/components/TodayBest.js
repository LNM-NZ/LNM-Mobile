import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import request from '../../../../utils/requestUtil';
import {px2Dp} from '../../../../utils/deviceUtil'
import {FRIENDS_TODAYBEST, BASE_URL} from '../../../../utils/urlUtil';
import IconFont from '../../../../components/IconFont';

export default class TodayBest extends Component {
    state = {
        todayBest : {
            id: 16,
            header: "/upload/13828459788.jpg",
            nick_name: "sky city",
            gender: "female",
            age: 23,
            marry: "single",
            degree: "bachlor",
            dist: 246.1,
            agediff: 0,
            fateValue: 78
        }
    }
    async componentDidMount() {
        const response = await request.authorizedGet(FRIENDS_TODAYBEST);
        console.log(response);
        if(response.data.length != 0) {
            this.setState({todayBest: response.data[0]});
        }
        
    }

    render() {
        const {todayBest} = this.state;
        return (
            <View style={{flexDirection:"row"}}>
                <View style={{position: "relative"}}>
                    <Image
                     style={{width:px2Dp(120), height: px2Dp(120)}}
                     source={{uri: BASE_URL + todayBest.header}} />
                </View>
                <View style={{width: px2Dp(80), height: px2Dp(30), backgroundColor:"#b564bf", justifyContent:"center", alignItems:"center",borderRadius: px2Dp(10),position:"absolute",left:0,bottom:px2Dp(10)}}>
                    <Text style={{color:"#fff", fontSize:px2Dp(14)}}>Today Best</Text>
                </View>
                <View style={{flex:1, flexDirection:"row"}}>
                    <View style={{flex:3, justifyContent:"space-around"}}>
                        <View style={{flexDirection:"row", alignItems:"center"}}>
                            <Text style={{color:"#555"}}>{todayBest.nick_name}</Text>
                            <IconFont style={{fontSize:px2Dp(18),color:todayBest.gender==="female"?"#b564bf":"red"}}
                            name={todayBest.gender==="female"?"icontanhuanv":"icontanhuanan"} />
                            <Text style={{color:"#555"}}>{todayBest.age}</Text>
                        </View>
                        <View style={{flexDirection:"row"}}>
                            <Text style={{color:"#555"}}>{todayBest.marry}</Text>
                            <Text style={{color:"#555", marginLeft:px2Dp(5), marginRight:px2Dp(5)}}>|</Text>
                            <Text style={{color:"#555"}}>{todayBest.degree}</Text>
                            <Text style={{color:"#555",marginLeft:px2Dp(5), marginRight:px2Dp(5)}}>|</Text>
                            <Text style={{color:"#555"}}>{todayBest.agediff < 10 ? "match" : "sorry"}</Text>
                        </View>
                    </View>
                    <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                        <View style={{position:"relative", alignItems:"center", justifyContent:"center"}}>
                            <IconFont name="iconxihuan" style={{fontSize:px2Dp(50), color:"red"}} />
                            <Text style={{position:"absolute", color:"#fff",fontSize:px2Dp(13), fontWeight:"bold"}}>{todayBest.fateValue}</Text>
                        </View>
                        <Text style={{color: "red", fontSize:px2Dp(13)}}>Like</Text>
                    </View>
                </View>
            </View>
        )
    }
}
