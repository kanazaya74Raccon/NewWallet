import {
    ToastAndroid
} from "react-native";
import w3s from '../../../libs/Web3Service';
import Web3 from 'web3';
import { ethers, } from 'ethers';

export const EtherWithdraw = async (hydroaddress, amount, privatekeyValue, navigation) => {
    try {

        if (!hydroaddress) {
            ToastAndroid.show("Ether Address Required", ToastAndroid.SHORT);
            return
        }

        if (!amount) {
            ToastAndroid.show("uint256 must required!", ToastAndroid.SHORT);
            return
        }
        let web3 = await new Web3('https://mainnet.infura.io/v3/75cc8cba22ab40b9bfa7406ae9b69a27');

        let privateKey = privatekeyValue;
        let wallet = new ethers.Wallet(privateKey)
        var txCount = await web3.eth.getTransactionCount(wallet.address)
        var gasPrice = await web3.eth.getGasPrice()
        let transaction = {
            to: hydroaddress,
            value: ethers.utils.parseEther(amount),
            chainId: 1,
            nonce: txCount,
            gasPrice: gasPrice
        }
        web3.eth.estimateGas(transaction).then(function (estimate) {
            transaction.gasLimit = estimate;
            var signPromise = wallet.sign(transaction);
            signPromise.then((signedTransaction) => {
                web3.eth.sendSignedTransaction(signedTransaction).then((tx) => {
                    console.log(tx);
                    navigation.navigate('Home');
                })
                    .catch((e) => {
                        console.log(e.message)
                    })
            })
                .catch((e) => {
                    console.log(e.message)
                })

        })
            .catch((e) => {
                console.log(e.message)
            })
    }
    catch (ex) {
        if (ex.message)
            ToastAndroid.show(ex.message, ToastAndroid.SHORT);

    }
};



export const Hydrodeposits = async (hydroaddress, amount, privatekeyValue, navigation) => {
    try {

        if (!hydroaddress) {
            ToastAndroid.show("Hydro Address Required", ToastAndroid.SHORT);
            return
        }
        if (!amount) {
            ToastAndroid.show("uint256 must required!", ToastAndroid.SHORT);
            return
        }

        let privateKey = privatekeyValue;

        const abi = await w3s.getHydroTokenABI();
        const hydrotokenaddress = await w3s.getHydroTokenAddress();

        const provider = ethers.getDefaultProvider()
        const wallet = new ethers.Wallet(privateKey, provider)

        const contract = new ethers.Contract(hydrotokenaddress, abi, wallet)

        const receiverWallet = hydroaddress

        const howMuchTokens = ethers.utils.parseUnits(amount, 18)
        console.log("Before sending!")
        async function sendTokens() {
            await contract.transfer(receiverWallet, howMuchTokens)
            console.log(`Sent ${howMuchTokens} Hydro to address ${receiverWallet}`)
            navigation.navigate('Home');
        }
        sendTokens()
    }
    catch (ex) {
        console.log(ex)
        if (ex.message)
            ToastAndroid.show(ex.message, ToastAndroid.SHORT);
    }
};



export const BNBwithdraw = async (hydroaddress, amount, privatekeyValue, navigation) => {
    try {

        if (!hydroaddress) {
            ToastAndroid.show("BNB Address Required", ToastAndroid.SHORT);
            return
        }

        if (!amount) {
            ToastAndroid.show("amount is required!", ToastAndroid.SHORT);
            return
        }

        let web3 = await new Web3('https://bsc-dataseed.binance.org/');

        let privateKey = privatekeyValue;

        let currentProvider = await new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/');
        let provider = new ethers.providers.Web3Provider(currentProvider);

        let wallet = new ethers.Wallet(privateKey, provider)

        wallet.sendTransaction({ to: hydroaddress, value: ethers.utils.parseEther(amount) }).then((error) => {
            ToastAndroid.show("Transfer Success!", ToastAndroid.SHORT);
            navigation.navigate('Home');
        }).catch((error) => {
            ToastAndroid.show(error.message, ToastAndroid.SHORT);
        })
    }
    catch (ex) {
        console.log(ex)
        if (ex.message)
            ToastAndroid.show(ex.message, ToastAndroid.SHORT);
    }
};



export const USDTdeposits = async (receiveraddress, amount, privatekeyValue, walletToken, decimals, navigation) => {

    try {

        if (!receiveraddress) {
            ToastAndroid.show("Receiver Address Required", ToastAndroid.SHORT);
            return
        }

        if (!amount) {
            ToastAndroid.show("Amount is required!", ToastAndroid.SHORT);
            return
        }

        const abi = await w3s.getCustomTokenABI();
        const customtokenaddress = walletToken

        const provider = ethers.getDefaultProvider()
        const wallet = new ethers.Wallet(privatekeyValue, provider)
        const contract = new ethers.Contract(customtokenaddress, abi, wallet)
        const receiverWallet = receiveraddress
        const howMuchTokens = ethers.utils.parseUnits(amount, decimals)

        console.log("Before sending!")
        async function sendTokens() {
            try {
                result = await contract.transfer(receiverWallet, howMuchTokens)
                return true;
            } catch (error) {
                return false, error
            }
        }
        let result, error = await sendTokens()
        console.log('result', result, 'error', error)
        if (result) {
            ToastAndroid.show("Transfer successful!", ToastAndroid.SHORT);
            navigation.navigate('Home');
        } else {
            ToastAndroid.show(error.message, ToastAndroid.SHORT);
        }
    }
    catch (ex) {
        console.log(ex)
        if (ex.message)
            ToastAndroid.show(ex.message, ToastAndroid.SHORT);
    }


};