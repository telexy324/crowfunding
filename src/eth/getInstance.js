import FundingContract from "../contracts/Funding.json";
import FundingFactoryContract from "../contracts/FundingFactory.json";
import SupportsToFundingsContract from "../contracts/SupportsToFundings.json";
import getWeb3 from "../utils/getWeb3";

// const getenv = async () => {
//     try {
//         let web3 = await getWeb3();
//         let networkId = await web3.eth.net.getId();
//         let deployedNetwork = FundingFactoryContract.networks[networkId];
//         return web3, deployedNetwork
//     } catch (e) {
//         console.log(e)
//     }
// }

let fundingFactoryInstance = async () => {
    try {
        console.log('fctry1')
        let web3 = await getWeb3();
        console.log('fctry2')
        let networkId = await web3.eth.net.getId();
        console.log('fctry3')
        let deployedNetwork = FundingFactoryContract.networks[networkId];
        console.log('fctry4')
        let instance = new web3.eth.Contract(
            FundingFactoryContract.abi,
            deployedNetwork && deployedNetwork.address,
        );
        console.log('fctry5')
        return instance
    } catch (e) {
        console.log(e)
    }
}

let fundingInstance = async () => {
    try {
        let web3 = await getWeb3();
        let networkId = await web3.eth.net.getId();
        let deployedNetwork = FundingContract.networks[networkId];
        let instance = new web3.eth.Contract(
            FundingContract.abi,
            deployedNetwork && deployedNetwork.address,
        );
        return instance
    } catch (e) {
        console.log(e)
    }
}

//提供一个方法（每次调用这个方法时，都会创建一个新的fundingInstance）
let newFundingInstance = async () => {
    try {
        let web3 = await getWeb3();
        let networkId = await web3.eth.net.getId();
        let deployedNetwork = FundingContract.networks[networkId];
        let instance = new web3.eth.Contract(
            FundingContract.abi,
            deployedNetwork && deployedNetwork.address,
        );
        return instance
    } catch (e) {
        console.log(e)
    }
}

// const fundingFactoryInstance = async () => {
//     try {
//         let {web3,deployedNetwork} = await getenv();
//         let instance = new web3.eth.Contract(
//             FundingFactoryContract.abi,
//             deployedNetwork && deployedNetwork.address,
//         );
//         return instance
//     } catch (e) {
//         console.log(e)
//     }
// }
//
// const fundingInstance = async () => {
//     try {
//         let {web3,deployedNetwork} = await getenv();
//         let instance = new web3.eth.Contract(
//             FundingContract.abi,
//             deployedNetwork && deployedNetwork.address,
//         );
//         return instance
//     } catch (e) {
//         console.log(e)
//     }
// }
//
// //提供一个方法（每次调用这个方法时，都会创建一个新的fundingInstance）
// let newFundingInstance = async () => {
//     try {
//         let {web3,deployedNetwork} = await getenv();
//         let instance = new web3.eth.Contract(
//             FundingContract.abi,
//             deployedNetwork && deployedNetwork.address,
//         );
//         return instance
//     } catch (e) {
//         console.log(e)
//     }
// }

export {
    fundingFactoryInstance,
    fundingInstance,
    newFundingInstance
}

// export  fundingFactoryInstance
// module.exports = {
//     fundingFactoryInstance,
//     fundingInstance,
//     newFundingInstance,
// }
