import React, { useEffect, useContext } from "react";
import { View, StyleSheet, Dimensions, StatusBar, ScrollView } from "react-native";
import { SecondaryHeader, BgView } from "../../components/Layouts";
import { Paragraph } from "../../components/Typography";
import LottieView from 'lottie-react-native';
import {
  NotificationCard,
} from "../../components/cards";
import Button from "../../components/Button";
const { height, width } = Dimensions.get('window');
import Item from '../../components/Item';
import { ThemeContext } from "../../hooks/useTheme";

const Notification = ({ navigation, route }) => {
  const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLightTheme ? lightTheme : darkTheme;

  const Items = [
    { value1: '- 111.00 HYDRO', value2: '- 20.00 USD' },
    { value1: '+ 0.1 ETH', value2: '+ 350.00 USD' },
    { value1: '+ 0.00 HYDRO', value2: '+ 0.00 USD' },
    { value1: '+ 333.00 HYDRO', value2: '+ 30.00 USD' }
  ]

  const [flag, setFlag] = React.useState(true);
  useEffect(() => { }, [])

  return (
    <BgView>
      <SecondaryHeader.Back title="Notification" onBackPress={navigation.goBack} containerStyle={styles.header} />
      <View style={styles.top}>
        {
          flag ?
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ width: '100%', alignItems: 'center' }}>
                <View
                  style={{
                    // flex: 1,
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    marginBottom: width * 0.03,
                    width: '95%'
                  }}
                >
                  {Items.map((val, id) => (
                    <Item
                      catagoryLabel={"Recieved"}
                      value={val.value1}
                      key={id}
                    />
                  ))}
                </View>
              </View>
            </ScrollView>
            :
            <View style={{ paddingVertical: width * 0.05, justifyContent: 'center', alignItems: 'center' }}>
              <LottieView
                source={require('../../assets/notif.json')}
                autoPlay
                key={1}
                loop
              />

              <Paragraph style={{ textAlign: "center", fontWeight: "bold", fontSize: 22, paddingTop: width * 0.5 }} >
                You have no Notification
              </Paragraph>
            </View>
        }
      </View>
      <View style={styles.bottom}>
        <Button
          style={{
            width: width - width * 0.10,
            padding: 12,
            borderRadius: 2,
            marginVertical: 25,
            backgroundColor: theme.headerbackground,
          }}
          text={flag ? "Clear" : "Close"}
          textStyle={{
            fontWeight: "normal",
            fontSize: 20,
            lineHeight: 26,
            color: isLightTheme ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
            letterSpacing: 0.5,
            fontFamily: "Roboto",
            textAlign: "center",
          }}
          onPress={flag ? () => { setFlag(false) } : () => { navigation.navigate('Home') }}
        />
      </View>
    </BgView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: Platform.OS == 'ios' ? 0 : StatusBar.currentHeight,
    paddingTop: 0,
    height: 50
  },
  top: {
    height: height * 80 / 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    position: 'absolute',
    width: width,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnClear: {
    width: width - width * 0.10,
    padding: 12,
    borderRadius: 2,
    marginVertical: 25,
  },
  btnClearTXT: {
    fontWeight: "normal",
    fontSize: 20,
    lineHeight: 26
  },
})
export default Notification;
