import React, { useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Clipboard,
  StatusBar,
  ToastAndroid
} from 'react-native';
var { width, height } = Dimensions.get('window');

import bip39 from 'react-native-bip39'
//import {ethers,wallet} from 'ethers';
// import { Button, Input } from "react-native-elements";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from "@react-native-community/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-toast-message';
import { ethers } from 'ethers';
import { BgView, SecondaryHeader } from "../../../components/Layouts";
import Button from "../../../components/Button";


export default class Recover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mnemonic: null,
      spinner: false,
      privateKey: '',
      publicKey: null,
      isGenerate: false,
      mnemonicValue: '',
      password: '',
      secureTextEntry: true,
      isGenerateKey: false,
      connection: true
    }
  }

  check = async () => {
    const { connection, mnemonicValue } = this.state;
    if (!connection) {
      this.connectToInternet();
      return;
    }

    if (mnemonicValue == '') {
      this.setState({ errorMessage: 'Enter BIP39 Mnemonic' });
      return;
    }

    var validate = bip39.validateMnemonic(mnemonicValue)
    if (validate) {


      const wallet = ethers.Wallet.fromMnemonic(mnemonicValue);
      console.log(bip39.mnemonicToSeed)

      await AsyncStorage.setItem('@mnemonic', mnemonicValue)
      await AsyncStorage.setItem('@privateKey', wallet.privateKey)

      let address = wallet.address
      let hydroId = ''
      this.props.navigation.navigate("app", { screen: "home", params: { address, hydroId } });
    } else {
      this.setState({ errorMessage: 'Invalid Mnemonic' })
      setTimeout(() => {
        this.props.navigation.navigate('recover');
      }, 500)
    }
  }

  storeData = async (mnemonic, privateKey) => {
    try {

    } catch (e) {
      console.log(e)
    }
  }

  get_clipboard_word = async () => {
    var textHolder = await Clipboard.getString();
    this.setState({
      mnemonicValue: textHolder
    })
  }

  CopyToClipboard = async (string) => {
    await Clipboard.setString(string);
    ToastAndroid.show("Copied To Clipboard!", ToastAndroid.SHORT);
  };

  render() {
    const { mnemonic, isGenerateKey, encKeyFinal, secureTextEntry, privateKey, publicKey, isGenerate, mnemonicValue, password } = this.state;
    return (
      <BgView>
        <View style={styles.container}>
          <Spinner
            visible={this.state.spinner}
            small={'small'}
            color={'#2960CA'}
          />

          <SecondaryHeader.Back
            onBackPress={() => this.props.navigation.goBack()}
            title="Mnemonic Code"
            containerStyle={styles.header}
            textStyle={{ color: 'rgba(255, 255, 255, 0.5)' }}
            iconStyle={{ color: 'rgba(255, 255, 255, 0.5)' }}
          />

          <KeyboardAwareScrollView contentContainerStyle={{ height: height - 50 - StatusBar.currentHeight }} showsVerticalScrollIndicator={false}>
            {!isGenerate &&
              <View style={styles.topContainer}>
                <Text style={styles.label}>BIP39 Mnemonic</Text>
                <View style={styles.containerCode}>
                  <TextInput
                    placeholder='Please enter BIP39 Mnemonic...'
                    multiline={true}
                    placeholderTextColor={'#7777'}
                    textAlignVertical={'top'}
                    style={[styles.input, { height: 100 }]}
                    returnKeyType={'done'}
                    onChangeText={value => this.setState({ mnemonicValue: value })}
                    value={mnemonicValue}
                    autoCapitalize={'none'}
                    onFocus={() => this.setState({ mnemonicValue: null })}
                  />
                </View>
                {this.state.errorMessage &&
                  <Text style={styles.error}>{this.state.errorMessage}</Text>
                }



                <View style={{
                  position: 'absolute', right: width * 0.05, bottom: -30, flexDirection: 'row'
                }}>
                  <Button text="Paste"
                    onPress={() => this.get_clipboard_word()}
                    style={styles.button}
                    textStyle={styles.buttonTitle}
                  />
                  <Button text="Submit"
                    disabled={!mnemonicValue ? true : false}
                    onPress={() => this.check()}
                    style={styles.button}
                    textStyle={styles.buttonTitle}
                  />
                </View>
              </View>
            }


            <Toast ref={(ref) => Toast.setRef(ref)} />
          </KeyboardAwareScrollView>
        </View>
      </BgView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#373737'
  },

  header: {
    marginTop: Platform.OS == 'ios' ? 0 : StatusBar.currentHeight,
    paddingTop: 0,
    height: 50,
    backgroundColor: '#373737',
  },
  main: {
    paddingHorizontal: width * 0.05,
    flex: 1
  },

  topContainer: {
    paddingTop: width * 0.04,
    paddingHorizontal: width * 0.05,
    position: 'relative',
    height: 200
  },

  seprate: {
    height: 15
  },

  title: {
    fontFamily: "Rubik-Bold",
    fontSize: width * 0.06,
    color: '#424242'
  },

  subtitle: {
    fontFamily: "Rubik-Medium",
    fontSize: width * 0.04,
    color: '#616161',
    paddingVertical: 5
  },


  bottom: {
    position: 'absolute',
    bottom: width * 0.05,
    right: width * 0.05
  },

  box: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 25,
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },

  next: {
    fontFamily: "Rubik-Regular",
    fontSize: width * 0.05,
    color: '#757575',
    paddingLeft: 15,
    paddingVertical: 5,
  },

  icon: {
    paddingTop: 2,
    paddingLeft: 5,
    paddingRight: 5
  },

  button: {
    width: 100,
    paddingVertical: width * 0.01,
    backgroundColor: '#4e4e4e',
    height: 40,
    color: 'rgba(255, 255, 255, 0.5)',
    margin: width * 0.01
  },

  buttonTitle: {
    fontFamily: "Roboto",
    fontSize: width * 0.05,
    color: 'rgba(255, 255, 255, 0.5)'
  },

  label: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontFamily: "Roboto",
    fontSize: width * 0.04,
    paddingBottom: 5
  },

  input: {
    height: 45,
    fontSize: width * 0.05,
    fontFamily: "Rubik-Medium",
    paddingHorizontal: 10,
    justifyContent: 'center',
    color: '#9e9e9e',
  },

  containerCode: {
    borderWidth: 1,
    borderColor: '#9e9e9e',
    borderRadius: 2,
  },

  inputContainer: {
    borderWidth: 1,
    borderColor: '#9e9e9e',
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center'
  },

  error: {
    color: 'red',
    fontFamily: "Rubik-Medium",
    paddingTop: 3
  },

  boxgray: {
    backgroundColor: '#eee',
    paddingVertical: 5,
    width: width - width * 0.1,
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  }
});


