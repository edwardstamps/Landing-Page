import React, { Component } from 'react';
import ReactNative, {Button, NativeEventEmitter, Modal, Platform} from 'react-native';
import client, { Avatar, TitleBar } from '@doubledutch/rn-client'
import RNFetchBlob from 'react-native-fetch-blob'
import SquareView from './square-view'
import LandingView from './landing-view'
import SpeakerCarouselView from './speaker-carousel-view'
import FooterView from './footer-view'
import VideosView from './dual-videos'
import ImageSquaresView from './image-square-view'
import ImageCarouselView from './image-carousel-view'
import SmallView from './small-view'
import OneImageView from './one-image-view'
import TwoImageView from './two-image-view'
import TextView from './text-view'

const { Alert, TouchableOpacity, TouchableHighlight, Text, View, ScrollView, Image,WebView, Dimensions, PixelRatio,Linking } = ReactNative
const packageInfo = require('../package.json')
const { currentEvent, currentUser, primaryColor } = client

class HomeView extends Component {
  constructor() {
    super()
    const eventID = currentEvent.EventId
    this.state = {
        launchVideoURL:'',
    }
  }

  componentDidMount() {
    var self = this
  }

  render() {
        landingInfo = {
            headline : "#eventlife",
            title : "#eventlife",
            des : "Discover what attendees can do with DoubleDutch event apps",
            video : "https://www.youtube.com/watch?v=-xAFnaYDQa4"
        }
        dualVideosInfo = {
            header : true,
            footer: true,
            title : "Video 1",
            des : "Additional Info",
            buttonURL : 'http://doubledutch.me/company/contact-us/',
            buttonText : "Click Here!",
            video : "https://www.youtube.com/watch?v=-xAFnaYDQa4"
        }
        squaresInfo = {
            header : true,
            footer: true,
            title : "Squares",
            des : "Additional Info",
            buttonURL : 'http://doubledutch.me/company/contact-us/',
            buttonText : "Click Here!",
            image1: 'https://s3.amazonaws.com/dd-bazaar/icons/icon_medal.png',
            image2: 'https://s3.amazonaws.com/dd-bazaar/icons/icon_heart.png',
            image3: 'https://s3.amazonaws.com/dd-bazaar/icons/icon_question.png',
            image4: 'https://s3.amazonaws.com/dd-bazaar/icons/icon_screen.png',
            text1: 'Post a fun fact in the Activity Feed to earn an achievement',
            text2: 'Sync your social media to cross-post to all your fans',
            text3: 'Got a question? Send a message to DoubleDutch rockstar Ashley Phelps',
            text4: 'Join a topic channel to chat with like-minded attendees'
        }
        imageSquaresInfo = {
            header : false,
            footer: true,
            title : "Squares",
            des : "Additional Info",
            buttonURL : 'http://doubledutch.me/company/contact-us/',
            buttonText : "Click Here!",
            image1: 'https://s3.amazonaws.com/dd-bazaar/icons/icon_medal.png',
            image2: 'https://s3.amazonaws.com/dd-bazaar/icons/icon_heart.png',
            image3: 'https://s3.amazonaws.com/dd-bazaar/icons/icon_question.png',
            image4: 'https://s3.amazonaws.com/dd-bazaar/icons/icon_screen.png',
        }
        speakerCarouselInfo = {
            header: false,
            footer: true,
            title: "Test",
            des: "More Info",
            buttonURL: 'http://doubledutch.me/company/contact-us/',
            buttonText: "Click Here!",
            speakerInfo: [
                {
                    name: "John Smith",
                    image: 'https://s3.amazonaws.com/dd-bazaar/icons/icon_medal.png',
                    title: "Head of Product",
                    company: "Tesla",
                    des: "Some Info",
                    URL: 'http://doubledutch.me/company/contact-us/',
                },
                {
                    name: "John Smith",
                    image: 'https://s3.amazonaws.com/dd-bazaar/icons/icon_medal.png',
                    title: "Head of Product",
                    company: "Tesla",
                    des: "Additional information on John that he would like to share to the event attendees: John started his career as a car designer focused on aerodynamics. After years on the Design team he became more involved with engineering",
                    URL: 'http://doubledutch.me/company/contact-us/',
                }
            ]
        }
        imageCarouselInfo = {
            header: false,
            footer: true,
            title: "Test",
            des: "More Info",
            buttonURL: 'http://doubledutch.me/company/contact-us/',
            buttonText: "Click Here!",
            imageInfo: [
                {
                    image: 'https://s3.amazonaws.com/dd-bazaar/icons/icon_medal.png',
                    URL: 'http://doubledutch.me/company/contact-us/',
                },
                {
                    image: 'https://s3.amazonaws.com/dd-bazaar/icons/icon_medal.png',
                    URL: 'http://doubledutch.me/company/contact-us/',
                }
            ]
        }

        smallViewInfo = {
            image: 'https://s3.amazonaws.com/dd-bazaar/icons/icon_medal.png',
            title: "Welcome to this View!",
            des: "Additional Information about this view will be shared here"
        }

        oneImageInfo = {
            header: false,
            footer: true,
            title: "Test",
            des: "More Info",
            buttonURL: 'http://doubledutch.me/company/contact-us/',
            buttonText: "Click Here!",
            imageInfo:{
                image: 'https://s3.amazonaws.com/dd-bazaar/icons/icon_medal.png',
            }
        }

        twoImageInfo = {
            header: false,
            footer: true,
            title: "Test",
            des: "More Info",
            buttonURL: 'http://doubledutch.me/company/contact-us/',
            buttonText: "Click Here!",
            imageInfo: [
                {
                    image: 'https://s3.amazonaws.com/dd-bazaar/icons/icon_medal.png',
                },
                {
                    image: 'https://s3.amazonaws.com/dd-bazaar/icons/icon_medal.png',
                }
            ]
        }

        textInfo = {
            header: false,
            footer: true,
            title: "Test",
            des: "More Info",
            buttonURL: 'http://doubledutch.me/company/contact-us/',
            buttonText: "Click Here!",
            content: "This is the test content for this box. Pizza is a simple product that can become very complex. It's simply bread, tomato, and cheese but mastering that combination can take years. When cooking the perfect pizza it starts with the crust. High Quality wheat is where we begin. From the"
        }

        footerInfo = {
            buttons : [
                {
                    buttonURL: 'http://doubledutch.me/company/contact-us/',
                    buttonTitle: "Visit the DoubleDutch Blog",
                },
                {
                    buttonURL: 'http://doubledutch.me/company/contact-us/',
                    buttonTitle: "Contact Us to Learn More",
                }
            ]
        }

        return (
        <View title="" style={{ flex: 1,backgroundColor:'#E8E8E8' }}>
            <TitleBar title="Welcome" client={client} signin={this.signin} />
            <ScrollView style={styles.container}>
                <LandingView details = {landingInfo}/>
                <SmallView details = {smallViewInfo}/>
                <OneImageView details = {oneImageInfo}/>
                <SpeakerCarouselView details = {speakerCarouselInfo}/>
                <TwoImageView details = {twoImageInfo}/>
                <TextView details = {textInfo}/>
                <ImageSquaresView details = {imageSquaresInfo}/>
                <VideosView details = {dualVideosInfo}/>
                <ImageCarouselView details = {imageCarouselInfo}/>
                <SquareView details = {squaresInfo}/>
                <FooterView details = {footerInfo}/>
            </ScrollView>
        </View>
    )
  }
}


const styles = ReactNative.StyleSheet.create({
  container: {
    flex: 1
  }, 
});



export default HomeView