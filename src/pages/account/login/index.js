import React, { Component } from 'react';
import {View, Text, Image, StatusBar, StyleSheet} from 'react-native';
import { px2Dp } from "../../../utils/deviceUtil";
import validator from '../../../utils/stringUtil';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import request from '../../../utils/requestUtil';
import {ACCOUNT_SIGNIN, ACCOUNT_CAPTCHA} from '../../../utils/urlUtil';
import MainButton from '../../../components/MainButton';
import {CodeField, Cursor,} from 'react-native-confirmation-code-field';
import Toast from '../../../utils/Toast';
import {inject, observer} from 'mobx-react';
import AsyncStorage from '@react-native-async-storage/async-storage';

@inject("RootStore")
@observer
export default class index extends Component {
    state={
        phoneNumber: "18665711978",
        isPhoneValid: true,
        showSignIn: true,
        captcha: "",
        captchaBtnText: "",
        isWaiting: false
    }
    
    constructor(){
        super(); 
    }

    phoneNumberChange = (phoneNumber) => {
        this.setState({phoneNumber})
    }

    phoneNumberSubmit = async () => {
        const {phoneNumber} = this.state;
        const isPhoneValid = validator.validatePhone(phoneNumber);
        if(!isPhoneValid){
            this.setState({isPhoneValid});
            return;
        }
        

        const response = await request.post(ACCOUNT_SIGNIN, {phone : phoneNumber});
        console.log(response);
        if(response.code == "10000"){
            this.setState({showSignIn: false});
            this.waiting();
        }else{
            this.setState({showSignIn: true});
        }
    }

    captchaSubmit = async () => {
        const {captcha, phoneNumber} = this.state;
        if(captcha.length != 6){
            Toast.message("Captcha is invalid", 2000, "center");
            return;
        }
        const response = await request.post(ACCOUNT_CAPTCHA, {
            phone: phoneNumber,
            vcode: captcha
        });
        if(response.code != "10000"){
            console.log(response);
            return;
        }
        this.props.RootStore.setUserInfo(phoneNumber, response.data.token, response.data.id);
        // save to cache
        
        AsyncStorage.setItem("userinfo",JSON.stringify({
            mobile: phoneNumber,
            token: response.data.token,
            userId: response.data.id
        }));
        
        if(response.data.isNew){
            this.props.navigation.navigate("UserInfo");
        }else{
            this.props.navigation.navigate("Tabbar");
        }
    }

    waiting = () => {
        if(this.state.isWaiting){
            return;
        }
        this.setState({isWaiting : true});
        let count = 5;
        this.setState({captchaBtnText: `Regain(${count})s`});
        let timer = setInterval(() => {
            this.setState({captchaBtnText: `Regain(${count})s`});
            count--;
            if(count === 0){
                clearInterval(timer);
                this.setState({captchaBtnText: 'Regain', isWaiting: false});
            }
        }, 1000);

    }

    regainCaptcha = () => {
        this.phoneNumberSubmit();
    }

    renderSignIn = () => {
        const {phoneNumber, isPhoneValid} = this.state;
        return (
            
                <View>
                    <Text style={{fontSize:px2Dp(25), color:"#888", fontWeight:"bold"}}>
                        Login
                    </Text>
                    <View style={{marginTop: px2Dp(30)}}>
                        <Input
                            placeholder='Phone number'
                            maxLength={11}
                            keyboardType="phone-pad"
                            value={phoneNumber}
                            inputStyle={{color: "#333"}}
                            onChangeText={this.phoneNumberChange}
                            errorMessage={isPhoneValid ? "" : "phone number format error"}
                            onSubmitEditing={this.phoneNumberSubmit}
                            leftIcon={{ type: 'font-awesome', name: 'phone', color:"#ccc",size:px2Dp(20) }} />
                    </View>
                    <View>
                        <MainButton
                        style={{
                            borderRadius: px2Dp(20),
                            width: '85%',
                            height: px2Dp(40),
                            alignSelf: 'center'
                        }} 
                        onPress={this.phoneNumberSubmit}>
                            Obtain Captcha
                        </MainButton>
                    </View>
                </View>);
    }

    onCaptchaChangeText = (captcha) => {
        this.setState({captcha})
    }

    renderCaptcha = () => { 
        const {phoneNumber,captcha, captchaBtnText, isWaiting} = this.state;
        return (
            <View>
                <View>
                    <Text style={{fontSize: px2Dp(25), color: "#888", fontWeight:"bold"}}>Input 6 numbers captcha: </Text>
                </View>
                <View style={{marginTop: px2Dp(15)}}>
                    <Text style={{color:"#888"}}>Having been sent to +64 {phoneNumber}</Text>
                </View>
                <View>
                    <CodeField
                            value={captcha}
                            onChangeText={this.onCaptchaChangeText}
                            cellCount={6}
                            rootStyle={styles.codeFieldRoot}
                            keyboardType="number-pad"
                            textContentType="oneTimeCode"
                            onSubmitEditing={this.captchaSubmit}
                            renderCell={({index, symbol, isFocused}) => (
                            <Text
                                key={index}
                                style={[styles.cell, isFocused && styles.focusCell]}>
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                            )}/>
                </View>
                <View style={{marginTop: px2Dp(15)}}>
                        <MainButton
                        style={{
                            borderRadius: px2Dp(20),
                            width: '85%',
                            height: px2Dp(40),
                            alignSelf: 'center'
                        }} 
                        onPress={this.regainCaptcha}
                        disabled={isWaiting}>
                            {captchaBtnText}
                        </MainButton>
                    </View>
            </View>
        );
    }

    render() {
        const {showSignIn} = this.state;
        return (
            <View>
                {/* statusbar */}
                <StatusBar backgroundColor="transparent" translucent={true} />
                {/* background image */}
                <Image style={{width: "100%", height:px2Dp(200)}} source={require("../../../resources/profileBackground.jpg")} />
                <View style={{padding: px2Dp(20)}}>
                    {showSignIn ?  this.renderSignIn() : this.renderCaptcha()}
                
                </View>

                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {flex: 1, padding: 20},
    title: {textAlign: 'center', fontSize: 30},
    codeFieldRoot: {marginTop: 20},
    cell: {
      width: 40,
      height: 40,
      lineHeight: 38,
      fontSize: 24,
      borderWidth: 2,
      borderColor: '#00000030',
      textAlign: 'center',
      color: "#7d53ea"
    },
    focusCell: {
      borderColor: '#7d53ea',
      
    },
  });
