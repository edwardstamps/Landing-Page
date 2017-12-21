import React, { Component } from 'react';
import ReactNative, {Button, NativeEventEmitter, Modal, Platform} from 'react-native';
import client, { Avatar, TitleBar, Color } from '@doubledutch/rn-client'
import YouTube, { YouTubeStandaloneAndroid } from 'react-native-youtube'
import Video from 'react-native-video'
import RNFetchBlob from 'react-native-fetch-blob'


const { Alert, TouchableOpacity, TouchableHighlight, Text, View, ScrollView, Image,WebView, Dimensions, PixelRatio,Linking } = ReactNative
const { currentEvent, currentUser} = client

class LandingView extends Component {
  constructor(props) {
    super()
    this.state = {
      userColor: new Color().rgbString() 
    }
  }

  render() {
    let customColor = this.state.userColor
    
    if (this.props.color !== undefined) {
      customColor = this.props.color
    }

    const video = this.props.details.video
    const height = Dimensions.get('window').width * .5625
    const width = Dimensions.get('window').width 

    return (
      <View>
          <View style={{backgroundColor:'#00B9C2'}}>
            <Text style={{fontSize:32,textAlign:'center',padding:20,fontWeight:'bold',color: customColor, backgroundColor: '#FFFFFF'}}>{this.props.details.headline}</Text>
          </View>
          <View style={{width, height}}>
            {this.renderPlayer(video)}
          </View>
          <View style={{backgroundColor:'#FFFFFF',padding:20, borderColor:'#D8D8D8',borderBottomWidth:1}}>
            <Text style={{textAlign:'center',fontSize:25}}>Welcome To</Text>
            <Text style={{textAlign:'center',fontSize:25}}>{this.props.details.title}</Text>
            <Text style={{textAlign:'center',fontSize:16,padding:20}}>{this.props.details.des}</Text>
            <TouchableOpacity onPress={()=>{
            }}>
              <View style={{backgroundColor:customColor,borderRadius:4,padding:10}}>
                <Text style={{color:'#FFFFFF',textAlign:'center',fontSize:16}}>Go to the Activity Feed</Text>
              </View>
            </TouchableOpacity>
          </View>
      </View>
    )
  }

  onPressVideo = () => {
    this.setState({
      paused: !this.state.paused
    })
}

renderYouTubePlayer(videoId) {
    // Android has special rendering because the youtube component uses fragments
    // which don't play nice in list views. I'm sure someone smarter can figure out
    // how to make that work, but I could not.
    if (Platform.OS === 'android') {
      return (
        <TouchableHighlight
        style={{ flex: 1 }}
        onPress={() => {
        YouTubeStandaloneAndroid.playVideo({
            apiKey: 'AIzaSyDO5L4KzrzG_2aiX6HWpTAR23xk5UcKTf8',
            videoId: videoId,
            autoplay: true
        })
        }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Image
                source={{ uri: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` }}
                resizeMode='cover'
                style={ styles.video }
                />
                <View style={ styles.playButton }>
                    <Text style={ styles.playButtonText }>▶</Text>
                </View>
            </View>
        </TouchableHighlight>
      )
    } 
    else {
      return (
        <YouTube
          videoId={videoId}        // The YouTube video ID
          play={false}             // control playback of video with true/false
          fullscreen={false}       // control whether the video should play in fullscreen or inline
          loop={false}             // control whether the video should loop when ended
          onReady={e => this.setState({ isReady: true })}
          onChangeState={e => this.setState({ status: e.state })}
          onChangeQuality={e => this.setState({ quality: e.quality })}
          onError={e => this.setState({ error: e.error })}
          style = {styles.video}
        />
      )
    }
}

renderVimeoPlayer(url) {
    return (
      <WebView
        source={url}
        style={styles.video}
      />
    )
}

renderVideoPlayer(url) {
    return (
        <TouchableHighlight
        ref={(ref) => {
          console.log(ref)
        }} style={{ flex: 1 }} onPress={() => this.videoRef.presentFullscreenPlayer()}>
        <Video
          ref={(ref) => {
            console.log(ref)
          }}
          source={{ uri: url }}
          style={styles.video}
          paused={true}
        />
        </TouchableHighlight>
    )
}

renderPlayer(video) {
    if (video) {
      if (video.toLowerCase().indexOf('youtube.com') >= 0) {
        const videoId = video.replace(/.+v=(.+?)(&|$)/g, '$1')
        return this.renderYouTubePlayer(videoId)
      } 
      else if (video.toLowerCase().indexOf('vimeo.com') >= 0) {
        return this.renderVimeoPlayer(video)
      } 
      else {
        return this.renderVideoPlayer(video)
      }
    }
    return this.renderYouTubePlayer('-xAFnaYDQa4')
  }

}

const styles = ReactNative.StyleSheet.create({
  container: {
    flex: 1
  }, 
  videoButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },

  playButtonText: {
    fontSize: 40,
    lineHeight: 32,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(255,255,255,0.5)',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 200,
    backgroundColor: 'red',
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'row'
  },

  header: {
    ...Platform.select({
      ios: {
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5
      },
      android: {
        padding: 8
      }
    }),
    backgroundColor: '#f8f8f8'
  },

  carouselContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderColor: 'black',
    borderWidth: 1,
  },

});


export default LandingView
