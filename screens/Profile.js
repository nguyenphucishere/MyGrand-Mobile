import React, { useState, useEffect } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, Dimensions, Image, Pressable, BackHandler, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

/**
 * All CSS properties which are defined in this file is taken from the design file on Figma.
 * 
 * Đã test trên điện thoại Samsung Galaxy A52 và mọi thứ có vẻ ổn.
 */

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

// Trả về component của phần thông tin người dùng (nằm ở phần phía trên) trong trang profile chính.
const UserProfile = ({hoVaTen = "Họ và tên", email = "example@gmail.com", soDienThoai = "0123456789"}) => {
  const internalStyles = StyleSheet.create({
    wrapper: {
      backgroundColor: "#235c25",
      width: "100%",
      height: windowHeight * 0.2,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 24,
      paddingVertical: 0
    },
    nameStyle: {
      fontSize: 16,
      fontWeight: "600",
      fontFamily: "Roboto",
      textAlign: "left",
      color: "#fff"
    },
    mailAndPhoneNumberStyle: {
      fontFamily: "Roboto",
      fontWeight: "500",
      fontSize: 12,
      textAlign: "left",
      color: "#fff"
    },
    verifiedWrapper: {
      borderRadius: 20,
      backgroundColor: "#fff",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingLeft: 4,
      paddingTop: 4,
      paddingRight: 13,
      paddingBottom: 4
    },
    verifiedText: {
      fontSize: 10,
      fontWeight: "500",
      fontFamily: "Roboto",
      color: "#55d85a",
      textAlign: "left",
      marginLeft: 7
    }
  });

  return (
    <>
      <View style={internalStyles.wrapper}>
        <Image style={{width: 72, height: 72}} resizeMode="cover" source={require('../assets/profile-icon.png')} />
        <View style={{marginLeft: 32}}>
          <View style={{height: 75}}>
            <View>
              <Text style={internalStyles.nameStyle}>{hoVaTen}</Text>
              <View style={{marginTop: 4}}>
                <Text style={internalStyles.mailAndPhoneNumberStyle}>{email}</Text>
                <Text style={[{marginTop: 2}, internalStyles.mailAndPhoneNumberStyle]}>{soDienThoai}</Text>
              </View>
            </View>
          </View>

          <View style={internalStyles.verifiedWrapper}>
            <Image style={{width: 12, height: 12}} resizeMode="cover" source={require('../assets/confirm-icon.png')} />
            <Text style={internalStyles.verifiedText}>Đã xác thực</Text>
          </View>
        </View>
      </View>
    </>
  );
};

// Nút thoát chỉ dành cho thiết bị chạy hệ điều hành Android.
const ExitBtn = () => {
  const styleWhenPress = ({pressed}) => {
    return [
      {backgroundColor: pressed ? "#f0f0f0" : null},
      styles.exitBtnWrapper
    ]
  };

  return (
  <Pressable style={styleWhenPress} onPress={BackHandler.exitApp}>
    <Image style={{width: 28, height: 28}} resizeMode="cover" source={require("../assets/exit-app.png")} />
    <Text style={styles.exitTextStyle}>Thoát</Text>
  </Pressable>);
};

// Trả về component của option trong trang profile chính.
const UserOption = ({optionName, imgSource, onPress}) => {
  const internalStyles = StyleSheet.create({
    frameParent: {
      borderStyle: "solid",
      borderColor: "#d7d7d7",
      borderBottomWidth: 1,
      width: "100%",
      justifyContent: "space-between",
      paddingHorizontal: 0,
      paddingVertical: 12
    },
    frameFlexBox: {
      alignItems: "center",
      flexDirection: "row"
    },
    optionNameStyle: {
      fontSize: 16,
      fontWeight: "500",
      fontFamily: "Roboto",
      color: "#2f2f2f",
      textAlign: "center",
      marginLeft: 12,
      height: 24
    }
  });

  const styleWhenPress = ({pressed}) => {
    return [
      {backgroundColor: pressed ? "#f0f0f0" : null},
      internalStyles.frameParent, internalStyles.frameFlexBox
    ];
  };

  return (
    <Pressable style={styleWhenPress} onPress={onPress}>
      <View style={internalStyles.frameFlexBox}>
        {imgSource ? <Image style={{width: 24, height: 24}} resizeMode="cover" source={imgSource} /> : <></>}
        <Text style={internalStyles.optionNameStyle}>{optionName}</Text>
      </View>
      <Image style={{width: 12, height: 21}} resizeMode="cover" source={require('../assets/right-arrow.png')} />
    </Pressable>
  );
};

