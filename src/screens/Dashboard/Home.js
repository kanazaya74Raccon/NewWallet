import React, { useContext, useEffect } from "react";
import {
  View,
  Clipboard,
  StatusBar,
  ScrollView,
  Dimensions,
  BackHandler,
} from "react-native";
import { BgView } from "../../components/Layouts";
import { ThemeContext } from "../../hooks/useTheme";
import { Paragraph } from "../../components/Typography";
import {
  HydroCard,
  HydroCard1,
  BNBCard,
  EtherCard,
  TuscCard,
  BTCCard,
  USDTCard,
  DAICard,
} from "../../components/cards";
import Web3 from 'web3';
import { ethers, } from 'ethers';
import { Apis } from "tuscjs-ws";
import w3s from '../../libs/Web3Service';
import Header from "../../components/Header";
import AsyncStorage from "@react-native-community/async-storage";

const { height, width } = Dimensions.get('window');

const Home = ({ navigation, route }) => {
  const { address, hydroId } = route.params;
  const [tuscbalance, setTuscbalance] = React.useState(0);
  const [hydrobalance, setHydrobalance] = React.useState(0);
  const [etherbalance, setEtherbalance] = React.useState(0);
  const [bnbbalance, setBNBbalance] = React.useState(0);
  const [btcbalance, setBTCbalance] = React.useState(0);
  const [usdtbalance, setUSDTbalance] = React.useState(0);
  const [daibalance, setDAIbalance] = React.useState(0);

  const { isLightTheme, lightTheme, darkTheme } = useContext(
    ThemeContext
  );

  const theme = isLightTheme ? lightTheme : darkTheme;

  function handleBackButtonClick() {
    if (navigation.isFocused()) {
      BackHandler.exitApp();
      return true;
    } else {
      return false;
    }

  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);

  const handlegetHydroBalance = async () => {
    try {
      // const value = await AsyncStorage.getItem('@privateKey');
      let currentProvider = await new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/75cc8cba22ab40b9bfa7406ae9b69a27');
      let provider = new ethers.providers.Web3Provider(currentProvider);
      let wallet = new ethers.Wallet(hydroId, provider)

      const abi = await w3s.getHydroTokenABI()
      const hydrotokenaddress = await w3s.getHydroTokenAddress()
      const contract = new ethers.Contract(hydrotokenaddress, abi, wallet)

      let hydrobalance = await contract.balanceOf(wallet.address);
      hydrobalance = Web3.utils.fromWei(hydrobalance.toString())
      setHydrobalance(hydrobalance)

    } catch (error) {
      console.log(error)
    }
  }

  const handlegetEtherBalance = async () => {
    try {
      // const value = await AsyncStorage.getItem('@privateKey');
      let currentProvider = await new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/75cc8cba22ab40b9bfa7406ae9b69a27');
      let provider = new ethers.providers.Web3Provider(currentProvider);
      let wallet = new ethers.Wallet(hydroId, provider)
      // this.setState({ walletaddress: wallet.address })

      const abi = await w3s.getHydroTokenABI()
      const hydrotokenaddress = await w3s.getHydroTokenAddress()
      const contract = new ethers.Contract(hydrotokenaddress, abi, wallet)

      let etherbalance = await wallet.getBalance()
      etherbalance = Web3.utils.fromWei(etherbalance.toString())
      setEtherbalance(etherbalance)

    } catch (error) {
      console.log(error)
    }
  }

  const handlegetTustBalance = async () => {
    const accountName = await AsyncStorage.getItem('@accountName');
    Apis.instance('wss://tuscapi.gambitweb.com/', true).init_promise.then((res) => {

      return Apis.instance().db_api().exec("lookup_accounts", [
        accountName, 100
      ]).then(accounts => {
        Apis.instance().db_api().exec("get_full_accounts", [accounts[0], false]).then(res => {
          let tuscbalance = res[0][1]['balances'][0]['balance']
          if (tuscbalance == 11000100000) {
            tuscbalance = 0;
          }
          setTuscbalance(tuscbalance)
        })
          .catch(err => {
            console.log('erro---->', err)
          })
      })
    })
  }

  useEffect(() => {
    handleGetAllBalances();
  }, [])

  const handleGetAllBalances = () => {
    // console.log('calling handleGetAllBalances')
    // setTimeout(handleGetAllBalances, 30000);
    handlegetHydroBalance();
    handlegetEtherBalance();
    // handlegetTustBalance();
  }

  return (
    <BgView>
      <Header />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: width * 0.05 }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
          <HydroCard
            balance={hydrobalance}
            usdVal={"120"}
            address={address}
            cardName="Hydro Card"
            transfer={() => navigation.navigate("transfer")}
            deposit={() => navigation.navigate("deposits", { mark: "HYDRO", walletToken: address })}
            history={() => navigation.navigate("etherhistory", { mark: "HYDRO" })}
          />

          <HydroCard1
            balance={hydrobalance}
            usdVal={"120"}
            address={address}
            cardName="Hydro Card1"
            transfer={() => navigation.navigate("transfer")}
            deposit={() => navigation.navigate("deposits", { mark: "HYDRO1", walletToken: address })}
            history={() => navigation.navigate("etherhistory", { mark: "HYDRO1" })}
          />

          <BNBCard
            balance={bnbbalance}
            usdVal={"730"}
            address={address}
            cardName="BNB Card"
            transfer={() => navigation.navigate("transfer")}
            deposit={() => navigation.navigate("deposits", { mark: "BNB", walletToken: address })}
            history={() => navigation.navigate("etherhistory", { mark: "BNB", walletToken: address })}
          />

          <EtherCard
            balance={etherbalance}
            address={address}
            usdVal={"3600"}
            cardName="Ether Card"
            transfer={() => navigation.navigate("transfer")}
            deposit={() => navigation.navigate("deposits", { mark: "ETH", walletToken: address })}
            history={() => navigation.navigate("etherhistory", { mark: "ETH" })}
          />

          <TuscCard
            balance={tuscbalance}
            usdVal={"111"}
            address={address}
            cardName="Tusc Card"
            transfer={() => navigation.navigate("transfer")}
            deposit={() => navigation.navigate("deposits", { mark: "TUSC", walletToken: address })}
            history={() => navigation.navigate("etherhistory", { mark: "TUSC" })}
          />

          <BTCCard
            balance={btcbalance}
            usdVal={"580"}
            address={address}
            cardName="BTC Card"
            transfer={() => navigation.navigate("transfer")}
            deposit={() => navigation.navigate("deposits", { mark: "BTC", walletToken: address })}
            history={() => navigation.navigate("etherhistory", { mark: "BTC" })}
          />

          <USDTCard
            balance={usdtbalance}
            usdVal={"1497"}
            address={address}
            cardName="USDT Card"
            transfer={() => navigation.navigate("transfer")}
            deposit={() => navigation.navigate("deposits", { mark: "USDT", walletToken: "0xdac17f958d2ee523a2206206994597c13d831ec7" })}
            history={() => navigation.navigate("etherhistory", { mark: "USDT", walletToken: "0xdac17f958d2ee523a2206206994597c13d831ec7" })}
          />

          <DAICard
            balance={daibalance}
            usdVal={"1998"}
            address={address}
            cardName="DAI Card"
            transfer={() => navigation.navigate("transfer")}
            deposit={() => navigation.navigate("deposits", { mark: "DAI", walletToken: "0x6b175474e89094c44da98b954eedeac495271d0f" })}
            history={() => navigation.navigate("etherhistory", { mark: "DAI", walletToken: "0x6b175474e89094c44da98b954eedeac495271d0f" })}
          />

          <View style={{
            backgroundColor: theme.headerbackground,
            width: '100%',
            height: height * 0.07,
            marginTop: height * 0.035,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center'
          }}>
            <Paragraph style={{
              fontFamily: 'Roboto',
              fontStyle: 'normal',
              fontWeight: '300',
              fontSize: height * 0.035,
              lineHeight: height * 0.036
            }}>Total Assets: 8756 USD</Paragraph>
          </View>
        </View>
      </ScrollView>
    </BgView >
  );
};

export default Home;
