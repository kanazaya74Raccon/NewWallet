import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Clipboard,
  ToastAndroid,
  AsyncStorage,
  Dimensions,
  Platform,
  Linking,
  Image,
  ScrollView
} from "react-native";
import { BgView, SecondaryHeader } from "../../components/Layouts";
import { ThemeContext } from "../../hooks/useTheme";
import { Paragraph } from "../../components/Typography";
import { SettingsCard, SettingsItemCard } from "../../components/cards";
import SnowflakeContext from "../../context/SnowFlake/snowflakeContext";
import Button from "../../components/Button";
import { add } from "lodash";
const { height, width } = Dimensions.get('window');

const GOOGLE_PACKAGE_NAME = 'com.hydrowallet';
const APPLE_STORE_ID = 'id284882215';

const Settings = ({ navigation, route }) => {
  const { isLightTheme, lightTheme, darkTheme, toggleTheme } = useContext(
    ThemeContext
  );
  const theme = isLightTheme ? lightTheme : darkTheme;
  const snowflakeContext = useContext(SnowflakeContext);

  const { hydroAddress } = snowflakeContext;
  // console.log(hydroAddress)

  const [customToken, setCustomToken] = useState(null)
  //This function generates a random number used for the generation of qr code
  //   function generateRandomString(length) {
  //     var result = "";
  //     var characters =
  //       "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //     var charactersLength = characters.length;
  //     for (var i = 0; i < length; i++) {
  //       result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //     }
  //     return result;
  //   }

  //   const [qrValue, setQrValue] = useState({
  //     initialValue: generateRandomString(10),
  //     valueForQRCode,
  //   });
  //   getValue = () => {
  //     setQrValue({ valueForQRCode: initialValue });
  //   };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCustomToken()
    });

    return unsubscribe;
  }, [navigation]);

  const getCustomToken = async () => {
    let customToken = await AsyncStorage.getItem("customToken")
    if (customToken) {
      customToken = JSON.parse(customToken)
      setCustomToken(customToken)
    }
  }

  const CopyToClipboard = async () => {
    await Clipboard.setString(address);
    ToastAndroid.show("Copied To Clipboard!", ToastAndroid.SHORT);
  };

  const CopyToClipboardMnemonic = async () => {
    const value = await AsyncStorage.getItem('@mnemonic');
    await Clipboard.setString(value);
    ToastAndroid.show("Mnemonic copied To Clipboard!", ToastAndroid.SHORT);
  };


  const onAddPress = async () => {
    navigation.navigate('addCustomToken')
  }
  const { address } = route.params

  const [count, setCount] = useState(5);
  const [isIntervalRunnig, setIsIntervalRunnig] = useState(false);

  const startRatingCounter = () => {
    //Initialize count by 5 to start counter for 5 sec
    setCount(1);
    let tempcount = 1;
    if (!isIntervalRunnig) {
      setIsIntervalRunnig(true);
      let t = setInterval(() => {
        tempcount = tempcount - 1;
        console.log(tempcount);
        setCount(tempcount);
        if (tempcount == 0) {
          clearInterval(t);
          setIsIntervalRunnig(false);
          //After 5 second ask for the rate this app
          Alert.alert(
            'Rate us',
            'Would you like to share your review with us? This will help and motivate us a lot.',
            [
              { text: 'Sure', onPress: () => openStore() },
              {
                text: 'No Thanks!',
                onPress: () => console.log('No Thanks Pressed'),
                style: 'cancel',
              },
            ],
            { cancelable: false },
          );
        }
      }, 1000);
    }
  };

  const openStore = () => {
    //This is the main trick
    if (Platform.OS != 'ios') {
      Linking.openURL(
        // `market://details?id=${GOOGLE_PACKAGE_NAME}`,
        `http://play.google.com/store/apps/details?id=${GOOGLE_PACKAGE_NAME}`
      ).catch(
        (err) => alert('Please check for Google Play Store')
      );
    } else {
      Linking.openURL(
        `itms://itunes.apple.com/in/app/apple-store/${APPLE_STORE_ID}`,
      ).catch((err) => alert('Please check for the App Store'));
    }
  };

  return (
    <BgView>
      <SecondaryHeader.Back title="Settings" onBackPress={navigation.goBack} />
      <View style={styles.top}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            paddingBottom: width * 0.05
          }}>
          <SettingsItemCard value="Contact" onPress={() => navigation.navigate('contact')} />
          <SettingsItemCard value="Add Coin or Token" onPress={() => navigation.navigate('asset')} />
          <SettingsItemCard value="Claim Hydro ID" onPress={() => navigation.navigate('clainHydro')} />
          <SettingsItemCard value="Default Fiat Currency" onPress={() => navigation.navigate('defaultFiat')} />
          <SettingsItemCard value={isLightTheme ? "Dark Mode" : "Light Mode"} onPress={toggleTheme} />
          <SettingsItemCard value="Security" onPress={() => navigation.navigate('security')} />
          <SettingsItemCard value="Change Password" onPress={() => navigation.navigate('changePWD')} />
          <SettingsItemCard value="Export keys" onPress={() => navigation.navigate('exportKeys')} />
          <SettingsItemCard value="Export Transactions" onPress={() => navigation.navigate('exportTransactions')} />
          <SettingsItemCard value="Rate Us" onPress={startRatingCounter} />
        </ScrollView>
      </View>
      <View style={styles.bottom}>
        <Image style={{ resizeMode: "contain", width: width * 0.3 }} source={isLightTheme ? require("../../assets/images/new/footerLogo.png") : require("../../assets/images/new/logo.png")} />
      </View>
    </BgView>
  );
};

const styles = StyleSheet.create({
  top: {
    height: height * 70 / 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  bottom: {
    position: 'absolute',
    width: width,
    bottom: height * 0.03,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default Settings;
