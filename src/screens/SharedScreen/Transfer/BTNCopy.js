import React, { useContext } from 'react';
import {
    TouchableOpacity,
    Text,
    Dimensions
} from 'react-native';
import { ThemeContext } from "../../../hooks/useTheme";
const { height, width } = Dimensions.get('window');

const BTNCopy = ({ onCopyToClipboard }) => {
    const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
    const theme = isLightTheme ? lightTheme : darkTheme;

    return (
        <TouchableOpacity
            style={{
                backgroundColor: theme.headerbackground,
                width: width - width * 0.10,
                padding: 12,
                borderRadius: 2,
                marginVertical: 25,
            }}
            onPress={onCopyToClipboard}
        >
            <Text
                style={{
                    color: isLightTheme ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                    fontWeight: "bold",
                    fontSize: 19,
                    letterSpacing: 0.5,
                    lineHeight: 26,
                    fontFamily: "Roboto",
                    textAlign: "center",
                }}
            >
                Copy to clipboard
            </Text>
        </TouchableOpacity>
    )
}

export default BTNCopy;