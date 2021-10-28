import React, { useContext, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, Image, Animated, Dimensions } from "react-native";
import { Paragraph, Lead } from "../Typography";
import Icon from "react-native-vector-icons/FontAwesome5";

import { ThemeContext } from "../../hooks/useTheme";
const { height, width } = Dimensions.get('window');

export const TxFeedCard = ({
  amount,
  name,
  image,
  currency,
  amountEquivalent,
  ...props
}) => {
  const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLightTheme ? lightTheme : darkTheme;
  return (
    <View
      style={{
        backgroundColor: theme.secondary,
        padding: 10,
        width: "47%",
        marginTop: "5%",
        marginLeft: 10,
        marginRight: 1,
        borderRadius: 10,
      }}
      {...props}
    >
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={image}
          style={{ borderRadius: 50, width: 70, height: 70 }}
        />
      </View>
      <Paragraph style={{ fontSize: 15 }}>
        {name} sent &#36;{amount} in {currency}
      </Paragraph>
      <View
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <Lead>+ &#36;{amount}</Lead>
        <Paragraph style={{ fontSize: 12 }}>{amountEquivalent}</Paragraph>
      </View>
    </View>
  );
};
export const NotificationProfileCard = ({
  image,
  hydroId,
  userInfo,
  ...props
}) => {
  const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLightTheme ? lightTheme : darkTheme;
  return (
    <View
      style={{
        backgroundColor: theme.secondaryCard,
        paddingVertical: 40,
        width: width - width * 0.1,
        marginTop: width * 0.05,
        alignItems: "center",
        paddingHorizontal: width * 0.05,
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 10,
        marginBottom: width * 0.05,
      }}
      {...props}
    >

      <View style={{ flex: 0.3 }}>
        <Image
          source={image}
          style={{ borderRadius: 50, width: width * 0.15, height: width * 0.15 }}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <Lead>HYDRO-ID {hydroId}</Lead>
        <Paragraph style={{ textAlign: "right" }}>{userInfo}</Paragraph>
      </View>

    </View>
  );
};