// Main profile screen.
const Profile = () => {
  const navigation = useNavigation();
  const [isSettingOn, setSettingOn] = useState(false);
  const [isInfromOn, setInfromOn] = useState(false);
  const [isWalletOn, setWalletOn] = useState(false);
  const [isCouponOn, setCouponOn] = useState(false);
  const [isDieukhoangOn, setDieukhoangOn] = useState(false); // State cho nút Dieukhoang
  const [isPrivacyPolicyOn, setPrivacyPolicyOn] = useState(false); // State cho nút PrivacyPolicy
  const [isCskhOn, setCskhOn] = useState(false);

  const handleSettingPress = () => setSettingOn(true);

  const handleIfromPress = () => setInfromOn(true);

  const handleWalletPress = () => setWalletOn(true);

  const handleCouponPress = () => setCouponOn(true);

  const handleDieukhoangPress = () => setDieukhoangOn(true);

  const handlePrivacyPolicyPress = () => setPrivacyPolicyOn(true);

  const handleCskhPress = () => setCskhOn(true);

  useEffect(() => {
    if (isSettingOn) {
      setSettingOn(false);
      navigation.navigate('Setting');
    }
    if (isInfromOn) {
      setInfromOn(false);
      navigation.navigate('Infrom');
    }
    if (isDieukhoangOn) {
      setDieukhoangOn(false);
      navigation.navigate('Dieukhoang'); // Chuyển hướng đến màn hình Dieukhoang
    }

    if (isPrivacyPolicyOn) {
      setPrivacyPolicyOn(false);
      navigation.navigate('PrivacyPolicy'); // Chuyển hướng đến màn hình PrivacyPolicy
    }

  }, [isInfromOn, isSettingOn, isWalletOn, isCouponOn,isDieukhoangOn, isPrivacyPolicyOn, isCskhOn,navigation]);

  return (
    <SafeAreaView style={{backgroundColor: "#fcf9f9", flex: 1}}>
      {/* Phần header chứa thông tin người dùng */}
      <UserProfile />

      <View style={styles.frameParent}>
        <View style={{width: windowWidth * 0.85, marginTop: 12}}>
          <Text style={styles.sectionName}>Tài khoản & Bảo mật</Text>
          <View style={{marginTop: 16}}>

            <UserOption optionName="Cài đặt tài khoản" 
            imgSource={require('../assets/profileSetting/setting_count_icon.png')} 
            onPress={handleSettingPress} />

            <UserOption optionName="Thông tin cá nhân" 
            imgSource={require('../assets/profileSetting/inform_icon.png')} 
            onPress={handleIfromPress} />

            <UserOption optionName="Ví điện tử" 
            imgSource={require('../assets/profileSetting/money.png')} 
            onPress={handleWalletPress} />

            <UserOption optionName="Phiếu giảm giá" 
            imgSource={require('../assets/profileSetting/ticket.png')} 
            onPress={handleCouponPress} />

          </View>
        </View>

        <View style={{width: windowWidth * 0.85, marginTop: 24}}>
          <Text style={styles.sectionName}>Chung</Text>
          <View style={{marginTop: 16}}>

            <UserOption optionName="Điều khoản & Điều kiện" 
            imgSource={require('../assets/profileSetting/dieukhoang.png')} 
            onPress={handleDieukhoangPress} />

            <UserOption optionName="Chính sách bảo mật" 
            imgSource={require('../assets/profileSetting/baomat.png')} 
            onPress={handlePrivacyPolicyPress } />

            <UserOption optionName="Chăm sóc khách hàng" 
            imgSource={require('../assets/profileSetting/cskh.png')} 
            onPress={handleCskhPress} />
          </View>
        </View>

        {/* Exit button is implemented to only appear and work on Android devices. */}
        {Platform.OS === "android" ? <View style={{flexDirection: "column", width: windowWidth * 0.85}}><ExitBtn /></View> : <></>}
      </View>

    </SafeAreaView>
  );
}

// Đa số lấy từ trong file bên Figma ra và một số có chỉnh sửa để phù hợp với thiết bị.
const styles = StyleSheet.create({
  sectionName: {
    textAlign: "left",
    color: "#000",
    fontFamily: "Roboto",
    fontWeight: "500",
    fontSize: 20
  },
  frameParent: {
    width: windowWidth,
    alignItems: "center",
  },
  exitTextStyle: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Roboto",
    color: "#2f2f2f",
    textAlign: "left",
    display: "flex",
    marginLeft: 12,
    alignItems: "center"
  },
  exitBtnWrapper: {
    paddingVertical: 12,
    paddingHorizontal: 0,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#d7d7d7",
    borderStyle: "solid",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5,
    borderWidth: 1,
    width: 100,
    marginTop: 48,
    justifyContent: "center"
  }
});

export default Profile;