import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import { px2Dp } from '../../../../utils/deviceUtil';
import request from '../../../../utils/requestUtil';
import {FRIENDS_VISITORS, BASE_URL} from '../../../../utils/urlUtil';

export default class Visitors extends Component {

    state={
        visitors:[

        ]
    }

    async componentDidMount() {
        const response = await request.authorizedGet(FRIENDS_VISITORS);
        this.setState({visitors:response.data})
    }

    render() {
        const {visitors} = this.state;
        return (
            <View style={{flexDirection:"row", marginTop:px2Dp(20), alignItems:"center", paddingLeft:px2Dp(5), paddingRight:px2Dp(5)}}>
                <Text style={{ color:"#777", fontSize:px2Dp(15)}}>You have {visitors.length} visitors...</Text>
                <View style={{flexDirection:"row", flex:1, alignItems:"center",
            justifyContent:"space-around"}}>
                    {
                        visitors.map((v, i) => <Image style={{
                            width: px2Dp(40),
                            height: px2Dp(40),
                            borderRadius: px2Dp(20)
                        }}
                        source={{uri: BASE_URL + v.header}} />)
                    }
                    <Text style={{fontSize: px2Dp(20), color:"#777"}}>&gt;</Text>
                </View>
            </View>
        )
    }
}