export const NotificationCard = ({
  value,
  image,
  notificationInfo,
  ...props
}) => {
  const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLightTheme ? lightTheme : darkTheme;
  return (
    <View
      style={{
        backgroundColor: theme.secondaryCard,
        padding: 10,
        width: (width - width * 0.13) / 2,
        marginVertical: width * 0.02,
        marginHorizontal: 5,
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      {...props}
    >
      <Image
        source={image}
        style={{ borderRadius: 50, width: width * 0.15, height: width * 0.15, marginTop: 5 }}
      />

      <Lead style={{ fontSize: 15, textAlign: "center", paddingTop: 10 }}>
        {notificationInfo}
      </Lead>
      <Paragraph style={{ fontSize: 14, marginBottom: 5 }}>{value}</Paragraph>
    </View>
  );
};

export const SettingsCard = ({
  hydroAddress,
  onWalletPress,
  onIdPress,
  onAddPress,
  customToken,
  ...props
}) => {
  const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLightTheme ? lightTheme : darkTheme;
  return (
    <View
      style={{
        backgroundColor: theme.secondaryCard,
        paddingVertical: width * 0.05,
        // width: width - 20,
        width: width - width * 0.05,
        marginTop: width * 0.05,
        paddingHorizontal: width * 0.05,
        borderRadius: 10,
        marginBottom: width * 0.05,
      }}
      {...props}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Lead>Choose Wallet to configure</Lead>
        <TouchableOpacity>
          <Icon name="question-circle" color={theme.basic} size={18} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginVertical: width * 0.03,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          {/* <TouchableOpacity onPress={onWalletPress} style={{ paddingRight: width * 0.04 }}>
            <Image source={require("../../assets/images/bitcoin.png")} />
          </TouchableOpacity> */}
          <TouchableOpacity onPress={onWalletPress} style={{ paddingRight: width * 0.02 }} >
            <Image source={require("../../assets/images/ethereum1.png")} style={{ width: 42, height: 42 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onWalletPress} style={{ paddingHorizontal: width * 0.02 }}>
            <Image source={require("../../assets/images/hydro1.png")} style={{ width: 42, height: 42 }} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onAddPress}
            style={{
              width: 40,
              height: 40,
              borderRadius: 100,
              marginHorizontal: width * 0.02,
              borderColor: theme.basic,
              borderWidth: 2,
              backgroundColor: theme.background,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 1
            }}
          >
            <Icon name="plus" color={theme.basic} size={12} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginTop: 10 }}>
        <Lead>Wallet Address</Lead>
        <TouchableOpacity
          onPress={onIdPress}
          style={{
            padding: 5,
            backgroundColor: theme.secondary,
            borderRadius: 5,
            marginTop: 5
          }}
        >
          <Paragraph>{hydroAddress}</Paragraph>
        </TouchableOpacity>
      </View>
      {customToken && Object.keys(customToken).length > 0 &&
        <View style={{ marginTop: 10 }}>
          <Lead>Custom Token</Lead>
          <TouchableOpacity
            style={{
              padding: 5,
              backgroundColor: theme.secondary,
              borderRadius: 5,
            }}
          >
            <Paragraph>{customToken.symbol}</Paragraph>
          </TouchableOpacity>
        </View>
      }
    </View>
  );
};
export const DepositCard = ({
  hydroAddress,
  onWalletPress,
  onIdPress,
  onAddPress,
  customToken,
  ...props
}) => {
  const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLightTheme ? lightTheme : darkTheme;
  return (
    <View
      style={{
        // backgroundColor: theme.headerbackground,
        // paddingVertical: width * 0.05,
        width: width - width * 0.1,
        //marginTop: width * 0.05,
        //paddingHorizontal: width * 0.05,
        borderRadius: 10,
        //  marginBottom: width * 0.05,
      }}
      {...props}
    >

      <View style={{}}>
        <Text style={{ color: isLightTheme ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)', fontWeight: 'normal', letterSpacing: 0.8, fontSize: 20, marginBottom: 10 }}>Wallet Address</Text>
        <TouchableOpacity
          onPress={onIdPress}
          style={{
            padding: 5,
            backgroundColor: theme.headerbackground,
            borderRadius: 5,
            // marginTop: 5
          }}
        >
          <Paragraph>{hydroAddress}</Paragraph>
        </TouchableOpacity>
      </View>
      {customToken && Object.keys(customToken).length > 0 &&
        <View style={{ marginTop: 10 }}>
          <Lead>Custom Token</Lead>
          <TouchableOpacity
            style={{
              padding: 5,
              backgroundColor: theme.secondary,
              borderRadius: 5,
            }}
          >
            <Paragraph>{customToken.symbol}</Paragraph>
          </TouchableOpacity>
        </View>
      }
    </View>
  );
};
export const HydroBalance = ({
  hydroAddress,
  onWalletPress,
  onIdPress,
  onAddPress,
  customToken,
  ...props
}) => {
  const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLightTheme ? lightTheme : darkTheme;
  return (
    <View
      style={{
        backgroundColor: theme.secondaryCard,
        // paddingVertical: width * 0.05,
        width: width - width * 0.1,
        //marginTop: width * 0.05,
        //paddingHorizontal: width * 0.05,
        borderRadius: 10,
        //  marginBottom: width * 0.05,
      }}
      {...props}
    >

      <View style={{}}>
        <Lead>Hydro Balance</Lead>
        <TouchableOpacity
          onPress={onIdPress}
          style={{
            padding: 5,
            backgroundColor: theme.secondary,
            borderRadius: 5,
            // marginTop: 5
          }}
        >
          <Paragraph>{hydroAddress}</Paragraph>
        </TouchableOpacity>
      </View>
      {customToken && Object.keys(customToken).length > 0 &&
        <View style={{ marginTop: 10 }}>
          <Lead>Custom Token</Lead>
          <TouchableOpacity
            style={{
              padding: 5,
              backgroundColor: theme.secondary,
              borderRadius: 5,
            }}
          >
            <Paragraph>{customToken.symbol}</Paragraph>
          </TouchableOpacity>
        </View>
      }
    </View>
  );
};

export const EtherBalance = ({
  hydroAddress,
  onWalletPress,
  onIdPress,
  onAddPress,
  customToken,
  ...props
}) => {
  const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLightTheme ? lightTheme : darkTheme;
  return (
    <View
      style={{
        backgroundColor: theme.secondaryCard,
        width: width - width * 0.1,
        borderRadius: 10,
      }}
      {...props}
    >

      <View style={{}}>
        <Lead>Ether balance</Lead>
        <TouchableOpacity
          onPress={onIdPress}
          style={{
            padding: 5,
            backgroundColor: theme.secondary,
            borderRadius: 5,
          }}
        >
          <Paragraph>{hydroAddress}</Paragraph>
        </TouchableOpacity>
      </View>
      {customToken && Object.keys(customToken).length > 0 &&
        <View style={{ marginTop: 10 }}>
          <Lead>Custom Token</Lead>
          <TouchableOpacity
            style={{
              padding: 5,
              backgroundColor: theme.secondary,
              borderRadius: 5,
            }}
          >
            <Paragraph>{customToken.symbol}</Paragraph>
          </TouchableOpacity>
        </View>
      }
    </View>
  );
};

export const TuscBalance = ({
  tuscAddress,
  onWalletPress,
  onIdPress,
  onAddPress,
  customToken,
  ...props
}) => {
  const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLightTheme ? lightTheme : darkTheme;
  return (
    <View
      style={{
        backgroundColor: theme.secondaryCard,
        width: width - width * 0.1,
        borderRadius: 10,
      }}
      {...props}
    >

      <View style={{}}>
        <Lead>Tusc balance</Lead>
        <TouchableOpacity
          onPress={onIdPress}
          style={{
            padding: 5,
            backgroundColor: theme.secondary,
            borderRadius: 5,
          }}
        >
          <Paragraph>{tuscAddress}</Paragraph>
        </TouchableOpacity>
      </View>
      {customToken && Object.keys(customToken).length > 0 &&
        <View style={{ marginTop: 10 }}>
          <Lead>Custom Token</Lead>
          <TouchableOpacity
            style={{
              padding: 5,
              backgroundColor: theme.secondary,
              borderRadius: 5,
            }}
          >
            <Paragraph>{customToken.symbol}</Paragraph>
          </TouchableOpacity>
        </View>
      }
    </View>
  );
};

export const SettingsItemCard = ({ value, onPress, ...props }) => {
  const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLightTheme ? lightTheme : darkTheme;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: theme.headerbackground,
        padding: 10,
        // width: (width - 30) / 2,
        width: width - 30,
        marginVertical: width * 0.02,
        marginHorizontal: 5,
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      {...props}
    >
      <Paragraph style={{ textAlign: "center" }}>{value}</Paragraph>
    </TouchableOpacity>
  );
};
export const SnowflakeItemCard = ({ value, onPress, ...props }) => {
  const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLightTheme ? lightTheme : darkTheme;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: theme.secondaryCard,
        padding: 10,
        width: (width - width * 0.1),
        marginVertical: width * 0.02,
        marginHorizontal: 5,
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      {...props}
    >
      <Paragraph style={{ textAlign: "center" }}>{value}</Paragraph>
    </TouchableOpacity>
  );
};

