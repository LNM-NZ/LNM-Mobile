import React, { Component } from 'react';
import { View, Image,Text,StatusBar, FlatList } from 'react-native';
import { ImageHeaderScrollView} from 'react-native-image-header-scroll-view';
import {px2Dp} from '../../../utils/deviceUtil';
import FriendHead from './components/FriendHead';
import Visitors from './components/Visitors';
import TodayBest from './components/TodayBest';
import request from '../../../utils/requestUtil';
import {BASE_URL, FRIENDS_RECOMMEND} from '../../../utils/urlUtil';
import IconFont from '../../../components/IconFont'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class index extends Component {
  state={
    params: {
      page: 1,
      pagesize: 10,
      gender: "男",
      distance: 2,
      lastlogin: "",
      city:"",
      education:""
    },
    recommends:[]
  }

  componentDidMount(){
    this.getRecommends();
  }

  getRecommends = async () => {
    const response = await request.authorizedGet(FRIENDS_RECOMMEND, this.state.params);
    this.setState({recommends: response.data})
    console.log("recommends" + response);
  }

    render() {
      const {recommends} = this.state;
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
              <View>
                <View style={{height:px2Dp(40), backgroundColor:"#eee", flexDirection:"row",justifyContent:"space-between", paddingLeft:px2Dp(10),
              paddingRight:px2Dp(10), alignItems:"center"}}>
                  <Text style={{color:"#666"}}>Recommendation</Text>
                  <IconFont style={{color:"#666"}} name="iconshaixuan"/>
                </View>
                <View >
                  <FlatList
                  data={recommends}
                  keyExtractor={(item) => item.id}
                  renderItem={({item}) => 
                  <TouchableOpacity style={{flexDirection:"row", paddingTop:px2Dp(15), paddingBottom:px2Dp(15), borderBottomWidth:px2Dp(1),
                  borderColor:"#ccc"}}>
                    <View style={{paddingLeft:px2Dp(15),paddingRight:px2Dp(15)}}>
                      <Image
                       style={{
                         width:px2Dp(50),height:px2Dp(50),borderRadius:px2Dp(25)
                       }}
                       source={{uri:BASE_URL + item.header}} />
                    </View>
                    <View style={{flex:1}}>
                      <View style={{flex:1,justifyContent:"space-around"}}>
                          <View style={{flexDirection:"row", alignItems:"center"}}>
                              <Text style={{color:"#555"}}>{item.nick_name}</Text>
                              <IconFont style={{fontSize:px2Dp(18),color:item.gender==="female"?"#b564bf":"red"}}
                              name={item.gender==="female"?"icontanhuanv":"icontanhuanan"} />
                              <Text style={{color:"#555"}}>{item.age}</Text>
                          </View>
                          <View style={{flexDirection:"row"}}>
                              <Text style={{color:"#555"}}>{item.marry}</Text>
                              <Text style={{color:"#555", marginLeft:px2Dp(5), marginRight:px2Dp(5)}}>|</Text>
                              <Text style={{color:"#555"}}>{item.degree}</Text>
                              <Text style={{color:"#555",marginLeft:px2Dp(5), marginRight:px2Dp(5)}}>|</Text>
                              <Text style={{color:"#555"}}>{item.agediff < 10 ? "match" : "sorry"}</Text>
                          </View>
                      </View>
                      
                    </View>
                    <View style={{flexDirection:"row", alignItems:"center", width:px2Dp(80)}}>
                      <IconFont name="iconxihuan" style={{color:"red", fontSize:px2Dp(30)}} />
                      <Text style={{color:"#666"}}>{item.fateValue}</Text>
                    </View>
                  </TouchableOpacity>}
                  />
                </View>
              </View>
            </View>
          </ImageHeaderScrollView>
        );
      }
}
