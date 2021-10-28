import React, { useContext, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Clipboard,
  ToastAndroid,
  Dimensions,
  Platform, StatusBar, StyleSheet
} from "react-native";
import { BgView, Header } from "../../components/Layouts";
import { Paragraph, Lead } from "../../components/Typography";
import { ThemeContext } from "../../hooks/useTheme";
import Icon from "react-native-vector-icons/FontAwesome5";
const { width } = Dimensions.get('window');
import * as SecureStore from 'expo-secure-store';
import Web3 from 'web3';
import { ethers, } from 'ethers';
import { HYDRO_ID_KEY, HYDRO_PRIVATE_KEY } from "../../constants";

const Contact = ({ navigation }) => {
  const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLightTheme ? lightTheme : darkTheme;


  const [hydroAddress, setHydroaddress] = React.useState('');
  const [hydroid, setHydroId] = React.useState('');

  const retrieveData = async () => {
    try {
      const value = await SecureStore.getItemAsync(HYDRO_PRIVATE_KEY);
      let currentProvider = await new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/75cc8cba22ab40b9bfa7406ae9b69a27');
      let provider = new ethers.providers.Web3Provider(currentProvider);
      let wallet = new ethers.Wallet(value, provider)
      setHydroaddress(wallet.address)
      console.log('wallet.address--->', value)

    } catch (error) {
      console.log(error)
    }  
  }

  const setHydroIdFunc = async () => {
    let hydroId = await SecureStore.getItemAsync(HYDRO_ID_KEY);
    setHydroId(hydroId); 
  }

  useEffect(() => {
    retrieveData();
    setHydroIdFunc();
  }, [])

  const CopyHydroAddressToClipboard = async () => {
    await Clipboard.setString(hydroAddress);
    ToastAndroid.show("Copied To Clipboard!", ToastAndroid.SHORT);
  };

  const CopyBtcAddressToClipboard = async () => {
    await Clipboard.setString(btcAddress);
    ToastAndroid.show("Copied To Clipboard!", ToastAndroid.SHORT);
  };

  return (
    <BgView>
      <Header.Back title="Contact Card" onBackPress={navigation.goBack} containerStyle={styles.header} />
      <View style={styles.top} >
        <TouchableOpacity>
          <Image source={require("../../assets/images/emma.png")} style={{ borderRadius: 50, width: 100, height: 100 }} />
        </TouchableOpacity>
        {/* <Lead style={styles.name}>Hydro ID</Lead> */}

        <View style={styles.box}>
          {/*<View style={styles.box}>
            <Lead>Hydro ID</Lead>
            <View
              style={{
                padding: 7,
                backgroundColor: theme.secondary,
                borderRadius: 5,
                marginVertical: width * 0.01
              }}
              onPress={CopyHydroAddressToClipboard}
            >
              <Paragraph>{hydroid}</Paragraph>
            </View>
            </View>*/}

          <View style={styles.box}>
            <Lead>Wallet Address</Lead>
            <TouchableOpacity
              style={{
                padding: 7,
                backgroundColor: theme.secondary,
                borderRadius: 5,
                marginVertical: width * 0.01
              }}
              onPress={CopyHydroAddressToClipboard}
            >
              <Paragraph>{hydroAddress}</Paragraph>
            </TouchableOpacity>
          </View>
        </View>
      </View>



      <View
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity>
          <Icon
            name="file-download"
            color={theme.basic}
            solid={true}
            size={22}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginHorizontal: "5%", paddingLeft: "5%" }}>
          <Icon name="paper-plane" color={theme.basic} solid={true} size={22} />
        </TouchableOpacity>
      </View>
    </BgView>
  );
};

const styles = StyleSheet.create({
  top: {
    marginVertical: width * 0.1,
    alignItems: "center",
    justifyContent: "center",
  },

  name: {
    textAlign: "center", marginVertical: width * 0.05, fontSize: 20
  },

  header: {
    marginTop: Platform.OS == 'ios' ? 0 : StatusBar.currentHeight,
    paddingTop: 0,
    height: 50
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: width * 0.05
  },

  box: {
    paddingTop: width * 0.03
  }

})

export default Contact;
