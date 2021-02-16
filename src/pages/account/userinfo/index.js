import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import {px2Dp} from '../../../utils/deviceUtil';
import SvgUri from 'react-native-svg-uri';
import {male, female} from '../../../resources/fonts/iconSvg';
import {Input} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import Permission from '../../../utils/permissionUtil';
import Picker from 'react-native-picker';
import CityData from '../../../resources/citys.json';
import MainButton from '../../../components/MainButton';
import Toast from '../../../utils/Toast';
import ImagePicker from 'react-native-image-crop-picker';
import {Overlay} from 'teaset';
import {inject, observer} from 'mobx-react';
import request from '../../../utils/requestUtil';
import {ACCOUNT_AVATAR, ACCOUNT_REGISTER} from '../../../utils/urlUtil';

@inject("RootStore")
@observer
export default class index extends Component {
    state = {
        nickname: "",
        gender: "male",
        birthday: "",
        city: "",
        header: "",
        lng: "",
        lat: "",
        address: ""
    }

    selectGender = (gender) => {
        this.setState({gender});
    }

    showCityList = () => {
      Picker.init({
        pickerData: CityData,
        selectedValue:["Auckland", "North Shore"],
        wheelFlex:[1, 1, 0],
        pickerConfirmBtnText: "Ok",
        pickerCancelBtnText: "Cancel",
        pickerTitleText: "Select your city",
        onPickerConfirm: data => {
          this.setState({
            city: data[1]
          })
        }
      });
      Picker.show();
    }

    selectAvatar = async () => {
      const {nickname, birthday,city} = this.state;
      if(!nickname || !birthday || !city){
        Toast.sad("Invalid nickname, birthday or city", 2000, "center");
        return;
      }
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
      });

      let overlayRef = null;
      let overlayView = (
        <Overlay.View
          style={{flex:1,backgroundColor:"#000"}}
          modal={true}
          overlayOpacity={0}
          ref={v => overlayRef = v}
          >
          <View style={{marginTop:px2Dp(30), 
            alignSelf: "center",
            width:px2Dp(334),
            height:px2Dp(334),
            position:"relative",
            justifyContent:'center',
            alignItems:'center'}}>
            <Image source={require("../../../resources/scan.gif")}
              style={{width:"100%", 
              height:"100%",
              position:'absolute',
              left:0,
              top:0,
              zIndex:100}} />
              <Image
                source={{uri:image.path}}
                style={{width:"60%", height:"60%"}} />
          </View>
        </Overlay.View>
      );
      Overlay.show(overlayView);
      console.log(image);
      let resImg = await this.uploadImg(image);
      console.log(resImg);
      if(resImg.code !== "10000"){
        return;
      }
      let params = this.state;
      params.header = resImg.data.headImgPath;
      const resReg = await request.authorizedPost(ACCOUNT_REGISTER, params);

      overlayRef.close();
      Toast.smile("Congratulations!", 2000, "center");
      setTimeout(() => {
        this.props.navigation.reset({
          routes:[{name: 'Tabbar'}]
        })
      }, 2000);
    }

    uploadImg = (image) => {
      let imgData = new FormData();
      imgData.append("headPhoto", {
        uri: image.path,
        type: image.mime,
        name: image.path.split("/").pop()
      });
    
      return request.authorizedPost(ACCOUNT_AVATAR, imgData, {
        headers :{
          'Content-Type': "multipart/form-data",
        }
      });
    }

    async componentDidMount(){
      console.log(this.props);
      Permission.requestPermission();
      this.setState({
        address:'79 Glenfield Bayview Auckland', 
        city: 'North Shore',
        lng: '174.713823049048223', 
        lat: '-36.773718593806'});
    }

    render() {
        const {nickname, gender, birthday, city} = this.state;
        const now = new Date();
        const current = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
        return (
            <View style={{backgroundColor: "#fff", flex: 1, padding: px2Dp(20)}}>
                <Text style={{fontSize: px2Dp(20), color:"#666", fontWeight:"bold"}}> Provide Your Information </Text>
                <Text style={{fontSize: px2Dp(20), color:"#666", fontWeight:"bold"}}> Known by others easily </Text>
                <View style={{marginTop: px2Dp(20)}}>
                    <View style={{width:"60%", flexDirection:"row", alignSelf:"center", justifyContent:"space-around"}}>
                        <TouchableOpacity onPress={this.selectGender.bind(this, "male")} style={{width: px2Dp(60), height:px2Dp(60), borderRadius:px2Dp(36), backgroundColor:gender==="male" ? "red" : "#eee", justifyContent:"center", alignItems:"center"}}>
                            <SvgUri svgXmlData={male} width="36" height="36" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.selectGender.bind(this, "female")} style={{width: px2Dp(60), height:px2Dp(60), borderRadius:px2Dp(36), backgroundColor:gender==="female" ? "red" : "#eee", justifyContent:"center", alignItems:"center"}}>
                            <SvgUri svgXmlData={female} width="36" height="36" />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Input value={nickname}
                        placeholder="your nickname"
                        onChangeText={(nickname)=>this.setState({nickname})}/>
                    </View>
                    <View>
                        <DatePicker
                            androidMode="spinner"
                            style={{width: "100%"}}
                            date={birthday}
                            mode="date"
                            placeholder="set birthday"
                            format="YYYY-MM-DD"
                            minDate="1900-01-01"
                            maxDate={current}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                            dateIcon: {
                                display: "none"
                            },
                            dateInput: {
                                margin: px2Dp(10),
                                borderWidth: 0,
                                borderBottomWidth: px2Dp(1.5),
                                alignItems: "flex-start",
                                paddingLeft: px2Dp(4),
                            },
                            placeholderText: {
                                fontSize: px2Dp(18),
                                color: "#afafaf"
                            }
                            }}
                            onDateChange={(birthday) => {this.setState({birthday})}}
                        />
                    </View>
                    <View style={{marginTop: px2Dp(20)}}>
                      <TouchableOpacity onPress={this.showCityList}>
                        <Input
                          value={"Location: " + city}
                          inputStyle={{color: "#666"}} 
                          disabled={true}/>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <MainButton
                      style={{height:px2Dp(40),
                      borderRadius:px2Dp(20),
                      alignSelf:"center"}}
                      onPress={this.selectAvatar}>
                        Set your avatar
                      </MainButton>
                    </View>
                </View>
            </View>
        )
    }
}