export const HydroCard = ({ balance, address, cardName, withdraw, transfer, deposit, history, usdVal, ...props }) => {
  const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLightTheme ? lightTheme : darkTheme;
  return (
    <View style={{
      position: 'relative',
      width: width - width * 0.10,
      height: height * 0.27,
      borderRadius: 5,
      paddingHorizontal: height * 0.02,
      paddingVertical: height * 0.025,
      marginTop: width * 0.06,
      shadowColor: '#56D5D0',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      backgroundColor: theme.headerbackground
    }} {...props}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: height * 0.01, justifyContent: 'space-between' }}>
        <Image source={require('../../assets/images/new/HYDRO.png')} style={{ width: height * 0.035, height: height * 0.035 }} />
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: theme.textColor, fontSize: height * 0.03, letterSpacing: 0.8 }}>{balance} HYDRO</Text>
          <Text style={{ color: theme.textColor, fontSize: height * 0.02, paddingTop: height * 0.001, letterSpacing: 0.8 }}>{usdVal} USD</Text>
          <Text style={{ color: theme.textColor, fontSize: height * 0.015, paddingTop: height * 0.001, letterSpacing: 0.8 }}>Network: BSC</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', paddingTop: height * 0.025 }}>
        <Text style={{ color: theme.textColor, letterSpacing: 0.8, fontSize: height * 0.02, textAlign: 'center' }}>{address}</Text>
      </View>
      <View style={{ flexDirection: 'row', paddingTop: height * 0.01 }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <TouchableOpacity
            onPress={deposit}
            style={{
              backgroundColor: '#272727',
              width: width * 0.2,
              height: height * 0.04,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              borderRadius: 5
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', letterSpacing: 0.8, fontSize: 12 }}>Send</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <TouchableOpacity
            onPress={history}
            style={{
              backgroundColor: '#272727',
              width: width * 0.2,
              height: height * 0.04,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              borderRadius: 5
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', letterSpacing: 0.8, fontSize: 12 }}>History</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <TouchableOpacity
            onPress={transfer}
            style={{
              backgroundColor: '#272727',
              width: width * 0.2,
              height: height * 0.04,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              borderRadius: 5
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', letterSpacing: 0.8, fontSize: 12 }}>Receive</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View >
  );
};

export const HydroCard1 = ({ balance, address, cardName, withdraw, transfer, deposit, history, usdVal, ...props }) => {
  const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLightTheme ? lightTheme : darkTheme;
  return (
    <View style={{
      position: 'relative',
      width: width - width * 0.10,
      height: height * 0.27,
      borderRadius: 5,
      paddingHorizontal: height * 0.02,
      paddingVertical: height * 0.025,
      marginTop: width * 0.06,
      shadowColor: '#56D5D0',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      backgroundColor: theme.headerbackground
    }} {...props}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: height * 0.01, justifyContent: 'space-between' }}>
        <Image source={require('../../assets/images/new/HYDRO1.png')} style={{ width: height * 0.035, height: height * 0.035 }} />
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: theme.textColor, fontSize: height * 0.03, letterSpacing: 0.8 }}>{balance} HYDRO</Text>
          <Text style={{ color: theme.textColor, fontSize: height * 0.02, paddingTop: height * 0.001, letterSpacing: 0.8 }}>{usdVal} USD</Text>
          <Text style={{ color: theme.textColor, fontSize: height * 0.015, paddingTop: height * 0.001, letterSpacing: 0.8 }}>Network: ETH</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', paddingTop: height * 0.025 }}>
        <Text style={{ color: theme.textColor, letterSpacing: 0.8, fontSize: height * 0.02, textAlign: 'center' }}>{address}</Text>
      </View>
      <View style={{ flexDirection: 'row', paddingTop: height * 0.01 }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <TouchableOpacity
            onPress={deposit}
            style={{
              backgroundColor: '#ADADAD',
              width: width * 0.2,
              height: height * 0.04,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              borderRadius: 5
            }}
          >
            <Text style={{ color: 'rgba(0, 0, 0, 0.5)', fontWeight: 'bold', letterSpacing: 0.8, fontSize: 12 }}>Send</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <TouchableOpacity
            onPress={history}
            style={{
              backgroundColor: '#ADADAD',
              width: width * 0.2,
              height: height * 0.04,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              borderRadius: 5
            }}
          >
            <Text style={{ color: 'rgba(0, 0, 0, 0.5)', fontWeight: 'bold', letterSpacing: 0.8, fontSize: 12 }}>History</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <TouchableOpacity
            onPress={transfer}
            style={{
              backgroundColor: '#ADADAD',
              width: width * 0.2,
              height: height * 0.04,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              borderRadius: 5
            }}
          >
            <Text style={{ color: 'rgba(0, 0, 0, 0.5)', fontWeight: 'bold', letterSpacing: 0.8, fontSize: 12 }}>Receive</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View >
  );
};

export const BNBCard = ({ balance, address, cardName, withdraw, transfer, deposit, history, usdVal, ...props }) => {
  const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLightTheme ? lightTheme : darkTheme;
  return (
    <View style={{
      position: 'relative',
      width: width - width * 0.10,
      height: height * 0.27,
      borderRadius: 5,
      paddingHorizontal: height * 0.02,
      paddingVertical: height * 0.025,
      marginTop: width * 0.06,
      shadowColor: '#56D5D0',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      backgroundColor: theme.headerbackground
    }} {...props}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: height * 0.01, justifyContent: 'space-between' }}>
        <Image source={require('../../assets/images/new/BNB.png')} style={{ width: height * 0.035, height: height * 0.035 }} />
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: theme.textColor, fontSize: height * 0.03, letterSpacing: 0.8 }}>{balance} BNB</Text>
          <Text style={{ color: theme.textColor, fontSize: height * 0.02, paddingTop: height * 0.001, letterSpacing: 0.8 }}>{usdVal} USD</Text>
          <Text style={{ color: theme.textColor, fontSize: height * 0.015, paddingTop: height * 0.001, letterSpacing: 0.8 }}>Network: BSC</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', paddingTop: height * 0.025 }}>
        <Text style={{ color: theme.textColor, letterSpacing: 0.8, fontSize: height * 0.02, textAlign: 'center' }}>{address}</Text>
      </View>
      <View style={{ flexDirection: 'row', paddingTop: height * 0.01 }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <TouchableOpacity
            onPress={deposit}
            style={{
              backgroundColor: '#F0B90B',
              width: width * 0.2,
              height: height * 0.04,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              borderRadius: 5
            }}
          >
            <Text style={{ color: 'rgba(0, 0, 0, 0.5)', fontWeight: 'bold', letterSpacing: 0.8, fontSize: 12 }}>Send</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <TouchableOpacity
            onPress={history}
            style={{
              backgroundColor: '#F0B90B',
              width: width * 0.2,
              height: height * 0.04,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              borderRadius: 5
            }}
          >
            <Text style={{ color: 'rgba(0, 0, 0, 0.5)', fontWeight: 'bold', letterSpacing: 0.8, fontSize: 12 }}>History</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <TouchableOpacity
            onPress={transfer}
            style={{
              backgroundColor: '#F0B90B',
              width: width * 0.2,
              height: height * 0.04,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              borderRadius: 5
            }}
          >
            <Text style={{ color: 'rgba(0, 0, 0, 0.5)', fontWeight: 'bold', letterSpacing: 0.8, fontSize: 12 }}>Receive</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View >
  );
};

