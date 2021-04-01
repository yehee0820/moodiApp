import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  Modal,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import {useTheme} from 'react-native-paper';

import {AuthContext} from '../components/context';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = ({navigation}) => {
  const [info, setInfo] = useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const [nick, setNick] = useState({
    nickname: '',
    isVaildNickname: true,
  });

  const {colors} = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const {signIn} = useContext(AuthContext);

  const textInputChange = e => {
    //빈칸 없애는 뭔가 필요... 또는 spacebar 누르지 못하게 하거나
    if (e.length >= 4) {
      setInfo({
        ...info,
        username: e.nativeEvent.text,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setInfo({
        ...info,
        username: e.nativeEvent.text,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };
  //trim(): 문자열 좌우에서 공백을 제거하는 함수
  const handlePasswordChange = e => {
    if (e.length >= 8) {
      setInfo({
        ...info,
        password: e.nativeEvent.text,
        isValidPassword: true,
      });
    } else {
      setInfo({
        ...info,
        password: e.nativeEvent.text,
        isValidPassword: false,
      });
    }
  };
  const nicknameInput = e => {
    setNick({
      ...nick,
      nickname: e.nativeEvent.text,
      isVaildNickname: true,
    });
  };

  const updateSecureTextEntry = () => {
    setInfo({
      ...info,
      secureTextEntry: !info.secureTextEntry,
    });
  };

  const handleValidUser = val => {
    if (val.length >= 4) {
      setInfo({
        ...info,
        isValidUser: true,
      });
    } else {
      setInfo({
        ...info,
        isValidUser: false,
      });
    }
  };

  const tryLogin = () => {
    axios
      .put(
        'http://ec2-54-180-93-247.ap-northeast-2.compute.amazonaws.com/api/v1/user/login/',
        info,
        {
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
          },
        },
      )
      .then(res => {
        console.log(res.data);
        const user = {
          userToken: res.data.token,
          nickname: res.data.nickname,
          username: info.username,
        };
        AsyncStorage.setItem('user', JSON.stringify(user));
        if (res.data.nickname == 'not_specified*') {
          setModalVisible(true);
        } else if (res.data.nickname != 'not_specified*') {
          navigation.navigate('Home');
        }
      })
      .catch(err => {
        console.log('ERROR', err.response.data);
      });
  };

  const NickConfirmed = () => {
    AsyncStorage.getItem('user').then(userString => {
      const user = JSON.parse(userString);
      console.log(user);
      axios
        .put(
          'http://ec2-54-180-93-247.ap-northeast-2.compute.amazonaws.com/api/v1/userprofile/nickname/',
          nick,
          {
            headers: {
              Accept: 'application/json',
              'Content-type': 'application/json',
              Authorization: `token ${user.userToken}`,
            },
          },
        )
        .then(res => {
          console.log(res.data);
          user.nickname = res.data.nickname; //update
          AsyncStorage.setItem('user', JSON.stringify(user));

          setModalVisible(false);
          navigation.navigate('Home');
        })
        .catch(err => {
          console.log('ERROR', err.response.data);
        });
    });
  };

  // const loginHandle = (userName, password) => {

  //     const foundUser = Users.filter( item => {
  //         return userName == item.username && password == item.password;
  //     } );

  //     if ( info.username.length == 0 || info.password.length == 0 ) {
  //         Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
  //             {text: 'Okay'}
  //         ]);
  //         return;
  //     }

  //     if ( foundUser.length == 0 ) {
  //         Alert.alert('Invalid User!', 'Username or password is incorrect.', [
  //             {text: 'Okay'}
  //         ]);
  //         return;
  //     }
  //     signIn(foundUser);
  // }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ffee6b" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome!</Text>
      </View>

      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text
          style={[
            styles.text_footer,
            {
              color: '#4a453f',
            },
          ]}>
          Username
        </Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#4a453f" size={18} />
          <TextInput
            placeholder="Your Username"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: '#4a453f',
              },
            ]}
            autoCapitalize="none"
            value={info.username}
            onChange={textInputChange}
            required
            onEndEditing={e => handleValidUser(e.nativeEvent.text)}
          />
          {info.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="#cddb94" size={18} />
            </Animatable.View>
          ) : null}
        </View>
        {info.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Username must be 4 characters long.
            </Text>
          </Animatable.View>
        )}

        <Text
          style={[
            styles.text_footer,
            {
              color: '#4a453f',
              marginTop: 35,
            },
          ]}>
          Password
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color="#4a453f" size={18} />
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#666666"
            secureTextEntry={info.secureTextEntry ? true : false}
            style={[
              styles.textInput,
              {
                color: '#4a453f',
              },
            ]}
            autoCapitalize="none"
            value={info.password}
            onChange={handlePasswordChange}
            required
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {info.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={18} />
            ) : (
              <Feather name="eye" color="grey" size={18} />
            )}
          </TouchableOpacity>
        </View>
        {info.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 8 characters long.
            </Text>
          </Animatable.View>
        )}
        {/* 이 글자가 사라져야하는데 사라지지 않음 */}

        <TouchableOpacity>
          <Text style={{color: '#c6d685', marginTop: 15}}>
            Forgot password?
          </Text>
        </TouchableOpacity>
        <View style={styles.popupBox}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('취소되었습니다.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.modalView}>
              <Text
                style={[
                  styles.modalText,
                  {fontSize: 22, fontWeight: '700', marginBottom: 8},
                ]}>
                닉네임을 입력하세요
              </Text>
              <Text
                style={[styles.modalText, {fontSize: 14, marginBottom: 20}]}>
                (특수문자 사용 불가능)
              </Text>
              <View style={styles.actionPop}>
                <TextInput
                  placeholder="Your nickname"
                  placeholderTextColor="#666666"
                  style={[
                    styles.textInputPop,
                    {
                      color: '#4a453f',
                    },
                  ]}
                  autoCapitalize="none"
                  value={nick.nickname}
                  onChange={nicknameInput}
                  required
                />
              </View>

              <Text
                style={[
                  styles.errorMsg,
                  {alignItems: 'flex-end', marginTop: 4, marginLeft: 5},
                ]}>
                이미 사용중인 닉네임입니다
              </Text>

              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  style={styles.buttonPop}
                  onPress={NickConfirmed}>
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: '#fff',
                      },
                    ]}>
                    사용하기
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.button}>
          <TouchableOpacity style={styles.signIn} onPress={tryLogin}>
            <LinearGradient
              colors={['#a9d1d9', '#a9d1d9']}
              style={styles.signIn}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#fff',
                  },
                ]}>
                Sign In
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('SignUpScreen')}
            style={[
              styles.signIn,
              {
                borderColor: '#a9d1d9',
                borderWidth: 1,
                marginTop: 15,
              },
            ]}>
            <Text
              style={[
                styles.textSign,
                {
                  color: '#a9d1d9',
                },
              ]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffee6b',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#4a453f',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#4a453f',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#4a453f',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  popupBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionPop: {
    flexDirection: 'row',
    height: 35,
    marginTop: 10,
    borderWidth: 1.3,
    borderColor: '#d4e0a2',
    borderRadius: 13,
    padding: 5,
  },
  modalView: {
    margin: 20,
    marginTop: 330,
    backgroundColor: '#fffbf2',
    borderRadius: 20,
    padding: 35,

    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 5,
  },
  textInputPop: {
    paddingLeft: 7,
    flex: 0.75,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    marginBottom: Platform.OS === 'ios' ? 0 : -12,
    color: '#4a453f',
  },
  buttonPop: {
    backgroundColor: '#d4e0a2',
    marginTop: 35,
    alignItems: 'center',
    width: '67%',
    height: 40,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
    color: '#4a453f',
  },
});
