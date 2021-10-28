import React, { useContext } from "react";
import { Text, Dimensions } from "react-native";
import { ThemeContext } from "../../hooks/useTheme";
const { height, width } = Dimensions.get('window');

export const Paragraph = ({ children, style }) => {
  const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLightTheme ? lightTheme : darkTheme;
  return (
    <Text
      style={{
        fontSize: height * 0.025,
        lineHeight: height * 0.04,
        fontFamily: "Rubik-Regular",
        color: theme.basic,
        ...style,
      }}
    >
      {children}
    </Text>
  );
};

export const Lead = ({ children, style }) => {
  const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLightTheme ? lightTheme : darkTheme;
  return (
    <Text
      style={{
        fontWeight: "bold",
        fontFamily: "Rubik-Regular",
        color: theme.basic,
        fontSize: 16,
        lineHeight: 20,
        ...style,
      }}
    >
      {children}
    </Text>
  );
};
