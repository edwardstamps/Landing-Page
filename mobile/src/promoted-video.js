import React, { Component } from 'react'
import ReactNative, {
  Alert, TouchableOpacity, Text, View,
  ScrollView, Image, NativeEventEmitter,
  TouchableHighlight, Modal,
  Dimensions, Platform, WebView
} from 'react-native'

import client from '@doubledutch/rn-client'
import activityCard from './activityCard'

import Video from 'react-native-video'
import RNFetchBlob from 'react-native-fetch-blob'

import YouTube, { YouTubeStandaloneAndroid } from 'react-native-youtube'

class PromotedVideo extends Component {
  static getHeight() {
    return 100
  }

  constructor(props) {
    super()
    this.state = {
      paused: true, muted: true,
      loading: true, progress: 0.0,
      height: 241,
      showModal: false
    }
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
    } else {
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

          style={styles.video}
        />
      )
    }
  }

  renderVimeoPlayer(url) {
    return (
      //https://vimeo.com/221423377
      <WebView
        source={{ uri: "https://vimeo.com/221423377" }}
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

  renderPlayer() {
    if (this.props.payload.VideoUrl) {
      if (this.props.payload.VideoUrl.toLowerCase().indexOf('youtube.com') >= 0) {
        const videoId = this.props.payload.VideoUrl.replace(/.+v=(.+?)(&|$)/g, '$1')
        return this.renderYouTubePlayer(videoId)
      } else if (this.props.payload.VideoUrl.toLowerCase().indexOf('vimeo.com') >= 0) {
        return this.renderVimeoPlayer(this.props.payload.VideoUrl)
      } else {
        return this.renderVideoPlayer(this.props.payload.VideoUrl)
      }
    }

    return this.renderYouTubePlayer('KVZ-P-ZI6W4')
  }

  render() {
    return (
      <View style={ styles.container }>

        <View style={ styles.header }>
          <Text style={ styles.headerText }>Promoted Post</Text>
        </View>

        <View style={ [{height: this.state.height}] }>
          <View style={ styles.videoButton }>
            <View style={ styles.video }>
              {this.renderPlayer()}
            </View>
          </View>
        </View>

        <View>{ this.renderText() }</View>
        
        <View>{ this.renderButton() }</View>

      </View>
    )
  }

  renderText() {
    if (this.props.payload.Notes) {
      return (
        <Text style={ styles.text }>{ this.props.payload.Notes }</Text>
      )
    }
  }

  renderButton() {
    if (this.props.payload.CallToAction) {
      return (
        <TouchableOpacity style={ styles.button } onPress={() => this.navigateToCallToActionRoute()}>
          <Text style={ styles.buttonText }>{ this.props.payload.CallToAction.Title }</Text>
        </TouchableOpacity>
      )
    }
  }

  navigateToCallToActionRoute() {
    //TODO: update to internal (DD) vs external routing
    client.openURL(this.props.payload.CallToAction.Route)
  }
}

const styles = ReactNative.StyleSheet.create({
  progress: {
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
  headerText: {
    fontWeight: '300',
    color: '#b9b9b9',
    ...Platform.select({
      ios: {
        fontSize: 12,
        fontFamily: 'Helvetica Neue'
      },
      android: {
        fontSize: 14,
        fontFamily: 'system font'
      }
    })
  },
  playButton: {
    height: 80,
    width: 80,
    backgroundColor: 'rgba(170,170,170,0.6)',
    zIndex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40
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
  container: {
    backgroundColor: '#fff'
  },
  text: {
    padding: 10,
    fontWeight: '200',
    ...Platform.select({
      ios: {
        color: '#303030',
        fontSize: 14,
        fontFamily: 'System'
      },
      android: {
        color: '#000',
        fontSize: 17,
        fontFamily: 'system font'
      }
    })
  },
  videoButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  button: {
    height: 44,
    backgroundColor: client.primaryColor,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    ...Platform.select({
      ios: {
        fontSize: 17,
        fontFamily: 'System'
      },
      android: {
        fontSize: 14,
        fontFamily: 'system font'
      }
    })
  }
})

const defaultPayload = {
  VideoUrl: 'https://www.youtube.com/watch?v=VjfmP7h3gBw',
  Notes: 'Can you hear the people sing?',
  CallToAction: {
    Title: 'Yes!',
    Route: 'https://en.wikipedia.org/wiki/Les_Mis%C3%A9rables'
  }
}

export default activityCard(PromotedVideo, defaultPayload)