export const EtherCard = ({ balance, address, cardName, withdraw, transfer, deposit, history, usdVal, ...props }) => {
  const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLightTheme ? lightTheme : darkTheme;
  return (
    <View style={{
      position: 'relative',
      width: width - width * 0.10,
      height: height * 0.27,
      borderRadius: 5,
      paddingHorizontal: height * 0.02,
      paddingVertical: height * 0.025,
      marginTop: width * 0.06,
      shadowColor: '#56D5D0',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      backgroundColor: theme.headerbackground
    }} {...props}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: height * 0.01, justifyContent: 'space-between' }}>
        <Image source={require('../../assets/images/new/ETH.png')} style={{ width: 28, height: 40 }} />
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: theme.textColor, fontSize: height * 0.03, letterSpacing: 0.8 }}>{balance} ETH</Text>
          <Text style={{ color: theme.textColor, fontSize: height * 0.02, paddingTop: height * 0.001, letterSpacing: 0.8 }}>{usdVal} USD</Text>
          <Text style={{ color: theme.textColor, fontSize: height * 0.015, paddingTop: height * 0.001, letterSpacing: 0.8 }}>Network: ETH</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', paddingTop: height * 0.025 }}>
        <Text style={{ color: theme.textColor, letterSpacing: 0.8, fontSize: height * 0.02, textAlign: 'center' }}>{address}</Text>
      </View>
      <View style={{ flexDirection: 'row', paddingTop: height * 0.01 }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <TouchableOpacity
            onPress={deposit}
            style={{
              backgroundColor: '#62688F',
              width: width * 0.2,
              height: height * 0.04,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              borderRadius: 5
            }}
          >
            <Text style={{ color: '#FFF', fontWeight: 'bold', letterSpacing: 0.8, fontSize: 12 }}>Send</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <TouchableOpacity
            onPress={history}
            style={{
              backgroundColor: '#62688F',
              width: width * 0.2,
              height: height * 0.04,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              borderRadius: 5
            }}
          >
            <Text style={{ color: '#FFF', fontWeight: 'bold', letterSpacing: 0.8, fontSize: 12 }}>History</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <TouchableOpacity
            onPress={transfer}
            style={{
              backgroundColor: '#62688F',
              width: width * 0.2,
              height: height * 0.04,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              borderRadius: 5
            }}
          >
            <Text style={{ color: '#FFF', fontWeight: 'bold', letterSpacing: 0.8, fontSize: 12 }}>Receive</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View >
  );
};


