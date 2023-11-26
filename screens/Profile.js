import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, Pressable, BackHandler, Platform } from 'react-native';

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
      styles.frameFlexBox, styles.exitBtnWrapper
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

// Chứa tất cả options trong trang profile chính.
const Options = () => {
  return (
  <View style={styles.frameParent}>
    <View style={{width: windowWidth * 0.85, marginTop: 12}}>
      <Text style={styles.sectionName}>Tài khoản & Bảo mật</Text>
      <View style={{marginTop: 16}}>
        <UserOption optionName="Cài đặt tài khoản" imgSource={require('../assets/profileSetting/account-setting.png')} />
        <UserOption optionName="Thông tin cá nhân" imgSource={require('../assets/profileSetting/user-profile.png')} />
        <UserOption optionName="Ví điện tử" imgSource={require('../assets/profileSetting/e-wallet.png')} />
        <UserOption optionName="Phiếu giảm giá" imgSource={require('../assets/profileSetting/coupons.png')} />
      </View>
    </View>
    <View style={{width: windowWidth * 0.85, marginTop: 24}}>
      <Text style={styles.sectionName}>Chung</Text>
      <View style={{marginTop: 16}}>
        <UserOption optionName="Điều khoản & Điều kiện" imgSource={require('../assets/profileSetting/terms-and-conditions.png')} />
        <UserOption optionName="Chính sách bảo mật" imgSource={require('../assets/profileSetting/privacy-policies.png')} />
        <UserOption optionName="Chăm sóc khách hàng" imgSource={require('../assets/profileSetting/customer-care.png')} />
      </View>
    </View>

    {/* Exit button is implemented to only appear and work on Android devices. */}
    {Platform.OS === "android" ? <View style={{flexDirection: "column", width: windowWidth * 0.85}}><ExitBtn /></View> : <></>}
  </View>);
  };

// Main profile screen.
const Profile = () => {
  return (
    <SafeAreaView style={{backgroundColor: "#fcf9f9", flex: 1}}>
      <UserProfile />
      <Options />
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
  frameFlexBox: {
    paddingVertical: 12,
    paddingHorizontal: 0,
    justifyContent: "space-between",
    width: 345,
    borderBottomWidth: 1,
    borderColor: "#d7d7d7",
    borderStyle: "solid",
    alignItems: "center",
    flexDirection: "row"
  },
  frameParent: {
    width: "100%",
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
    borderRadius: 5,
    borderWidth: 1,
    width: 100,
    marginTop: 48,
    justifyContent: "center"
  }
});

export default Profile;