import React, { useContext } from 'react'
import styles from './style';
import { Header } from "react-native-elements";
import { ThemeContext } from '../../hooks/useTheme';
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  View,
  Image,
  Platform,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Props } from './interfaces';
import { RootStackParams } from '../../navigation/RootStackParams';
import IconMaterial from "react-native-vector-icons/MaterialCommunityIcons";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

type RouteProps = RouteProp<RootStackParams, 'HeaderParams'>;

const HeaderCustom = (props: Props) => {
  const {
    darkTheme,
    lightTheme,
    toggleTheme,
    isLightTheme,
  } = useContext(ThemeContext);
  const route = useRoute<RouteProps>();
  const navigation = useNavigation();
  const { hydroId, address } = route.params;
  const { width } = Dimensions.get('window');
  const theme = isLightTheme ? lightTheme : darkTheme;

  const toHome = () => {
    navigation.navigate('Home');
  }

  const toTransfer = () => {
    navigation.navigate('StartRemittances');
  }
  
  console.log({ address, hydroId });

  return (
    <Header
      leftComponent={
        <TouchableOpacity onPress={toHome} >
          <View style={styles.nav}>
            <View style={styles.headerLeft}>
              <Image style={{ resizeMode: "contain", width: width * 0.2 }} source={isLightTheme ? require("../../assets/images/new/lightLogo.png") : require("../../assets/images/new/logo.png")} />
            </View>
          </View>
        </TouchableOpacity>
      }

      rightComponent={
        <View style={styles.nav}>
          <TouchableOpacity onPress={toggleTheme} style={{ paddingHorizontal: width * 0.02 }}>
            <Icon name="moon" color={theme.basic} solid={true} size={20} />
          </TouchableOpacity>

          <TouchableOpacity onPress={toTransfer} style={{ paddingHorizontal: width * 0.02 }}>
            <IconMaterial name="bank-transfer" color={theme.basic} size={35} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("notification", { hydroId })} style={{ paddingHorizontal: width * 0.02 }}>
            <Icon name="bell" color={theme.basic} solid={true} size={20} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ paddingLeft: width * 0.02, paddingRight: '1%' }}
            onPress={() => navigation.navigate("settings", { address })}
          >
            <Icon name="cog" color={theme.basic} size={20} />
          </TouchableOpacity>
        </View>
      }
    
      containerStyle={{
        borderBottomWidth: 0,
        paddingHorizontal: 10,
        backgroundColor: theme.headerbackground,
        paddingTop: Platform.OS === 'ios' ? - 20 : 0,
        height: Platform.OS === 'ios' ? 70 - 20 : 70 - 20,
        marginTop: Platform.OS == 'ios' ? 0 : StatusBar.currentHeight,
      }}
    />
  )
}

export default HeaderCustom