export const TuscCard = ({ balance, address, cardName, withdraw, transfer, account, deposit, history, usdVal, ...props }) => {
  const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLightTheme ? lightTheme : darkTheme;
  return (
    <View style={{
      position: 'relative',
      width: width - width * 0.10,
      height: height * 0.27,
      borderRadius: 5,
      paddingHorizontal: height * 0.02,
      paddingVertical: height * 0.025,
      marginTop: width * 0.06,
      shadowColor: '#56D5D0',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      backgroundColor: theme.headerbackground
    }} {...props}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: height * 0.01, justifyContent: 'space-between' }}>
        <Image source={require('../../assets/images/new/TUSC.png')} style={{ width: height * 0.035, height: height * 0.035 }} />
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: theme.textColor, fontSize: height * 0.03, letterSpacing: 0.8 }}>{balance} TUSC</Text>
          <Text style={{ color: theme.textColor, fontSize: height * 0.02, paddingTop: height * 0.001, letterSpacing: 0.8 }}>{usdVal} USD</Text>
          <Text style={{ color: theme.textColor, fontSize: height * 0.015, paddingTop: height * 0.001, letterSpacing: 0.8 }}>Network: TUSC</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', paddingTop: height * 0.025 }}>
        <Text style={{ color: theme.textColor, letterSpacing: 0.8, fontSize: height * 0.02, textAlign: 'center' }}>{address}</Text>
      </View>
      <View style={{ flexDirection: 'row', paddingTop: height * 0.01 }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <TouchableOpacity
            onPress={deposit}
            style={{
              backgroundColor: '#000',
              width: width * 0.2,
              height: height * 0.04,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              borderRadius: 5
            }}
          >
            <Text style={{ color: '#FFF', fontWeight: 'bold', letterSpacing: 0.8, fontSize: 12 }}>Send</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <TouchableOpacity
            onPress={history}
            style={{
              backgroundColor: '#000',
              width: width * 0.2,
              height: height * 0.04,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              borderRadius: 5
            }}
          >
            <Text style={{ color: '#FFF', fontWeight: 'bold', letterSpacing: 0.8, fontSize: 12 }}>History</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <TouchableOpacity
            onPress={transfer}
            style={{
              backgroundColor: '#000',
              width: width * 0.2,
              height: height * 0.04,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              borderRadius: 5
            }}
          >
            <Text style={{ color: '#FFF', fontWeight: 'bold', letterSpacing: 0.8, fontSize: 12 }}>Receive</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View >
  );
};

