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


class TwoImageView extends Component {
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

    const width = Dimensions.get('window').width
    const height = width * .4959
    
    return(
        <View style={{padding: 0, borderColor:'#D8D8D8',borderBottomWidth:1, backgroundColor: "#FFFFFF"}}>
            <View style={{borderColor:'#D8D8D8',borderBottomWidth:1, height: 50, flex: 1, backgroundColor: "#E8E8E8"}}/>
            {this.showHeader()}
            <Image source={{uri: this.props.details.imageInfo[0].image}} style={{width, height}}/>
            <Image source={{uri: this.props.details.imageInfo[1].image}} style={{marginTop: 10, width, height}}/>
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



export default TwoImageView
