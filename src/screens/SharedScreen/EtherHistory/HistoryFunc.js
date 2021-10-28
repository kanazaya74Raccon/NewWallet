import {
    ToastAndroid
} from "react-native";
import Web3 from 'web3';
import { ethers, } from 'ethers';
import w3s from '../../../libs/Web3Service';

const Items = [
    { value1: '- 111.00 HYDRO', value2: '- 20.00 USD' },
    { value1: '- 111.00 HYDRO', value2: '- 20.00 USD' },
    { value1: '- 111.00 HYDRO', value2: '- 20.00 USD' },
    { value1: '- 111.00 HYDRO', value2: '- 20.00 USD' },
    { value1: '- 111.00 HYDRO', value2: '- 20.00 USD' }
]

export const bnbhistory = async (walletToken, setItems) => {
    try {
        const tableData = [];
        let url = 'https://api.bscscan.com/api?module=account&action=txlist&address=' + walletToken;

        fetch(url).then((response) => response.json()).then((history) => {

            history.result.forEach((tx) => {
                const rowData = [];
                let value = Web3.utils.fromWei(tx.value.toString())
                tx.from = tx.from.toString()
                if (tx.from.toLowerCase() === walletToken.toLowerCase()) {
                    console.log(tx)

                    // rowData.push('OUT')
                    // rowData.push(tx.to)
                    rowData.push(value)
                    //rowData.push(Math.pow(16, tx.value._hex))
                    //rowData.push(tx.timestamp)
                    // rowData.push(tx.confirmations)
                } else {
                    console.log('tx.from', tx.from)
                    console.log('walletToken', walletToken)
                    // rowData.push('IN')
                    // rowData.push(tx.from)
                    rowData.push(value)
                    //rowData.push(Math.pow(16, tx.value._hex))
                    //rowData.push(tx.timestamp)
                    // rowData.push(tx.confirmations)
                }
                tableData.push(rowData)

            })
            console.log('history----------->', tableData)
            // this.setState({ history: tableData })
            // return tableData;
            setItems(tableData)

        }).catch((error) => {
            console.error(error);
        });

    }
    catch (ex) {
        if (ex.message)
            ToastAndroid.show(ex.message, ToastAndroid.SHORT);
    }
};


export const tokenhistory = async (provider, privatekeyValue, walletToken, setItems) => {
    try {
        let currentProvider = await new Web3.providers.HttpProvider(provider);
        let provide = new ethers.providers.Web3Provider(currentProvider);
        const wallet = new ethers.Wallet(privatekeyValue, provide)
        const walletAddress = wallet.address;
        const abi = await w3s.getHydroTokenABI();

        const contract = new ethers.Contract(walletToken, abi, wallet)

        let iface = new ethers.utils.Interface(abi)

        let filterFromMe = contract.filters.Transfer(walletAddress, null);
        filterFromMe.fromBlock = 0;

        let logs = await provide.getLogs(filterFromMe);

        const tableData = [];
        console.log('logs', logs)
        logs.forEach((tx) => {
            let data = iface.parseLog(tx);
            console.log(tx)
            let hex_amount = data.values._amount['_hex'];
            console.log('a')
            let amount = Web3.utils.toBN(hex_amount);

            amount = amount / (10 ** this.state.decimals);
            console.log(amount)

            const rowData = [];

            // rowData.push('OUT')
            // rowData.push(tx.topics[0])
            rowData.push(amount)
            //rowData.push(Math.pow(16, tx.value._hex))
            // rowData.push(tx.blockNumber)

            tableData.push(rowData)

        })

        let filterToMe = contract.filters.Transfer(null, walletAddress);
        filterToMe.fromBlock = 0;

        let logs_toMe = await provide.getLogs(filterToMe);
        logs_toMe.forEach((tx) => {
            let data = iface.parseLog(tx);
            let hex_amount = data.values._amount['_hex'];
            let amount = Web3.utils.toBN(hex_amount);
            amount = amount / (10 ** this.state.decimals);
            console.log(amount)
            const rowData = [];

            // rowData.push('IN')
            // rowData.push(tx.topics[0])
            rowData.push(amount)
            //rowData.push(Math.pow(16, tx.value._hex))
            // rowData.push(tx.blockNumber)

            tableData.push(rowData)


        })

        tableData.sort(
            function (a, b) {
                if (a[3] > b[3]) return -1
                if (a[3] < b[3]) return 1
                return 0
            }
        )
        // this.setState({ history: tableData })
        console.log('tableData--->', tableData)
        setItems(tableData)

    }
    catch (ex) {
        if (ex.message)
            ToastAndroid.show(`error ${ex.message}`, ToastAndroid.SHORT);
    }
};