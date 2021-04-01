import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';

const SignUpScreen = ({navigation}) => {
  const [info, setInfo] = useState({
    email: '',
    username: '',
    password: '',
    grantType: 'OAUTH',
    // confirm_password: '',
    check_emailInputChange: false,
    check_textInputChange: false,
    secureTextEntry: true,
    // confirm_secureTextEntry: true,
  });

  const handleSubmit = () => {
    axios
      .post(
        'http://ec2-54-180-93-247.ap-northeast-2.compute.amazonaws.com/api/v1/user/',
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
      })
      .then(() => {
        navigation.goBack();
      })
      .catch(err => {
        console.log('ERROR', err.res);
      });
  };

  const emailInputChange = e => {
    setInfo({
      ...info,
      email: e.nativeEvent.text,
      check_emailInputChange: true,
    });
    // if( e.length !== 0 ) {
    //     setInfo({
    //         ...info,
    //         email: e.target.value,
    //         check_emailInputChange: true
    //     });
    // } else {
    // }
  };

  const textInputChange = e => {
    setInfo({
      ...info,
      username: e.nativeEvent.text,
      check_textInputChange: true,
    });
    // if( e.length !== 0 ) {
    //     setInfo({
    //         ...info,
    //         username: e.target.value,
    //         check_textInputChange: true
    //     });
    // } else {
    //     setInfo({
    //         ...info,
    //         username: e.target.value,
    //         check_textInputChange: false
    //     });
    // }
  };

  const handlePasswordChange = e => {
    setInfo({
      ...info,
      password: e.nativeEvent.text,
    });
  };

  // const handleConfirmPasswordChange = (e) => {
  //     setInfo({
  //         ...info,
  //         confirm_password: e.target.data
  //     });
  // }

  const updateSecureTextEntry = () => {
    setInfo({
      ...info,
      secureTextEntry: !info.secureTextEntry,
    });
  };

  // const updateConfirmSecureTextEntry = () => {
  //     setInfo({
  //         ...info,
  //         confirm_secureTextEntry: !data.confirm_secureTextEntry
  //     });
  // }

  //axios로 입력한 데이터 백엔드로 보내기

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ffee6b" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Now!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <Text style={styles.text_footer}>Email</Text>
          <View style={styles.action}>
            <FontAwesome name="envelope-o" color="#4a453f" size={18} />
            <TextInput
              placeholder="Your Email"
              style={styles.textInput}
              autoCapitalize="none"
              value={info.email}
              onChange={emailInputChange}
              required
            />
            {info.check_emailInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="#a9d1d9" size={18} />
              </Animatable.View>
            ) : null}
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            Username
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#4a453f" size={18} />
            <TextInput
              placeholder="Your Username"
              style={styles.textInput}
              autoCapitalize="none"
              value={info.username}
              onChange={textInputChange}
              required
            />
            {info.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="#a9d1d9" size={18} />
              </Animatable.View>
            ) : null}
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#4a453f" size={18} />
            <TextInput
              placeholder="Your Password"
              secureTextEntry={info.secureTextEntry ? true : false}
              style={styles.textInput}
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

          {/* <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Confirm Password</Text>
            <View style={styles.action}>
                <Feather
                    name="lock"
                    color="#4a453f"
                    size={18}
                />
                <TextInput
                    placeholder="Confirm Your Password"
                    secureTextEntry={data.confirm_secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handleConfirmPasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateConfirmSecureTextEntry}
                >
                    {data.secureTextEntry ?
                    <Feather
                        name="eye-off"
                        color="grey"
                        size={18}
                    />
                    :
                    <Feather
                        name="eye"
                        color="grey"
                        size={18}
                    />
                    }
                </TouchableOpacity>
            </View> */}
          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>
              By signing up you agree to our
            </Text>
            <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
              {' '}
              Terms of service
            </Text>
            <Text style={styles.color_textPrivate}> and</Text>
            <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
              {' '}
              Privacy policy
            </Text>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={handleSubmit}

              //여기 누르면 axios 또는 fetch로 서버와 연결되도록!
            >
              <LinearGradient
                colors={['#C6D685', '#c6d685']}
                style={styles.signIn}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#fff',
                    },
                  ]}>
                  Sign Up
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[
                styles.signIn,
                {
                  borderColor: '#C6D685',
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#C6D685',
                  },
                ]}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default SignUpScreen;

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
    flex: Platform.OS === 'ios' ? 3 : 5,
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
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#4a453f',
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
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },
});
