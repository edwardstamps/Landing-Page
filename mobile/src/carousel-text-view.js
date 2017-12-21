import React, { Component } from 'react'
import ReactNative, {
  Alert, TouchableOpacity, Text, View,
  ScrollView, Image, NativeEventEmitter,
  TouchableHighlight, Modal,
  Dimensions, Platform, WebView
} from 'react-native'
import client, {TitleBar, Color, Avatar} from '@doubledutch/rn-client'
import activityCard from './activityCard'
import Video from 'react-native-video'
import RNFetchBlob from 'react-native-fetch-blob'
import Carousel from 'react-native-carousel'

import YouTube, { YouTubeStandaloneAndroid } from 'react-native-youtube'


class SpeakerCarouselView2 extends Component {
    constructor(props) {
      super()
      this.state = {
      }
    }

    carouselCell = () => {
        const user= client.currentUser
        return (
          <View style={{width: Dimensions.get('window').width}}>
          <View style={{flexDirection: 'row'}}>
            <Avatar user={user} client={client} size={64} style={{margin: 10, marginTop: 0}} />
            <Text style={{fontSize: 24, marginLeft: 20, marginTop: 30}}>{user.firstName} {user.lastName}</Text>
            </View>
          
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: 100}}>
            <View style={{flex: 1, flexDirection: 'column', padding: 10, paddingTop: 0}}>
              <Text style={{textAlign:'left'}}>• Post a fun fact in the Activity Feed to earn an achievement</Text>
              <Text style={{textAlign:'left'}}>• Post a fun fact in the Activity Feed to earn an achievement</Text>
              <Text style={{textAlign:'left'}}>• Post a fun fact in the Activity Feed to earn an achievement</Text>
            </View>
          </View>
          </View>
        )
      }
  
    render() {
  
      return (
        <View style={{marginBottom: 50}}>
            <Text style={{color:'#888888', margin: 10, marginBottom: 25}}>OUR FEATURED SPEAKERS</Text>
          <Carousel
          indicatorAtBottom={false}
          // hideIndicators={true}
          animate={false}
          indicatorOffset={175}
          >
           {this.carouselCell()}
           {this.carouselCell()}
           {this.carouselCell()}
      </Carousel>
      </View>
      )
    }

  

}


export default SpeakerCarouselView2




