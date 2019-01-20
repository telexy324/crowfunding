import React, {Component} from 'react'
import {getSupportorFundingDtails} from "../../eth/interaction";
import CardLists from '../common/cardLists'

let {fundingFactoryInstance} = require('../../eth/getInstance')

class SupportorFundingsTab extends Component {

    state = {
        supportorFundingDetails: [],
    }

    async componentDidMount() {
        let supportorFundingDetails = await getSupportorFundingDtails()
        console.log("222:", supportorFundingDetails)

        this.setState({
            supportorFundingDetails,
        })
    }

    render() {

        let {supportorFundingDetails} = this.state
        return (
            <CardLists details={supportorFundingDetails}/>
        )
    }
}

export default SupportorFundingsTab
