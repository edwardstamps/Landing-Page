import React, { Component } from 'react'
import ReactNative, {
  Alert, TouchableOpacity, Text, View,
  ScrollView, Image, NativeEventEmitter,
  TouchableHighlight, Modal,
  Dimensions, Platform, WebView, Linking
} from 'react-native'
import client, {TitleBar, Color, Avatar} from '@doubledutch/rn-client'
import activityCard from './activityCard'

const { currentEvent, currentUser, primaryColor } = client

class FooterView extends Component {
    constructor(props) {
      super()
      this.state = {
        userColor: new Color().rgbString() 
      }
    }

    render(){
      const buttonColor = this.state.userColor
      return(
          <View style={{padding:20}}>
            <TouchableOpacity onPress={()=>{
              this.openWebURL(this.props.details.buttons[0].buttonURL)
            }}>
              <View style={{borderColor:buttonColor,borderWidth:1,backgroundColor:'#FFFFFF',borderRadius:4,padding:10}}>
                <Text style={{color:buttonColor,textAlign:'center',fontSize:16}}>{this.props.details.buttons[0].buttonTitle}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
              Linking.openURL(this.props.details.buttons[0].buttonURL)
            }} style={{marginTop:20}}>
              <View style={{borderColor:buttonColor,borderWidth:1,backgroundColor:'#FFFFFF',borderRadius:4,padding:10}}>
                <Text style={{color:buttonColor,textAlign:'center',fontSize:16}}>{this.props.details.buttons[1].buttonTitle}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )
    }
}


export default FooterView