export const BTCCard = ({ balance, address, cardName, withdraw, transfer, account, deposit, history, usdVal, ...props }) => {
  const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLightTheme ? lightTheme : darkTheme;
  return (
    <View style={{
      position: 'relative',
      width: width - width * 0.10,
      height: height * 0.27,
      borderRadius: 5,
      paddingHorizontal: height * 0.02,
      paddingVertical: height * 0.025,
      marginTop: width * 0.06,
      shadowColor: '#56D5D0',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      backgroundColor: theme.headerbackground
    }} {...props}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: height * 0.01, justifyContent: 'space-between' }}>
        <Image source={require('../../assets/images/new/BTC.png')} style={{ width: height * 0.035, height: height * 0.035 }} />
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: theme.textColor, fontSize: height * 0.03, letterSpacing: 0.8 }}>{balance} BTC</Text>
          <Text style={{ color: theme.textColor, fontSize: height * 0.02, paddingTop: height * 0.001, letterSpacing: 0.8 }}>{usdVal} USD</Text>
          <Text style={{ color: theme.textColor, fontSize: height * 0.015, paddingTop: height * 0.001, letterSpacing: 0.8 }}>Network: BTC</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', paddingTop: height * 0.025 }}>
        <Text style={{ color: theme.textColor, letterSpacing: 0.8, fontSize: height * 0.02, textAlign: 'center' }}>{address}</Text>
      </View>
      <View style={{ flexDirection: 'row', paddingTop: height * 0.01 }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <TouchableOpacity
            onPress={deposit}
            style={{
              backgroundColor: '#F7931A',
              width: width * 0.2,
              height: height * 0.04,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              borderRadius: 5
            }}
          >
            <Text style={{ color: 'rgba(0, 0, 0, 0.5)', fontWeight: 'bold', letterSpacing: 0.8, fontSize: 12 }}>Send</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <TouchableOpacity
            onPress={history}
            style={{
              backgroundColor: '#F7931A',
              width: width * 0.2,
              height: height * 0.04,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              borderRadius: 5
            }}
          >
            <Text style={{ color: 'rgba(0, 0, 0, 0.5)', fontWeight: 'bold', letterSpacing: 0.8, fontSize: 12 }}>History</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <TouchableOpacity
            onPress={transfer}
            style={{
              backgroundColor: '#F7931A',
              width: width * 0.2,
              height: height * 0.04,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              borderRadius: 5
            }}
          >
            <Text style={{ color: 'rgba(0, 0, 0, 0.5)', fontWeight: 'bold', letterSpacing: 0.8, fontSize: 12 }}>Receive</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View >
  );
};

