import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, Pressable, Linking, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { PermissionsAndroid } from "react-native";
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system'; // Thêm thư viện FileSystem

const windowHeight = Dimensions.get('window').height;
const topMargin = 50;
let recording = new Audio.Recording();



async function uploadAudioToServer(uri) {
  const apiUrl = 'https://f12e-2402-800-6314-57b-12c-b6be-f3a4-434f.ngrok-free.app/';
  try {
    const fileData = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 })

    const options = {
      method: 'POST',
      body: JSON.stringify({
        audio: fileData
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const response = await fetch(apiUrl, options);
    if (!response.ok) {
      console.log(`Không thể tải lên audio. Máy chủ trả về mã trạng thái ${response.status}`);
    }
    const data = await response.json();
    console.log('Tải lên thành công:', data);
  } catch (error) {
    console.error(error);
  }

}

const Mainhome = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [toggleVoice, setToggleVoice] = useState(false);

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


  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log('Starting recording..');
      await recording.prepareToRecordAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      await recording.startAsync();
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    await uploadAudioToServer(uri);

    console.log('Recording stopped and stored at', uri);

    recording = new Audio.Recording();
  }

  const [isRecording, setIsRecording] = useState(false);
  const showVoiceChat = async () => {
    if (!toggleVoice) {
      try {
        await startRecording();
        setToggleVoice(true);
        setIsRecording(true);
      } catch (err) {
        console.error('Failed to start recording', err);
      }
    } else {
      try {
        await stopRecording();

        setToggleVoice(false);
        setIsRecording(false);
      } catch (error) {
        console.error('Failed to stop recording and upload audio:', error);
      }
    }
  };

  // Khi không có ghi âm (isRecording là false) thì không hiển thị voice assistant
  {
    isRecording &&
      <View style={styles.voiceAssistant}>
        <Text style={styles.botInteractionMessage}>Bà cần giúp đỡ gì ạ</Text>
        <Image source={require('../assets/sound-waves.png')} style={styles.soundWaves} />
      </View>
  }
  const openYouTubeApp = () => {
    Linking.openURL('https://www.youtube.com/');
  };
  return (
    <>
      {/* <BottomNavBar /> */}
      <SafeAreaView style={styles.container}>
        <View style={[styles.header, { height: headerHeight }]}>
          <Text style={[styles.userNameText, { top: topwuser, paddingRight: frameheader }]}>Tên Người Dùng</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.notificationButton, { top: topwuser }]}>
              <Text style={styles.buttonText}>Thông báo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.numberButton, { top: topwuser }]}>
              <Text style={styles.buttonText}>🔔</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Button title="Mở YouTube" onPress={openYouTubeApp} />
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
        {toggleVoice &&
          <View style={styles.voiceAssistant}>
            <Text style={styles.botInteractionMessage}>Bà cần giúp đỡ gì ạ</Text>
            <Image source={require('../assets/sound-waves.png')} style={styles.soundWaves} />
          </View>
        }
        <Pressable
          onPress={showVoiceChat}
          style={styles.voiceBtn}
        ><Ionicons name="mic" style={styles.voiceBtnText}></Ionicons></Pressable>
      </SafeAreaView>
    </>
  );


};


const styles = StyleSheet.create({
  voiceBtnText: {
    fontSize: 50,
    color: 'white',
    transform: [{ translateX: 1.5 }]
  },
  voiceBtn: {
    padding: 25,
    backgroundColor: '#235C25',
    borderRadius: 999,
    position: 'absolute',
    bottom: 100,
    right: 250,
    zIndex: 2, // Đặt zIndex lớn hơn để nút micro hiển thị ở trên
  },
  soundWaves: {
    width: '55%',
    height: '55%',
    marginHorizontal: 'auto'
  },
  botInteractionMessage: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold'
  },
  voiceAssistant: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    width: '80%',
    height: 299,
    borderRadius: 10,
    backgroundColor: '#235C25',
    padding: 10
  },
  buttonWeather: {
    height: 80,
    width: 50,
    left: 120,
    marginRight: -20,
    borderRadius: 3.125 * 16,
    overflow: 'hidden',
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContent: {
    flex: 1,
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
    paddingTop: 15,
    paddingHorizontal: 15,
    top: 0,
    display: 'flex',
    width: '100%',
    height: '10%',
    backgroundColor: '#235C25',
    flexDirection: 'row',
    paddingRight: 16,
    paddingBottom: 16,
  },
  userNameText: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'Roboto',
    fontWeight: '700',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 5
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
    fontSize: 20,
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
    top: 70,
    color: '#2F2F2F',
    fontFamily: 'Roboto',
    fontSize: 20,
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
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 19,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
  },

  notificationButton: {
    marginRight: 5,
    paddingHorizontal: 15,
  },

  numberButton: {

    width: 38,
  },

  buttonText: {
    color: '#000',

  },

});

export default Mainhome;