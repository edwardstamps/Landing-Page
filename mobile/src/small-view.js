import React, { Component } from 'react'
import ReactNative, {
  Alert, TouchableOpacity, Text, View,
  ScrollView, Image, NativeEventEmitter,
  TouchableHighlight, Modal,
  Dimensions, Platform, WebView, Linking
} from 'react-native'
import client, {TitleBar, Color, Avatar} from '@doubledutch/rn-client'
import activityCard from './activityCard'
import Video from 'react-native-video'
import RNFetchBlob from 'react-native-fetch-blob'
import YouTube, { YouTubeStandaloneAndroid } from 'react-native-youtube'


class SmallView extends Component {
  constructor(props) {
      super(props)
      this.state = {
        userColor: new Color().rgbString() 
      }
  }


  render(){
          return(
            <View>
              <View style={{borderColor:'#D8D8D8',borderBottomWidth:1, height: 50, flex: 1, backgroundColor: "#E8E8E8"}}/>
              <View style={{padding: 0, borderColor:'#D8D8D8',borderBottomWidth:1, backgroundColor: "white", flexDirection: "row"}}>
                <Image style={{height: 110, width: 110}} source={{uri:this.props.details.image}}></Image>
                <View style={{marginTop: 15, marginLeft: 10, marginRight: 15, marginBottom: 15, flexDirection: "column", flex: 1}}>
                  <Text style={{fontSize: 18, marginBottom: 5}}>{this.props.details.title}</Text>
                  <Text style={{fontSize: 14}}>{this.props.details.des}</Text>
                </View>
              </View>
            </View>
          )
        }
      }
    
    const styles = ReactNative.StyleSheet.create({
      header : {
          textAlign: "center",
          fontSize: 26,
          flex: 1,
          marginLeft: 30,
          marginRight: 30,
          marginTop: 20,
          marginBottom:5
      },
      description : {
          textAlign: "center",
          fontSize: 14,
          flex: 1,
          marginLeft: 30,
          marginRight: 30,
          marginTop: 5,
          marginBottom: 25
      },
      header2: {
        textAlign: "left",
        fontSize: 18,
        flex: 1,
        marginLeft: 15,
        marginTop: 5,
        marginBottom:5
    },
    
    });
    
    export default SmallView
    