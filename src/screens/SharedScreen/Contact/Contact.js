import React, { useContext } from "react";
import {
  View,
  Dimensions,
  Platform, StatusBar, StyleSheet,
  ScrollView
} from "react-native";
import { BgView, SecondaryHeader } from "../../../components/Layouts";
import { ThemeContext } from "../../../hooks/useTheme";
import Button from "../../../components/Button";
import Item from '../../../components/Item/contactItem';
const { height, width } = Dimensions.get('window');

const Items = [
  { label: 'Katarina', value: '0x884JSlcps3gTfvc4V..' },
  { label: 'Per', value: '0x884JSlcps3gTfvc4V..' },
  { label: 'Marco', value: '0x884JSlcps3gTfvc4V..' },
  { label: 'Paul', value: '0x884JSlcps3gTfvc4V..' },
  { label: 'Richard', value: '0x884JSlcps3gTfvc4V..' },
  { label: 'Chris', value: '0x884JSlcps3gTfvc4V..' },
  { label: 'James', value: '0x884JSlcps3gTfvc4V..' },
  { label: 'Johannes', value: '0x884JSlcps3gTfvc4V..' },
  { label: 'James', value: '0x884JSlcps3gTfvc4V..' },
  { label: 'Johannes', value: '0x884JSlcps3gTfvc4V..' },
  { label: 'James', value: '0x884JSlcps3gTfvc4V..' },
  { label: 'Johannes', value: '0x884JSlcps3gTfvc4V..' }
]

const Contact = ({ navigation }) => {
  const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLightTheme ? lightTheme : darkTheme;

  return (
    <BgView>
      <SecondaryHeader.Back title="Contact" onBackPress={navigation.goBack} containerStyle={styles.header} />
      <View style={styles.top} >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            paddingBottom: width * 0.05
          }}>
          {
            Items.map((val, index) => {
              return (
                <Item
                  label={val.label}
                  value={val.value}
                  key={index}
                />
              )
            })
          }
        </ScrollView>
      </View>
      <View style={styles.bottom}>
        <Button
          text={"Add New Contact"}
          style={{
            borderRadius: 2,
            backgroundColor: theme.headerbackground,
            width: '90%',
            marginVertical: height * 0.01,
          }}
          textStyle={{
            fontWeight: "normal",
            letterSpacing: 0.5,
            lineHeight: 19,
            fontFamily: "Roboto",
            textAlign: "center",
            fontSize: 16,
            color: isLightTheme ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
          }}
          onPress={() => { navigation.navigate('addContact') }}
        />
      </View>
    </BgView>
  );
};

const styles = StyleSheet.create({
  top: {
    height: height * 75 / 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.02,
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

  bottom: {
    position: 'absolute',
    width: width,
    bottom: height * 0.03,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnOpen: {
    width: width - width * 0.10,
    padding: 12,
    borderRadius: 2,
    // marginVertical: 25,
  }

})

export default Contact;
