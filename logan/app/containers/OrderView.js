import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { Icon, Divider } from 'react-native-elements'

import { JText, JLayout } from '../components'

@connect(({ app }) => ({ ...app }))
class OrderView extends Component {
  state = {
    search: ''
  }

  componentDidMount () {

  }

  render() {

    const { params } = this.props.navigation.state
    
    let statColor = 'black'
    let paymentStat = 'Unpaid'
    let processStat = 'Pending'

    switch(params.status)
    {
        case 'done': statColor = 'green'; processStat = 'Done'; break;
        case 'processing': statColor = '#0088dd'; processStat = 'Processing'; break;
        case 'pending': statColor = '#dd0042'; processStat = 'Pending'; break;
        default: statColor =  '#000'; processStat = 'Pending'; break
    }

    switch(params.paymentStatus)
    {
        case 'partial': paymentStat = 'Partial Pmt'; break;
        case 'full': paymentStat = 'Fully Paid'; break;
        case 'nothing': paymentStat = 'Still Unpaid'; break;
        default: paymentStat = 'Still Unpaid'; break
    }

    return (
      <JLayout noScroll unpad>
        <View style={{ backgroundColor: 'rgba(229, 0, 76, 0.7)', padding: 20 }}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ marginRight: 15 }}><Icon
                    name='package'
                    type='feather'
                    color='white'
                    size={25} /></View>
                <View>
                    <JText style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}>{params.order}</JText>
                    <JText style={{ fontSize: 20, color: 'white' }}>{params.addon}</JText>
                </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                <View style={{ marginRight: 15 }}><Icon
                    name='user'
                    type='feather'
                    color='white'
                    size={25} /></View>
                <View>
                    <JText style={{ fontSize: 23, color: 'white' }}>{params.customer}</JText>
                    <JText style={{ fontSize: 20, color: 'white' }}>{params.customerContact}</JText>
                </View>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 20 }}>
                <View style={{ marginRight: 15 }}><Icon
                    name='clock'
                    type='feather'
                    color='white'
                    size={25} /></View>
                <View>
                    <JText style={{ fontSize: 23, color: 'white' }}>July 15, {params.pickupTime} at {params.pickupLoc}</JText>
                </View>
            </View>

            <Divider style={{ backgroundColor: 'white' }} />

            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 0.5 }}>
                    <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 20 }}>
                        <View style={{ marginRight: 15 }}><Icon
                            name='thumbs-up'
                            type='feather'
                            color='white'
                            size={25} /></View>
                        <View>
                            <JText style={{ fontSize: 23, color: 'white' }}>{processStat}</JText>
                        </View>
                    </View>
                </View>

                <View style={{ flex: 0.5 }}>
                    <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 20 }}>
                        <View style={{ marginRight: 15 }}><Icon
                            name='dollar-sign'
                            type='feather'
                            color='white'
                            size={25} /></View>
                        <View>
                            <JText style={{ fontSize: 23, color: 'white' }}>{paymentStat}</JText>
                        </View>
                    </View>
                </View>
            </View>

            <Divider style={{ backgroundColor: 'white' }} />
        </View>
      </JLayout>
    )
  }
}

export default OrderView
