import {fundingFactoryInstance, fundingInstance, newFundingInstance} from './getInstance'
import getWeb3 from "../utils/getWeb3";
import FundingFactoryContract from "../contracts/FundingFactory";

let getFundingDetails = (fundingAddresses) => {

    //分析流程:
    //1. 获取到特定众筹项目的合约实例
    //> a. 众筹项目的abi: fundingAb done
    //> b. 需要众筹项目的地址： allfundings[0]

    //数组如何遍历？？
    //map遍历完成之后，会得到加工后的数据：即三个包含了合约详情的promise
    let detailInfos = fundingAddresses.map(function (fundingAddress, index) {

        return new Promise(async (resolve, reject) => {
            try {
                console.log(index, fundingAddress)

                //有abi，有地址，已经可以调用方法了
                // fundingInstance.options.address = fundingAddress

                //调用这个方法，保证每次返回的fundingInstance1总是唯一的
                let fundingInstance1 = newFundingInstance()
                fundingInstance1.options.address = fundingAddress

                //2. 使用实例，调用方法（获取项目名字）
                let manager = await fundingInstance1.methods.manager().call()
                let projectName = await fundingInstance1.methods.projectName().call()
                let targetMoney = await fundingInstance1.methods.targetMoney().call()
                let supportMoney = await fundingInstance1.methods.supportMoney().call()

                //众筹剩余时间
                let leftTime = await fundingInstance1.methods.getLeftTime().call()

                //参与人数
                let supportorCounts = await fundingInstance1.methods.getSupportersCount().call()

                let currentBalance = await fundingInstance1.methods.getBalance().call()

                // let detail = {fundingAddress, manager, projectName, targetMoney, supportMoney, endTime}
                let detail = [
                    fundingAddress,
                    manager,
                    projectName,
                    targetMoney,
                    supportMoney,
                    leftTime,
                    supportorCounts,
                    currentBalance,
                ]

                resolve(detail)
            } catch (e) {
                reject(e)
            }
        })
    })

    //在es6中，可以使用 Promise.all函数，将多一个promise转换成一个promise
    let detailInfosPromise = Promise.all(detailInfos)

    return detailInfosPromise
    // detailInfosPromise.then(infos => {
    //     console.table(infos)
    // })
}

let getAllFundingDetails = async () => {
        console.log("getFIns")
        let web3 = await getWeb3();
        console.log("getFIns2")
        let accounts = await web3.eth.getAccounts();
        console.log("getFIns3")
        let instance = await fundingFactoryInstance();
        console.log("getFIns4")
        let allfundings /*众筹项目的地址数组*/ = await instance.methods.getAllFundings().call({
            from: accounts[0]
        })
        console.log('111222333',allfundings)

        return getFundingDetails(allfundings)

}

// let getAllFundingDetails = async () => {
//     let web3 = await getWeb3();
//     let accounts = await web3.eth.getAccounts();
//     let networkId = await web3.eth.net.getId();
//     let deployedNetwork = FundingFactoryContract.networks[networkId];
//     let instance = new web3.eth.Contract(
//         FundingFactoryContract.abi,
//         deployedNetwork && deployedNetwork.address,
//     );
//
//     let allfundings /*众筹项目的地址数组*/ = await instance.methods.getAllFundings().call({
//         from: accounts[0]
//     })
//
//     console.log('111222333',allfundings)
//     return getFundingDetails(allfundings)
//
// }

let getCreatorFundingDetails = async () => {
    //根据工厂合约实例，获取所有的合约，并且打印在界面上

    //对于一个方法，如果它内部使用了msg.sender，那么一定要指定from
    //否则会默认使用助记词对应的主账户，也就是第一账户

        let web3 = await getWeb3();
        let accounts = await web3.eth.getAccounts();

        let instance = await fundingFactoryInstance();
        let creatorfundings /*众筹项目的地址数组*/ = await instance.methods.getCreatorFundings().call({
            from: accounts[0]
        })

        // console.log("allfundings :", allfundings)
        console.table(creatorfundings)
        return getFundingDetails(creatorfundings)
}

let getSupportorFundingDtails = async () => {

        let web3 = await getWeb3();
        let accounts = await web3.eth.getAccounts();
        let instance = await fundingFactoryInstance();
        let supportorfundings /*众筹项目的地址数组*/ = await instance.methods.getSupportorFundings().call({
            from: accounts[0]
        })

        return getFundingDetails(supportorfundings)

}

//创建新的合约分析
// "海王", 2000, 1, 499
let createFunding = (projectName, targetMoney, supportMoney, duration) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('beginweb3')
            let instance = await fundingFactoryInstance();
            console.log(supportMoney)
            let web3 = await getWeb3();
            console.log(duration)
            let accounts = await web3.eth.getAccounts();
            console.log(projectName)

            let res = await instance.methods.createFunding(projectName,
                targetMoney, supportMoney, duration).send({
                from: accounts[0]
            })

            resolve(res)
        }
        catch (e) {
            console.log(e)
        }
    })
}

//参与众筹函数实现
let supportFunding = (fundingAddress, supportMoney) => {
    //
    // 1. 创建合约的实例
    // 2. 添加地址
    // 3. 发起调用方法

    return new Promise(async (resolve, reject) => {

        try {
            let web3 = await getWeb3();
            let accounts = await web3.eth.getAccounts();

            let fundingInstance = newFundingInstance() //骨架abi
            fundingInstance.options.address = fundingAddress //灵魂

            let res = await fundingInstance.methods.support().send({
                from: accounts[0],
                value: supportMoney
            })
            resolve(res)

        } catch (e) {
            reject(e)
        }
    })
}

let createRequest = (fundingAddress, description, cost, sellerAddress) => {
    // 1. 传递地址+参数（花费描述，花费金额，花费收款地址）
    // 2. 创建合约实例，填充地址
    // 3. 调用createRequest方法

    return new Promise(async (resolve, reject) => {

        try {
            let web3 = await getWeb3();
            let accounts = await web3.eth.getAccounts();

            let fundingInstance = newFundingInstance() //骨架abi
            fundingInstance.options.address = fundingAddress //灵魂

            let res = await fundingInstance.methods.createRequest(description, cost, sellerAddress).send({
                from: accounts[0],
                // value: supportMoney
            })
            resolve(res)

        } catch (e) {
            reject(e)
        }
    })
}


//通过请求两次，将所有的花费请求数据通过一个promise的数组返回去
const showAllRequests = (fundingAddres) => {
    return new Promise(async (resolve, reject) => {
        try {
            let web3 = await getWeb3();
            let accounts = await web3.eth.getAccounts();
            let fundingInstance = newFundingInstance()
            fundingInstance.options.address = fundingAddres;

            let requestCount = await fundingInstance.methods.getRequestCount().call({
                from: accounts[0],
            });

            let requestDetails = [];
            for (let i = 0; i < requestCount; i++) {
                let requestDetail = await fundingInstance.methods.getRequestByIndex(i).call({
                    from: accounts[0],
                });

                requestDetails.push(requestDetail);
            }
            resolve(requestDetails);
        } catch (e) {
            reject(e);
        }
    })
}


export {
    getAllFundingDetails,
    getCreatorFundingDetails,
    getSupportorFundingDtails,
    createFunding,
    supportFunding,
    createRequest,
    showAllRequests,
}
