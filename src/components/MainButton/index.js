import React, { Component} from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {px2Dp} from '../../utils/deviceUtil'


const styles = StyleSheet.create({
    linearGradient: {
      flex: 1,
      paddingLeft: px2Dp(15),
      paddingRight: px2Dp(15),
      borderRadius: px2Dp(5),
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonText: {
      fontSize: px2Dp(18),
      fontFamily: 'Gill Sans',
      textAlign: 'center',
      color: '#ffffff',
      backgroundColor: 'transparent',
    },
  });

export default class index extends Component {
    
    static defaultProps = {
        style: {},
        textStyle: {},
        disabled: false
    }

    render() {
        return (
            <TouchableOpacity
            disabled={this.props.disabled}
            onPress={this.props.onPress}
            style={{
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                ...this.props.style
                }}>
                <LinearGradient 
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#9b63cd', '#e0708c']} 
                    style={styles.linearGradient}>
                        <Text style={{...styles.buttonText, ...this.props.textStyle}}>
                            {this.props.children}
                        </Text>
                </LinearGradient>
             </TouchableOpacity>
        )
    }
}

