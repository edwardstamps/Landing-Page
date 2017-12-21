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


class SquareView extends Component {
  constructor(props) {
      super(props)
      this.state = {
        userColor: new Color().rgbString() 
      }
  }
    
  showHeader = () => {
      if (this.props.details.header === true) {
          return(
            <View style={{backgroundColor: 'white'}}>    
              <Text style={styles.header}>{this.props.details.title}</Text>
              <Text style={styles.description}>{this.props.details.des}</Text>
            </View>
          )
      }
      else {
          return (
              <View style={{backgroundColor: 'white'}}>
                  <Text style={styles.header2}>{this.props.details.title}</Text>
              </View>
          )
      }   
  }

  showFooter = () => {
      if (this.props.details.footer === true) {
          return(
              <View style = {{backgroundColor: '#FFFFFF'}}>
                  <TouchableOpacity onPress={()=>{
                  Linking.openURL(this.props.details.buttonURL)
                  }} style={{marginTop:0}}>
                      <View style={{backgroundColor: this.state.userColor,borderRadius:4,padding:10, margin: 20}}>
                          <Text style={{color:'white',textAlign:'center',fontSize:16}}>{this.props.details.buttonText}</Text>
                      </View>
                  </TouchableOpacity>
              </View>
          )
      }
  }

  render(){

      const width = Dimensions.get('window').width / 2 - 30
      const height = width * .6792

      return(
        <View style={{padding: 0, borderColor:'#D8D8D8',borderBottomWidth:1}}>
          <View style={{borderColor:'#D8D8D8',borderBottomWidth:1, height: 50, flex: 1}}/>
          {this.showHeader()}
          <View style={{backgroundColor:'#FFFFFF',borderTopWidth:1,borderBottomWidth:1,borderColor:'#D8D8D8'}}>
            <View style={{flexDirection:'row'}}>
              <View style={{borderRightWidth:1,borderColor:'#D8D8D8',flex:1,padding:15,alignItems:'center'}}>
                <Image style={{width, height, marginBottom:14}} source={{uri:this.props.details.image1}}/>
                <Text style={{textAlign:'center'}}>{this.props.details.text1}</Text>
              </View>
              <View style={{flex:1,padding:15,alignItems:'center'}}>
                <Image style={{width, height, marginBottom:14}} source={{uri:this.props.details.image2}}/>
                <Text style={{textAlign:'center'}}>{this.props.details.text2}</Text>
              </View>   
            </View>
            <View style={{flexDirection:'row',borderTopWidth:1,borderColor:'#D8D8D8'}}>
              <View style={{borderRightWidth:1,borderColor:'#D8D8D8',flex:1,padding:15,alignItems:'center'}}>
                <Image style={{width, height, marginBottom:14}} source={{uri: this.props.details.image3}}/>
                <Text style={{textAlign:'center'}}>{this.props.details.text3}</Text>
              </View>
              <View style={{flex:1,padding:15, alignItems:'center',}}>
                <Image style={{width, height, marginBottom:14}} source={{uri: this.props.details.image4}}/>
                <Text style={{textAlign:'center'}}>{this.props.details.text4}</Text>
              </View>
            </View>
          </View>
          {this.showFooter()}
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

export default SquareView

