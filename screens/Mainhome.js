import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
const windowHeight = Dimensions.get('window').height;
const topMargin = 50;
const Mainhome = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const buttonSpacing = windowHeight * 0.3; // 30% chiều cao của màn hình
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const a = windowHeight * 0.075; // 10% của chiều cao của màn hình
  const whiteRectangleWidth = windowWidth * 0.8; // 70% của chiều rộng của màn hình
  const headerHeight = windowHeight * 0.2;
  const topwhite = headerHeight - 50;
  const topwuser = headerHeight - 150;
  const frameheader = windowHeight * 0.2;
  const topweather = -8
  const buttonMargin = 30;

  return (
    <View style={styles.container}>
      <View style={[styles.header, { height: headerHeight, }]}>
        <View style={styles.buttonContainer}>
          <Text style={[styles.userNameText, { top: topwuser, paddingRight: frameheader }]}>Tên Người Dùng</Text>
          <TouchableOpacity style={[styles.button, styles.numberButton, { top: topwuser }]}>
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.notificationButton, { top: topwuser }]}>
            <Text style={styles.buttonText}>Thông báo</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.whiteRectangle, { width: whiteRectangleWidth, top: topwhite, flexDirection: 'row', alignItems: 'center' }]}>
        <Text style={styles.clockText}>Đồng hồ</Text>
        <TouchableOpacity style={styles.buttonWeather}></TouchableOpacity>
        <TouchableOpacity style={[styles.buttonWeather, { marginLeft: buttonMargin }]}></TouchableOpacity>
        <TouchableOpacity style={[styles.buttonWeather, { marginLeft: buttonMargin }]}></TouchableOpacity>
        <TouchableOpacity style={[styles.buttonWeather, { marginLeft: buttonMargin }]}></TouchableOpacity>
        <TouchableOpacity style={[styles.buttonWeather, { marginLeft: buttonMargin }]}></TouchableOpacity>
        <TouchableOpacity style={[styles.buttonWeather, { marginLeft: buttonMargin }]}></TouchableOpacity>
        <Text style={styles.hourText}>
          {currentTime.getHours().toString().padStart(2, '0')}:
          {currentTime.getMinutes().toString().padStart(2, '0')}
        </Text>
        <Text style={styles.dateText}>
          {currentTime.getDate().toString().padStart(2, '0')}/
          {(currentTime.getMonth() + 1).toString().padStart(2, '0')}/
          {currentTime.getFullYear()}
        </Text>
      </View>
      <View style={styles.voiceAssistant}>
        <Text style={styles.botInteractionMessage}>Bà cần giúp đỡ gì ạ</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonWeather: {
    height: 80,
    width: 50,
    left: 120,
    marginRight: -20,
    borderRadius: 3.125 * 16, // 3.125rem converted to pixels
    overflow: 'hidden', // Make sure the gradient stays within the button boundaries
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContent: {
    flex: 1, // Đảm bảo nội dung của nút được căn giữa
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '10%', // 10% của chiều cao của màn hình
    backgroundColor: '#235C25',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 16,
    paddingBottom: 16,
  },
  userNameText: {
    color: '#FFF',
    fontSize: 20,
    left: 20,
    fontFamily: 'Roboto',
    fontWeight: '700',
    marginRight: 90,
  },
  buttonContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },

  whiteRectangle: {
    height: 90,
    padding: 50,

    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
    position: 'absolute',
  },

  clockText: {
    color: '#2F2F2F',
    fontFamily: 'Roboto',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    position: 'absolute',
    top: 5,
    left: 15,
    marginTop: 10
  },

  hourText: {
    color: '#2F2F2F',
    fontFamily: 'Roboto',
    fontSize: 35,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 35,
    position: 'absolute',
    bottom: 25,
    left: 15,
  },

  dateText: {
    color: '#2F2F2F',
    fontFamily: 'Roboto',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    left: 15,
    position: 'absolute',
    bottom: 5, // Đặt vị trí dưới cùng của hình chữ nhật trắng, cách 5px so với clockText
    left: 15, // Đặt vị trí từ mép phải của hình chữ nhật trắng
    marginBottom: 10
  },

  button: {
    height: 38,
    // Chiều rộng và chiều cao của nút
    right: 50,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 19, // Nửa của chiều rộng hoặc chiều cao để tạo hình tròn
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
  },

  notificationButton: {
    marginRight: 5,
  },

  numberButton: {
    left: 77,

    width: 38, // Chiều rộng của nút "2"
  },

  buttonText: {
    color: '#000',

  },

});

export default Mainhome;