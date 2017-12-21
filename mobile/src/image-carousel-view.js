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
import Carousel from 'react-native-carousel'
import YouTube, { YouTubeStandaloneAndroid } from 'react-native-youtube'


class ImageCarouselView extends Component {
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

    showFooter = (link) => {
        if (this.props.details.footer === true) {
            return(
                <View style = {{backgroundColor: '#FFFFFF'}}>
                    <TouchableOpacity onPress={()=>{
                    Linking.openURL(link)
                    }} style={{marginTop:0}}>
                        <View style={{backgroundColor: this.state.userColor,borderRadius:4,padding:10, margin: 20, marginTop: 0}}>
                            <Text style={{color:'white',textAlign:'center',fontSize:16}}>{this.props.details.buttonText}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }
    }


    carouselCells = () => {
        const width = Dimensions.get('window').width
        const height = width * .931
        return(
            this.props.details.imageInfo.map((item =>
                <TouchableOpacity onPress={()=>{Linking.openURL(item.URL)}} style={{width, height, marginBottom: 50, backgroundColor:'#E8E8E8'}}>
                    <Image style={{flex: 1}}source={{uri: item.image}}></Image>
                </TouchableOpacity> 
            ))
        )
    }

    
  
    render() {
      return (
        <View style={{marginBottom: 0, borderColor:'#D8D8D8', borderBottomWidth:1, backgroundColor: "white"}}>
            <View style={{borderColor:'#D8D8D8',borderBottomWidth:1, height: 50, flex: 1, backgroundColor:'#E8E8E8'}}/>
            {this.showHeader()}
            <Carousel
            indicatorAtBottom={true}
            animate={false}
            indicatorOffset={0}
            >
                {this.carouselCells()}    
            </Carousel>
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
    header2: {
        textAlign: "left",
        fontSize: 18,
        flex: 1,
        marginLeft: 15,
        marginTop: 5,
        marginBottom: 15
    },
    description : {
        textAlign: "center",
        fontSize: 14,
        flex: 1,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 6,
        marginBottom: 25
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
   
   });


export default ImageCarouselView


