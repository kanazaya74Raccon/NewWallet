import React, { useContext } from "react";
import { Lead } from "../Typography";
import { ThemeContext } from "../../hooks/useTheme";
import { TextInput as TextInput_, View } from "react-native";
import Textarea from 'react-native-textarea';

export const TextInput = (props) => {
  const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLightTheme ? lightTheme : darkTheme;
  return (
    <TextInput_
      autoCapitalize="none"
      placeholderTextColor={theme.basic}
      style={{
        borderRadius: 5,
        marginBottom: 15,
        backgroundColor: theme.headerbackground,
        fontFamily: "Roboto",
        color: isLightTheme ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
        fontSize: 12,
        padding: 10,
        paddingRight: 15,
        lineHeight: 14
      }}
      {...props}
    />
  );
};

export const LabelInput = ({ label, ...props }) => {
  return (
    <View>
      <Lead style={{ fontWeight: "300", fontSize: 16, marginBottom: 5, lineHeight: 19 }}>
        {label}
      </Lead>
      <TextInput {...props} />
    </View>
  );
};


export const CustomTextarea = (props) => {
  const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLightTheme ? lightTheme : darkTheme;
  return (
    <Textarea
      // autoCapitalize="none"
      underlineColorAndroid={'transparent'}
      placeholderTextColor={isLightTheme ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)'}
      containerStyle={{
        height: 100,
        padding: 10,
        borderRadius: 5,
        backgroundColor: theme.headerbackground,
        marginBottom: 15,
      }}
      style={{
        textAlignVertical: 'top',
        height: 90,
        fontFamily: "Roboto",
        color: isLightTheme ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
        fontSize: 12,
        // padding: 10,
        paddingRight: 15,
        lineHeight: 14
      }}
      {...props}
    />
  );
};

export const LabelTextarea = ({ label, ...props }) => {
  return (
    <View>
      <Lead style={{ fontWeight: "300", fontSize: 16, marginBottom: 5, lineHeight: 19 }}>
        {label}
      </Lead>
      <CustomTextarea {...props} />
    </View>
  );
};