export const USDTCard = ({ balance, address, cardName, withdraw, transfer, account, deposit, history, usdVal, ...props }) => {
  const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLightTheme ? lightTheme : darkTheme;
  return (
    <View style={{
      position: 'relative',
      width: width - width * 0.10,
      height: height * 0.27,
      borderRadius: 5,
      paddingHorizontal: height * 0.02,
      paddingVertical: height * 0.025,
      marginTop: width * 0.06,
      shadowColor: '#56D5D0',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      backgroundColor: theme.headerbackground
    }} {...props}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: height * 0.01, justifyContent: 'space-between' }}>
        <Image source={require('../../assets/images/new/USDT.png')} style={{ width: height * 0.035, height: height * 0.035 }} />
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: theme.textColor, fontSize: height * 0.03, letterSpacing: 0.8 }}>{balance} USDT</Text>
          <Text style={{ color: theme.textColor, fontSize: height * 0.02, paddingTop: height * 0.001, letterSpacing: 0.8 }}>{usdVal} USD</Text>
          <Text style={{ color: theme.textColor, fontSize: height * 0.015, paddingTop: height * 0.001, letterSpacing: 0.8 }}>Network: ETH</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', paddingTop: height * 0.025 }}>
        <Text style={{ color: theme.textColor, letterSpacing: 0.8, fontSize: height * 0.02, textAlign: 'center' }}>{address}</Text>
      </View>
      <View style={{ flexDirection: 'row', paddingTop: height * 0.01 }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <TouchableOpacity
            onPress={deposit}
            style={{
              backgroundColor: '#50AF94',
              width: width * 0.2,
              height: height * 0.04,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              borderRadius: 5
            }}
          >
            <Text style={{ color: '#FFF', fontWeight: 'bold', letterSpacing: 0.8, fontSize: 12 }}>Send</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <TouchableOpacity
            onPress={history}
            style={{
              backgroundColor: '#50AF94',
              width: width * 0.2,
              height: height * 0.04,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              borderRadius: 5
            }}
          >
            <Text style={{ color: '#FFF', fontWeight: 'bold', letterSpacing: 0.8, fontSize: 12 }}>History</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <TouchableOpacity
            onPress={transfer}
            style={{
              backgroundColor: '#50AF94',
              width: width * 0.2,
              height: height * 0.04,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              borderRadius: 5
            }}
          >
            <Text style={{ color: '#FFF', fontWeight: 'bold', letterSpacing: 0.8, fontSize: 12 }}>Receive</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View >
  );
};

