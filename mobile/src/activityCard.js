import React, { Component } from 'react'
import { View } from 'react-native'
import client from '@doubledutch/rn-client'

export default function activityCard(WrappedComponent, defaultPayload, defaultFrame) {
  return class extends Component {
    render() {
      let { frame, payload } = this.props
      if (!frame) frame = { height: 150, width: 300, ...defaultFrame }
      if (!payload) payload = defaultPayload || {}
      return client._b.isEmulated
        ? <View style={{paddingTop:50, backgroundColor: '#ddd'}}><WrappedComponent frame={frame} payload={payload} /></View>
        : <WrappedComponent frame={frame} payload={payload} />
    }
  }
}