export const DAICard = ({ balance, address, cardName, withdraw, transfer, account, deposit, history, usdVal, ...props }) => {
  const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLightTheme ? lightTheme : darkTheme;
  return (
    <View style={{
      position: 'relative',
      width: width - width * 0.10,
      height: height * 0.27,
      borderRadius: 5,
      paddingHorizontal: height * 0.02,
      paddingVertical: height * 0.025,
      marginTop: width * 0.06,
      shadowColor: '#56D5D0',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      backgroundColor: theme.headerbackground
    }} {...props}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: height * 0.01, justifyContent: 'space-between' }}>
        <Image source={require('../../assets/images/new/DAI.png')} style={{ width: height * 0.035, height: height * 0.035 }} />
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: theme.textColor, fontSize: height * 0.03, letterSpacing: 0.8 }}>{balance} DAI</Text>
          <Text style={{ color: theme.textColor, fontSize: height * 0.02, paddingTop: height * 0.001, letterSpacing: 0.8 }}>{usdVal} USD</Text>
          <Text style={{ color: theme.textColor, fontSize: height * 0.015, paddingTop: height * 0.001, letterSpacing: 0.8 }}>Network: ETH</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', paddingTop: height * 0.025 }}>
        <Text style={{ color: theme.textColor, letterSpacing: 0.8, fontSize: height * 0.02, textAlign: 'center' }}>{address}</Text>
      </View>
      <View style={{ flexDirection: 'row', paddingTop: height * 0.01 }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <TouchableOpacity
            onPress={deposit}
            style={{
              backgroundColor: '#F4B731',
              width: width * 0.2,
              height: height * 0.04,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              borderRadius: 5
            }}
          >
            <Text style={{ color: 'rgba(0, 0, 0, 0.5)', fontWeight: 'bold', letterSpacing: 0.8, fontSize: 12 }}>Send</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <TouchableOpacity
            onPress={history}
            style={{
              backgroundColor: '#F4B731',
              width: width * 0.2,
              height: height * 0.04,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              borderRadius: 5
            }}
          >
            <Text style={{ color: 'rgba(0, 0, 0, 0.5)', fontWeight: 'bold', letterSpacing: 0.8, fontSize: 12 }}>History</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <TouchableOpacity
            onPress={transfer}
            style={{
              backgroundColor: '#F4B731',
              width: width * 0.2,
              height: height * 0.04,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              borderRadius: 5
            }}
          >
            <Text style={{ color: 'rgba(0, 0, 0, 0.5)', fontWeight: 'bold', letterSpacing: 0.8, fontSize: 12 }}>Receive</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View >
  );
};


export const ComingSoonCard = ({ ...props }) => {
  const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLightTheme ? lightTheme : darkTheme;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 4000
    }).start();
  })


  return (
    <View
      style={{
        position: 'relative',
        backgroundColor: theme.primary,
        width: width - width * 0.10,
        height: 200,
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginTop: width * 0.06,
        justifyContent: 'center', alignItems: 'center',
        shadowColor: '#56D5D0',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 13.35,
      }}
      {...props}
    >
      <Image
        style={{
          position: 'absolute',
          left: 10,
          right: 0,
          top: 0,
          bottom: 0,
        }}
        source={require('../../assets/images/map.png')}
      />
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
        }}>

        <Animated.View
          style={[
            {
              opacity: fadeAnim // Bind opacity to animated value
            }
          ]}
        >
          <Paragraph
            style={{
              fontWeight: 'bold',
              fontSize: 25,
              color: 'white',
              lineHeight: width * 0.15
            }}>
            COMING SOON...
          </Paragraph>
        </Animated.View>
      </View>
    </View>
  );
};